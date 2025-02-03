import { Client, Account, Databases, ID } from "appwrite"

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject("679b705a00204b03353e")

export const account = new Account(client)
export const databases = new Databases(client)
export { ID }

export const DATABASE_ID = "ledger_database" // Replace with your actual database ID
export const LEDGER_COLLECTION_ID = "ledger_entries" // Replace with your actual collection ID

export async function initializeAppwrite() {
  try {
    // Test the connection by getting the account
    await account.get()
    console.log("Appwrite connection successful")
  } catch (error) {
    console.error("Error initializing Appwrite:", error)
    throw error
  }
}

export async function retryOperation<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw new Error("Max retries reached")
}

