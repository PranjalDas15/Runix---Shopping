import {z} from 'zod'

const UserSignUpSchema = z.object({
    email: z.string().email({message: "Invalid Email address."}),
    password: z.string().min(6, {message: "Minimum 6 characters reqired."}),
    phone: z.number().min(10, {message: "Phone number must be of 10 digits."}).max(10, {message: "Phone number must be of 10 digits."}),
})

export default UserSignUpSchema;