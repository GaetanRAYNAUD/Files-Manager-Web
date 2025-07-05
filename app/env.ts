import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url()
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

// validated env vars
export const env = parsedEnv.data;
