"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Users, FileText, Upload, TrendingUp } from "lucide-react"
import axios from "axios"

export default function Dashboard() {
    const [activities, setActivities] = useState([])
    const [stats, setStats] = useState({
        totalAgents: 0,
        totalLists: 0,
        recentUploads: 0,
        activeAgents: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const [agentsResponse, listsResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/agents`),
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/lists`),
            ])

            const agents = agentsResponse.data
            const lists = listsResponse.data

            const currentStats = {
                totalAgents: agents.length,
                totalLists: lists.length,
                recentUploads: lists.slice(0, 5).length, // You can replace logic here with real recent data
                activeAgents: agents.filter(agent => agent.status === "active").length,
            }

            // Previous values (could come from backend ideally)
            const previousStats = {
                totalAgents: 0,
                totalLists: 0,
                recentUploads: 0,
                activeAgents: 0,
            }

            const calculateChange = (current, previous) => {
                if (previous === 0) {
                    return current === 0 ? "0%" : "+100%" // Avoid division by zero
                }
                const diff = ((current - previous) / previous) * 100
                const sign = diff > 0 ? "+" : diff < 0 ? "−" : ""
                return `${sign}${Math.abs(diff).toFixed(1)}%`
            }


            const change = {
                totalAgents: calculateChange(currentStats.totalAgents, previousStats.totalAgents),
                totalLists: calculateChange(currentStats.totalLists, previousStats.totalLists),
                recentUploads: calculateChange(currentStats.recentUploads, previousStats.recentUploads),
                activeAgents: calculateChange(currentStats.activeAgents, previousStats.activeAgents),
            }

            setStats({ ...currentStats, change })
        } catch (error) {
            console.error("Error fetching stats:", error)
            setStats({
                totalAgents: 0,
                totalLists: 0,
                recentUploads: 0,
                activeAgents: 0,
                change: {
                    totalAgents: "+0%",
                    totalLists: "+0%",
                    recentUploads: "+0%",
                    activeAgents: "+0%",
                }
            })
        } finally {
            setLoading(false)
        }
    }



    const statCards = [
        {
            title: "Total Agents",
            value: stats.totalAgents,
            icon: Users,
            color: "bg-blue-500",
            change: stats.change?.totalAgents || "+0%",
        },
        {
            title: "Distribution Lists",
            value: stats.totalLists,
            icon: FileText,
            color: "bg-green-500",
            change: stats.change?.totalLists || "+0%",
        },
        {
            title: "Recent Uploads",
            value: stats.recentUploads,
            icon: Upload,
            color: "bg-purple-500",
            change: stats.change?.recentUploads || "+0%",
        },
        {
            title: "Active Agents",
            value: stats.activeAgents,
            icon: TrendingUp,
            color: "bg-orange-500",
            change: stats.change?.activeAgents || "+0%",
        },
    ]


useEffect(() => {
  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/activities`)
      setActivities(res.data)
    } catch (err) {
      console.error("Failed to fetch activity log:", err)
    }
  }

  fetchActivities()
}, [])


    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Admin Dashboard</h1>
                <p className="text-gray-600">Manage your agents and distribution lists efficiently</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link
                            to="/dashboard/agents/add"
                            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <Users className="w-5 h-5 text-blue-600 mr-3" />
                            <span className="font-medium text-gray-900">Add New Agent</span>
                        </Link>
                        <Link
                            to="/dashboard/upload"
                            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <Upload className="w-5 h-5 text-green-600 mr-3" />
                            <span className="font-medium text-gray-900">Upload CSV/XLSX</span>
                        </Link>
                        <Link
                            to="/dashboard/agents"
                            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <FileText className="w-5 h-5 text-purple-600 mr-3" />
                            <span className="font-medium text-gray-900">View All Agents</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
  <div className="space-y-3">
    {activities.map((activity) => (
      <div
        key={activity._id}
        className="flex items-center p-3 rounded-lg bg-gray-50"
      >
        <div
          className={`w-2 h-2 rounded-full mr-3 ${
            activity.type === "agent"
              ? "bg-green-500"
              : activity.type === "upload"
              ? "bg-blue-500"
              : "bg-purple-500"
          }`}
        ></div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
          <p className="text-xs text-gray-500">
            {new Date(activity.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

            </div>
        </div>
    )
}
