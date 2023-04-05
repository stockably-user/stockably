import { User } from '@supabase/supabase-js';
import { z } from 'zod';
import { SaveContactSchema } from './requestBody';

export interface SaveContact {
  user: User;
  contact: z.infer<typeof SaveContactSchema>;
}
