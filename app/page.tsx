"use client"
import React, { useState } from 'react';
import { ArrowRight, BarChart2, Shield, Wallet, Search, Filter, SortAsc, Download } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for the demo
  const sampleData = [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 3000, expenses: 1398 },
    { month: 'Mar', income: 2000, expenses: 9800 },
    { month: 'Apr', income: 2780, expenses: 3908 },
    { month: 'May', income: 1890, expenses: 4800 },
    { month: 'Jun', income: 2390, expenses: 3800 },
  ];

  const sampleTransactions = [
    { id: 1, type: 'receivable', amount: 1500, description: 'Client Payment', email: 'client@example.com', username: 'client1' },
    { id: 2, type: 'payable', amount: 800, description: 'Office Supplies', email: 'office@example.com', username: 'admin' },
    { id: 3, type: 'receivable', amount: 2500, description: 'Service Fee', email: 'customer@example.com', username: 'customer1' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Ledger</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('transactions')}
                className={`px-3 py-2 ${activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Transactions
              </button>
              <button 
                onClick={() => setActiveTab('reports')}
                className={`px-3 py-2 ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Reports
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'overview' && (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Smart Financial Management
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Advanced tracking, intelligent insights, and powerful reporting tools all in one place.
                </p>
                <button
                  onClick={() => router.push('/signup')}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="income" stroke="#3b82f6" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="relative max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    placeholder="Search transactions..." 
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="receivable">Receivable</SelectItem>
                    <SelectItem value="payable">Payable</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
                <Button variant="outline" className="gap-2">
                  <SortAsc className="h-4 w-4" />
                  Sort
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer">Type</TableHead>
                  <TableHead className="cursor-pointer">Amount</TableHead>
                  <TableHead className="cursor-pointer">Description</TableHead>
                  <TableHead className="cursor-pointer">Email</TableHead>
                  <TableHead className="cursor-pointer">Username</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleTransactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.email}</TableCell>
                    <TableCell>{transaction.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Financial Reports</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Income vs Expenses</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="income" stroke="#3b82f6" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Transaction Summary</h4>
                {/* Add more visualizations here */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ledger</h3>
              <p className="text-gray-600">
                Professional financial management platform
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Analytics</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Reports</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Export</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;