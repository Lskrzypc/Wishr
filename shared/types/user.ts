import { z } from 'zod';

export const personalInformationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string(),
  optIn: z.boolean().optional(),
});

export const tokenTableSchema = z.array(
  z.object({
    id: z.string(),
    count: z.number(),
    usedTokens: z.number(),
    expiresAt: z.string().optional(),
  }),
);

export const transactionsHistorySchema = z.array(
  z.object({
    paymentId: z.string(),
    invoiceId: z.string(),
    paymentStatus: z.string(),
    amountTotal: z.number(),
    currency: z.string(),
    createdAt: z.string(),
  }),
);

export const subscriptionHistorySchema = z.array(
  z.object({
    subscriptionId: z.string(),
    status: z.string(),
    invoiceId: z.string(),
    startedAt: z.string(),
    paymentDate: z.string(),
  }),
);

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  authProvider: z.string(),
  authProviderId: z.string(),
  paymentProvider: z.string().optional(),
  paymentProviderId: z.string().optional(),
  personalInformation: personalInformationSchema,
  tokenTable: tokenTableSchema,
  transactionsHistory: transactionsHistorySchema.optional(),
  subscriptionHistory: subscriptionHistorySchema.optional(),
});

export type TokenTableInterface = z.infer<typeof tokenTableSchema>;
export type TransactionHistory = z.infer<typeof transactionsHistorySchema>;
export type UserInterface = z.infer<typeof userSchema>;
