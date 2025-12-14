import {z} from 'zod';

export const LoginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export const CreateWaiterSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().optional()
});

export const CreateOrderSchema = z.object({
    tableId: z.string(),
    items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
    instructions: z.string().optional()
  })),
  specialInstructions: z.string().optional()
});

export const UpdateOrderStatusSchema = z.object({
    status: z.enum([
        "pending", "confirmed", "preparing", "ready", "served"
    ])
});

export const AssignTableSchema = z.object({
    tableId: z.string()
});