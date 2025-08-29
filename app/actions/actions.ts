//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, userSchema } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export async function searchUsers(query: string): Promise<User[]> {
    console.log('Searching users with query:', query)
    
    const users = await prisma.user.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
        orderBy: {
            name: 'asc',
        },
    })
    
    // Convert Prisma User to our User type
    const convertedUsers: User[] = users.map((user: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email || undefined, // Convert null to undefined
    }))
    
    console.log('Search results:', convertedUsers)
    return convertedUsers
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
    console.log('Adding user with data:', data)
    const validatedData = userSchema.omit({ id: true }).parse(data)
    
    const newUser = await prisma.user.create({
        data: {
            name: validatedData.name,
            phoneNumber: validatedData.phoneNumber,
            email: validatedData.email || null,
        },
    })
    
    console.log('User created successfully:', newUser)
    revalidatePath('/')
    return {
        id: newUser.id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email || undefined,
    }
}

export async function deleteUser(id: string): Promise<void> {
    const user = await prisma.user.findUnique({
        where: { id },
    })
    
    if (!user) {
        throw new Error(`User with id ${id} not found`)
    }
    
    await prisma.user.delete({
        where: { id },
    })
    
    console.log(`User with id ${id} has been deleted.`)
    revalidatePath('/')
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    const existingUser = await prisma.user.findUnique({
        where: { id },
    })
    
    if (!existingUser) {
        throw new Error(`User with id ${id} not found`)
    }
    
    const validatedData = userSchema.omit({ id: true }).partial().parse(data)
    
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            name: validatedData.name,
            phoneNumber: validatedData.phoneNumber,
            email: validatedData.email || null,
        },
    })
    
    console.log(`User with id ${id} has been updated.`)
    revalidatePath('/')
    
    return {
        id: updatedUser.id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        email: updatedUser.email || undefined,
    }
}

export const getUserById = cache(async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
    })
    
    if (!user) return null
    
    return {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email || undefined,
    }
})
