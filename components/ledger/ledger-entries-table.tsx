'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  DATABASE_ID,
  LEDGER_COLLECTION_ID,
  retryOperation,
} from '@/lib/database';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { graphqlClient, GET_LEDGER_ENTRIES } from '@/lib/graphql';
import { useToast } from '@/components/ui/use-toast';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

type LedgerEntry = {
  $id: string;
  type: 'receivable' | 'payable';
  amount: number;
  description: string;
  email: string;
  username: string;
};

export function LedgerEntriesTable() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [sortField, setSortField] = useState<keyof LedgerEntry>('username');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { register, handleSubmit } = useForm<{
    searchTerm: string;
    username: string;
  }>();
  const { toast } = useToast();

  const fetchEntries = async (searchTerm = '', username = '') => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        LEDGER_COLLECTION_ID,
        [Query.orderDesc('type')]
      );
  
      const ledgerEntries: LedgerEntry[] = response.documents.map((doc: any) => ({
        $id: doc.$id,
        type: doc.type,
        amount: doc.amount,
        description: doc.description,
        email: doc.email,
        username: doc.username,
      }));
  
      setEntries(ledgerEntries);
    } catch (error) {
      console.error('Error fetching ledger entries:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch ledger entries. Please try again.',
        variant: 'destructive',
      });
    }
  };
  

  useEffect(() => {
    fetchEntries();
  }, []); //Added empty dependency array to fix the warning

  const onSubmit = (data: { searchTerm: string; username: string }) => {
    fetchEntries(data.searchTerm, data.username);
  };

  const handleSort = (field: keyof LedgerEntry) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input
          {...register('searchTerm')}
          placeholder="Search by description"
        />
        <Input {...register('username')} placeholder="Filter by username" />
        <Button type="submit">Search</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort('type')}
              className="cursor-pointer"
            >
              Type
            </TableHead>
            <TableHead
              onClick={() => handleSort('amount')}
              className="cursor-pointer"
            >
              Amount
            </TableHead>
            <TableHead
              onClick={() => handleSort('description')}
              className="cursor-pointer"
            >
              Description
            </TableHead>
            <TableHead
              onClick={() => handleSort('email')}
              className="cursor-pointer"
            >
              Email
            </TableHead>
            <TableHead
              onClick={() => handleSort('username')}
              className="cursor-pointer"
            >
              Username
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map(entry => (
            <TableRow key={entry.$id}>
              <TableCell>{entry.type}</TableCell>
              <TableCell>{entry.amount}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>{entry.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
