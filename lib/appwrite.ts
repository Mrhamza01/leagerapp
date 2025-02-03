import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(String(process.env.appwriteURL))
  .setProject(String(process.env.appwriteURL));

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.appwriteURL; // Replace with your actual database ID
export const LEDGER_COLLECTION_ID = process.env.appwriteURL; // Replace with your actual collection ID
