import { z } from 'zod'

export const basicUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
})

export type BasicUserData = z.infer<typeof basicUserSchema>

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  age: z.number().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  occupation: z.string().optional(),
  phone: z.string().optional(),
  interests: z.array(z.string()).optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.array(z.string()).optional(),
  availableForWork: z.boolean().optional(),
  preferredContact: z.string().optional(),
  profileImage: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type User = z.infer<typeof userSchema>

export const userFormSchema = userSchema.omit({ id: true })
export type UserFormData = z.infer<typeof userFormSchema>
