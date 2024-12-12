import { z } from 'zod'

export const emailValidation = z
            .string()
            .email({message: "Invalid Email format."})

export const passwordValidation = z
            .string()
            .min(6, {message: "Password must be atleast 6 characters."})

export const signInSchema = z.object({
    email: emailValidation,
    password: passwordValidation
})
