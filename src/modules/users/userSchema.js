import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const signUpSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'name is required',
    })
    .min(3, { message: 'name is too short' })
    .max(50, { message: 'name is too long' }),

  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
 
  role: z.enum(['normal', 'admin']),
  
});

const loginSchema=z.object({
email:z.string().email({message:"invalid email"}),
password:z.string()
.min(8,{message:"password must be at least 8 characters"})
.max(12,{message:"password is too long"})
})




const updateUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  name: z
    .string()
    .min(3, { message: 'name is too short' })
    .max(50, { message: 'name is too long' }),
});

export function validateUser(data) {
    const result = signUpSchema.safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: userData,
    } = extractValidationData(result);
  
    return {
      hasError,
      errorMessages,
      userData,
    };
  }
  export function validatePartialUser(data) {
    const result = updateUserSchema.partial().safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: userData,
    } = extractValidationData(result);
  
    return {
      hasError,
      errorMessages,
      userData,
    };
  }
  
  export function validateLogin(data){
    const result=loginSchema.safeParse(data)
    const {hasError,errorMessages,data:userData}=extractValidationData(result)
    return{hasError,errorMessages,userData}

  }