"use client"

import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
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
import type { ApppointmentCreateSchema } from "@/schemas/appointment"
import { appointmentCreateSchema } from "@/schemas/appointment"
import { Selection } from "@recharge/ui/components/selection"
import DatePicker from "@recharge/ui/components/date-picker"
import TimePicker from "@recharge/ui/components/time-picker"
import { Skeleton } from "@recharge/ui/components/skeleton"
import { Button } from "@recharge/ui/components/button"
import { Input } from "@recharge/ui/components/input"
import { cn } from "@recharge/ui/lib/utils"
import { useState, useEffect } from "react"

// This would be replaced with actual API call to get booking details
const fetchBookingDetails = async (id: string): Promise<ApppointmentCreateSchema> => {
  // Mock data - in a real app, this would fetch from your API
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    date: new Date("2023-05-15"),
    time: "10:00",
    province: "Ontario",
    city: "Toronto",
    street: "123 Main St",
    postalCode: "M5V 2N4",
    notes: "Follow-up appointment",
  }
}

export function ModifyBookingForm() {
  const params = useParams()
  const bookingId = params.id as string
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ApppointmentCreateSchema>({
    resolver: zodResolver(appointmentCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: undefined,
      time: "",
      province: "",
      city: "",
      street: "",
      postalCode: "",
      notes: "",
    },
  })

  // Fetch booking details and populate form
  useEffect(() => {
    const loadBookingDetails = async () => {
      try {
        setIsLoading(true)
        const bookingDetails = await fetchBookingDetails(bookingId)

        // Set form values with existing booking data
        Object.entries(bookingDetails).forEach(([key, value]) => {
          form.setValue(key as keyof ApppointmentCreateSchema, value)
        })

        setIsLoading(false)
      } catch (err) {
        setError("Failed to load booking details. Please try again.")
        setIsLoading(false)
      }
    }

    loadBookingDetails()
  }, [bookingId, form])

  const onSubmit = async (values: ApppointmentCreateSchema) => {
    try {
      // In a real app, this would call your API to update the booking
      console.log("Updating booking:", bookingId, values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to success page
      router.push(`/booking/${bookingId}/success?modified=true`)
    } catch (error) {
      console.error("Error updating booking:", error)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-muted/40 bg-background ring-muted/30 shadow-sm ring-1">
        <CardHeader>
          <Skeleton className="mx-auto h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex flex-col space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-muted/40 bg-background ring-muted/30 shadow-sm ring-1">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <AlertCircle className="text-destructive h-10 w-10" />
            <p className="text-destructive">{error}</p>
            <Button onClick={() => router.push("/booking")}>Return to Booking</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

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
                              value={field.value}
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
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
