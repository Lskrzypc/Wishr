import { z } from 'zod';

export const personalInformationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string(),
});

export const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.number().optional(),
  isReserved: z.boolean().optional(),
  reservedBy: z.string().optional(),
});

export type ItemInterface = z.infer<typeof itemSchema>;

export const wishlistSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z.array(itemSchema).optional(),
  publicUrl: z.string(),
});

export type WishlistInterface = z.infer<typeof wishlistSchema>;

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  personalInformation: personalInformationSchema,
  wishlists: z.array(wishlistSchema).optional(),
});

export type UserInterface = z.infer<typeof userSchema>;
