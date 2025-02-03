"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { graphqlClient, GET_ANALYTICS } from "@/lib/graphql"

type AnalyticsData = {
  totalReceivable: number
  totalPayable: number
  userSummary: {
    [username: string]: {
      receivable: number
      payable: number
    }
  }
}

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalReceivable: 0,
    totalPayable: 0,
    userSummary: {},
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { ledgerEntries } = await graphqlClient.request(GET_ANALYTICS)

        const data: AnalyticsData = {
          totalReceivable: 0,
          totalPayable: 0,
          userSummary: {},
        }

        ledgerEntries.forEach((entry: any) => {
          if (entry.type === "receivable") {
            data.totalReceivable += entry.amount
          } else {
            data.totalPayable += entry.amount
          }

          if (!data.userSummary[entry.username]) {
            data.userSummary[entry.username] = { receivable: 0, payable: 0 }
          }

          if (entry.type === "receivable") {
            data.userSummary[entry.username].receivable += entry.amount
          } else {
            data.userSummary[entry.username].payable += entry.amount
          }
        })

        setAnalyticsData(data)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      }
    }

    fetchAnalytics()
  }, [])

  const chartData = Object.entries(analyticsData.userSummary).map(([username, data]) => ({
    username,
    receivable: data.receivable,
    payable: data.payable,
  }))

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Receivable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${analyticsData.totalReceivable.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Payable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${analyticsData.totalPayable.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="username" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="receivable" fill="#8884d8" />
              <Bar dataKey="payable" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

