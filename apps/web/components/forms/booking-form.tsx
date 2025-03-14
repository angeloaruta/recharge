"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@recharge/ui/components/form"
import { Card, CardContent, CardHeader, CardTitle } from "@recharge/ui/components/card"
import { appointmentInsertSchema, type CreateAppointment } from "@recharge/db/schema"
import { availableCityLocations, availableProvinceLocations } from "@/lib/location"
import { Selection } from "@recharge/ui/components/selection"
import DatePicker from "@recharge/ui/components/date-picker"
import TimePicker from "@recharge/ui/components/time-picker"
import { useCreateAppointment } from "@/queries/appointment"
import { Button } from "@recharge/ui/components/button"
import { Input } from "@recharge/ui/components/input"
import { cn } from "@recharge/ui/lib/utils"

const defaultValues: CreateAppointment = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  notes: "",
}

export function BookingForm() {
  const { mutate: createAppointment, isPending: isCreatingAppointment } = useCreateAppointment()
  const form = useForm<CreateAppointment>({
    resolver: zodResolver(appointmentInsertSchema),
    defaultValues,
    mode: "onBlur",
  })

  const onSubmit = async (values: CreateAppointment) => {
    createAppointment(values, {
      onSuccess: () => {
        form.reset(defaultValues)
      },
    })
  }

  return (
    <div className="mb-12 w-full">
      <Card className="border-muted/40 bg-background ring-muted/30 before:from-muted/80 before:to-muted/20 py-1 shadow-none ring-1 before:absolute before:inset-0 before:-z-10 before:translate-y-2 before:scale-[0.98] before:bg-gradient-to-b before:blur-xl before:content-['']">
        <CardHeader className="px-4 py-1 sm:px-6">
          <CardTitle className="text-xl">Book Your Appointment</CardTitle>
          <p className="text-muted-foreground text-sm">
            Fill out the form below to schedule your appointment
          </p>
        </CardHeader>
        <CardContent className="px-4 pb-6 sm:px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* User Information */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Personal Info
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Full Name</FormLabel>
                        <FormControl>
                          <Input className="h-9" placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Email</FormLabel>
                        <FormControl>
                          <Input className="h-9" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel className="text-xs">Phone Number</FormLabel>
                      <FormControl>
                        <Input className="h-9" placeholder="09XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date and Time */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Appointment
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            trigger={
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-9 w-full pl-3 text-left text-sm font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            }
                            value={field.value ? new Date(field.value) : new Date()}
                            onChange={(date) => field.onChange(date.toISOString())}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Time</FormLabel>
                        <FormControl>
                          <TimePicker value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Location
                  </h3>
                  <span className="text-muted-foreground text-xs">
                    (Only available in Metro Manila)
                  </span>
                </div>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">
                          <span className="text-xs">Street, Barangay</span>
                          <span className="text-muted-foreground text-[10px]">
                            (House Number and Street, Subdivision, Barangay)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input className="h-9" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">
                          {" "}
                          <span className="text-xs">City</span>
                          <span className="text-muted-foreground text-[10px]">
                            (City/Municipality)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Selection
                            value={field.value}
                            placeholder="Select a city"
                            onChange={field.onChange}
                            options={availableCityLocations}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Province</FormLabel>
                        <FormControl>
                          <Selection
                            value={field.value}
                            placeholder="Select a province"
                            onChange={field.onChange}
                            options={availableProvinceLocations}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Postal Code</FormLabel>
                        <FormControl>
                          <Input className="h-9" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Additional Info
                </h3>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel className="text-xs">Notes</FormLabel>
                      <FormControl>
                        <textarea
                          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Any specific requirements..."
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isCreatingAppointment}>
                  {isCreatingAppointment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
