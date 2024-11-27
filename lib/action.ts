"use server";

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  id: z.string(),
  activityName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().optional(),
  participants: z.string().optional(),
  notes: z.string().optional(), 
  date: z.string()
})

const CreateActivity = formSchema.omit({
  id:true, date:true
});

export type State = {
  errors?:{
    id?: string[];
    activityName?: string[];
    description?: string[];
    participants?:string[];
  };
  message?: string | null;
}

export async function createActivity(formData:FormData){
  const validateFields = CreateActivity.safeParse({
    id: formData.get('id'),
    activityName: formData.get('activityName'),
    description: formData.get('description'),
    participants: formData.get('participants'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Activity.',
    };
  }

  console.log(validateFields)
  // const { id, activityName, description, participants} = validateFields.data;
  const date = new Date().toISOString().split('T')[0];

  // try {
  //   await sql `
  //   INSERT INTO invoices (customer_id, amount, status, date)
  //   VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  // `;
  // } catch (error){
  //   return {
  //     message: "Database Error: Failed to Create Invoice"
  //   }
  // };
  
  revalidatePath('/activities');
  redirect('/activities');
}