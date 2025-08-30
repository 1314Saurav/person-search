'use server'

import { revalidatePath } from 'next/cache'
import { User, basicUserSchema } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

type PrismaUser = {
  id: string
  name: string
  email: string
  age?: number | null
  bio?: string | null
  location?: string | null
  occupation?: string | null
  phone?: string | null
  interests?: string[] | null
  website?: string | null
  linkedin?: string | null
  twitter?: string | null
  github?: string | null
  experience?: string | null
  education?: string | null
  skills?: string[] | null
  availableForWork?: boolean | null
  preferredContact?: string | null
  profileImage?: string | null
  company?: string | null
  jobTitle?: string | null
  createdAt: Date
  updatedAt: Date
}

function convertPrismaUser(user: PrismaUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    age: user.age || undefined,
    bio: user.bio || undefined,
    location: user.location || undefined,
    occupation: user.occupation || undefined,
    phone: user.phone || undefined,
    interests: user.interests || undefined,
    website: user.website || undefined,
    linkedin: user.linkedin || undefined,
    twitter: user.twitter || undefined,
    github: user.github || undefined,
    experience: user.experience || undefined,
    education: user.education || undefined,
    skills: user.skills || undefined,
    availableForWork: user.availableForWork || undefined,
    preferredContact: user.preferredContact || undefined,
    profileImage: user.profileImage || undefined,
    company: user.company || undefined,
    jobTitle: user.jobTitle || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export async function searchUsers(query: string): Promise<User[]> {
    const users = await prisma.person.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
            ]
        },
        orderBy: { createdAt: 'desc' },
    })
    
    return users.map(convertPrismaUser)
}

export async function addUser(data: { name: string; email: string; phone?: string }): Promise<User> {
    const validatedData = basicUserSchema.parse(data)
    
    const newUser = await prisma.person.create({
        data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
        },
    })
    
    revalidatePath('/')
    return convertPrismaUser(newUser)
}

export async function deleteUser(id: string): Promise<void> {
    await prisma.person.delete({
        where: { id },
    })
    
    revalidatePath('/')
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.person.update({
        where: { id },
        data: data,
    })
    
    revalidatePath('/')
    return convertPrismaUser(updatedUser)
}

export const getUserById = cache(async (id: string) => {
    const user = await prisma.person.findUnique({
        where: { id },
    })
    
    if (!user) return null
    return convertPrismaUser(user)
})

export async function getAllUsers(): Promise<User[]> {
    const users = await prisma.person.findMany({
        orderBy: { createdAt: 'desc' },
    })
    
    return users.map(convertPrismaUser)
}
