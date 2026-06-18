import { z } from "zod";

const phoneRegex = /^[+]?[0-9\s-]{8,15}$/;

export const appointmentSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  doctorSlug: z.string().optional().or(z.literal("")),
  serviceSlug: z.string().optional().or(z.literal("")),
  packageSlug: z.string().optional().or(z.literal("")),
  preferredDate: z.string().min(1, "Please choose a preferred date"),
  preferredTime: z.string().min(1, "Please choose a preferred time"),
  message: z.string().optional().or(z.literal("")),
});
export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  subject: z.string().min(2, "Please enter a subject"),
  message: z.string().min(10, "Please enter a message of at least 10 characters"),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const labBookingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  testsRequested: z.string().min(2, "Please mention the test(s) you'd like to book"),
  homeCollection: z.boolean().optional(),
  preferredDate: z.string().min(1, "Please choose a preferred date"),
  address: z.string().optional().or(z.literal("")),
});
export type LabBookingInput = z.infer<typeof labBookingSchema>;

export const packageEnquirySchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  packageSlug: z.string().min(1, "Please select a package"),
  preferredDate: z.string().min(1, "Please choose a preferred date"),
});
export type PackageEnquiryInput = z.infer<typeof packageEnquirySchema>;

export const dgShippingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  cdcNumber: z.string().optional().or(z.literal("")),
  examType: z.enum(["pre-sea", "post-sea-renewal", "trainee"], { errorMap: () => ({ message: "Please select an examination type" }) }),
  preferredDate: z.string().min(1, "Please choose a preferred date"),
});
export type DgShippingInput = z.infer<typeof dgShippingSchema>;
