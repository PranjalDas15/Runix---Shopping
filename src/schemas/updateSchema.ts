import {z} from 'zod';


export const phoneValidation = z
            .string()
            .min(10, {message: "Not a valid phone number."})
            .max(10, {message: "Not a valid phone number."})
            .optional()

export const addressValidation = z  
            .array(z.string()).optional()

export const updateSchema = z.object({
    phone: phoneValidation,
    address: addressValidation
})