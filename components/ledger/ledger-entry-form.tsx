'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  databases,
  ID,
  DATABASE_ID,
  LEDGER_COLLECTION_ID,
} from '@/lib/database';

const formSchema = z.object({
  type: z.enum(['receivable', 'payable']).optional(),
  amount: z.string().refine(val => !isNaN(Number(val)), {
    message: 'Amount must be a valid number.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function LedgerEntryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'receivable',
      amount: '',
      description: '',
      email: '',
      username: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const data = await databases.createDocument(
        DATABASE_ID,
        LEDGER_COLLECTION_ID,
        ID.unique(),
        {
          type: values.type,
          amount: Number(values.amount),
          description: values.description,
          email: values.email,
          username: values.username,
        } 
      );
      console.log(data);
      toast({
        title: 'Ledger entry created',
        description: 'Your ledger entry has been successfully created.',
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while creating the ledger entry.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="receivable">Receivable</SelectItem>
                  <SelectItem value="payable">Payable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a description for this ledger entry"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating entry...' : 'Create Ledger Entry'}
        </Button>
      </form>
    </Form>
  );
}
