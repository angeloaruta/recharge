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
import { availableCityLocations, availableProvinceLocations } from "@/lib/location"
import { Selection } from "@recharge/ui/components/selection"
import DatePicker from "@recharge/ui/components/date-picker"
import TimePicker from "@recharge/ui/components/time-picker"
// import { useCreateAppointment } from "@/queries/appointment"
import type { BookingSchema } from "@/schemas/appointment"
import { Button } from "@recharge/ui/components/button"
import { Input } from "@recharge/ui/components/input"
import { bookingSchema } from "@/schemas/appointment"
import { cn } from "@recharge/ui/lib/utils"
const defaultValues: BookingSchema = {
  name: "",
  email: "",
  phone: "",
  date: new Date(),
  time: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  notes: "",
}

export function BookingForm() {
  //   const { trigger: createAppointment, isMutating: isCreating } = useCreateAppointment()

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
    mode: "onBlur", // Validate on blur for better user experience
  })

  const onSubmit = async (values: BookingSchema) => {
    // await createAppointment(values)
    form.reset(defaultValues)
  }

  return (
    <div className="flex w-full justify-center px-2 py-4 sm:px-4">
      <Card className="bg-background w-full max-w-[600px] text-left shadow-sm">
        <CardHeader className="pt-3 pb-2">
          <CardTitle className="text-base">Book Your Appointment</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* User Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">User Information</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Full Name</FormLabel>
                        <FormControl>
                          <Input className="h-8" placeholder="John Doe" {...field} />
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
                          <Input className="h-8" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Phone Number</FormLabel>
                        <FormControl>
                          <Input className="h-8" placeholder="09XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Date and Time</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Preferred Date</FormLabel>
                        <DatePicker
                          trigger={
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-8 w-full pl-3 text-left text-sm font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-3 w-3 opacity-50" />
                              </Button>
                            </FormControl>
                          }
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="text-xs">Preferred Time</FormLabel>
                        <FormControl>
                          <TimePicker value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">
                  Location{" "}
                  <span className="text-muted-foreground text-xs">
                    (Only available in Metro Manila)
                  </span>
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="flex flex-col items-start gap-0.5">
                          <span className="text-xs">Street, Barangay</span>
                          <span className="text-muted-foreground text-[10px]">
                            (House Number and Street, Subdivision, Barangay)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input className="h-8" {...field} />
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
                        <FormLabel className="flex flex-col items-start gap-0.5">
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
                          <Input className="h-8" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Additional Information</h3>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel className="text-xs">Notes</FormLabel>
                      <FormControl>
                        <textarea
                          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Please describe your condition or any specific requirements..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button type="submit" className="h-8 w-full text-sm sm:w-auto" disabled={false}>
                  {false ? <Loader2 className="h-3 w-3 animate-spin" /> : "Book Appointment"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
