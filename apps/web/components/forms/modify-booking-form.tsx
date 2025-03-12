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
import {
  createAppointmentSchema,
  type CreateAppointment,
  type Appointment,
} from "@recharge/utilities/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@recharge/ui/components/card"
import { availableCityLocations, availableProvinceLocations } from "@/lib/location"
import { Selection } from "@recharge/ui/components/selection"
import DatePicker from "@recharge/ui/components/date-picker"
import TimePicker from "@recharge/ui/components/time-picker"
import { Button } from "@recharge/ui/components/button"
import { Input } from "@recharge/ui/components/input"
import { cn } from "@recharge/ui/lib/utils"

export function ModifyBookingForm({ defaultValues }: { defaultValues: CreateAppointment }) {
  const form = useForm<CreateAppointment>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues,
  })

  const onSubmit = async (values: CreateAppointment) => {}

  //   if (isLoading) {
  //     return (
  //       <Card className="border-muted/40 bg-background ring-muted/30 shadow-sm ring-1">
  //         <CardHeader>
  //           <Skeleton className="mx-auto h-8 w-3/4" />
  //         </CardHeader>
  //         <CardContent className="space-y-6">
  //           <div className="space-y-4">
  //             <Skeleton className="h-10 w-full" />

  //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  //               <Skeleton className="h-10 w-full" />
  //               <Skeleton className="h-10 w-full" />
  //             </div>

  //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  //               <Skeleton className="h-10 w-full" />
  //               <Skeleton className="h-10 w-full" />
  //             </div>

  //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  //               <Skeleton className="h-10 w-full" />
  //               <Skeleton className="h-10 w-full" />
  //             </div>

  //             <Skeleton className="h-10 w-full" />
  //             <Skeleton className="h-10 w-full" />
  //             <Skeleton className="h-10 w-full" />
  //           </div>

  //           <div className="flex flex-col space-y-2">
  //             <Skeleton className="h-10 w-full" />
  //             <Skeleton className="h-10 w-full" />
  //           </div>
  //         </CardContent>
  //       </Card>
  //     )
  //   }

  //   if (error) {
  //     return (
  //       <Card className="border-muted/40 bg-background ring-muted/30 shadow-sm ring-1">
  //         <CardContent className="p-8">
  //           <div className="flex flex-col items-center space-y-4 text-center">
  //             <AlertCircle className="text-destructive h-10 w-10" />
  //             <p className="text-destructive">{error}</p>
  //             <Button onClick={() => router.push("/booking")}>Return to Booking</Button>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     )
  //   }

  return (
    <Card className="border-muted/40 bg-background ring-muted/30 shadow-sm ring-1">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Modify Your Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                          {field.value && (
                            <DatePicker
                              trigger={<div />}
                              value={field.value ? new Date(field.value) : new Date()}
                              onChange={field.onChange}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <TimePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Selection
                          value={field.value}
                          onChange={field.onChange}
                          options={availableProvinceLocations}
                          placeholder="Select province"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Selection
                          value={field.value}
                          onChange={field.onChange}
                          options={availableCityLocations}
                          placeholder="Select city"
                        />
                      </FormControl>
                      <FormMessage />
                      {!form.watch("province") && (
                        <p className="text-muted-foreground text-xs">
                          Please select a province first
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="A1B 2C3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of your needs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Appointment"
                )}
              </Button>
              {/* <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button> */}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
