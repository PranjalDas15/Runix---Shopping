import {z} from 'zod';


export const emailValidation = z
            .string()
            .email({message: "Invalid Email format."})

export const phoneValidation = z
            .string()
            .min(10, {message: "Not a valid phone number."})
            .max(10, {message: "Not a valid phone number."})

export const passwordValidation = z
            .string()
            .min(6, {message: "Password must be atleast 6 characters."})

export const roleValidation = z
            .string({message: "Role must be added."})

export const signUpSchema = z.object({
    email: emailValidation,
    phone: phoneValidation,
    password: passwordValidation,
    role: roleValidation
})