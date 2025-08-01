// app/dashboard/agents/[agentId]/lists/page.jsx
"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function AgentListItems() {
  const { agentId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/agents/${agentId}/lists`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching agent's items:", err))
      .finally(() => setLoading(false))
  }, [agentId])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Assigned Items</h1>
      {loading ? (
        <div>Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500">This agent has no assigned items.</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 text-sm text-gray-900">{item.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
