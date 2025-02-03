import { LedgerEntryForm } from "@/components/ledger/ledger-entry-form"
import { LedgerEntriesTable } from "@/components/ledger/ledger-entries-table"

export default function LedgerPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Ledger</h1>
      <div className="max-w-2xl">
        <LedgerEntryForm />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Ledger Entries</h2>
        <LedgerEntriesTable />
      </div>
    </div>
  )
}

