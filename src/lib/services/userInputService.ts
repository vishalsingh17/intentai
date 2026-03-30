'use client';

import { createClient } from '@/lib/supabase/client';

function isSchemaError(error: unknown): boolean {
  if (!error) return false;
  const err = error as { code?: string; message?: string };
  if (err.code && typeof err.code === 'string') {
    const errorClass = err.code.substring(0, 2);
    if (errorClass === '42') return true;
    if (errorClass === '23') return false;
    if (errorClass === '08') return true;
  }
  if (err.message) {
    const schemaErrorPatterns = [
      /relation.*does not exist/i,
      /column.*does not exist/i,
      /function.*does not exist/i,
      /syntax error/i,
      /invalid.*syntax/i,
      /type.*does not exist/i,
      /undefined.*column/i,
      /undefined.*table/i,
      /undefined.*function/i,
    ];
    return schemaErrorPatterns.some((pattern) => pattern.test(err.message!));
  }
  return false;
}

export const userInputService = {
  async submitEarlyAccess(email: string, source: string = 'hero'): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('early_access_signups')
        .insert({ email, source });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        }
        // Duplicate email — unique constraint
        if (error.code === '23505') {
          return { success: false, message: 'You are already on the list!' };
        }
        console.log('Insert error:', error.message);
        return { success: false, message: 'Something went wrong. Please try again.' };
      }

      return { success: true, message: 'You are on the list! We will be in touch.' };
    } catch (err: unknown) {
      const e = err as { message?: string };
      console.log('Early access error:', e?.message);
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  },

  async submitDemoInput(inputText: string, category: string = 'general'): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('demo_inputs')
        .insert({ input_text: inputText, category });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        }
        console.log('Demo input error:', error.message);
        return { success: false, message: 'Could not save demo input.' };
      }

      return { success: true, message: 'Demo input saved.' };
    } catch (err: unknown) {
      const e = err as { message?: string };
      console.log('Demo input error:', e?.message);
      return { success: false, message: 'Could not save demo input.' };
    }
  },
};
