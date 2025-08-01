"use client"

import { useState, useEffect } from "react"
import { apiService } from "../services/api"
import { Search, FileText, Users, Calendar } from "lucide-react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function DistributionLists() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchLists()
  }, [])

 const fetchLists = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/lists");
    setLists(response.data);
  } catch (error) {
    console.error("Error fetching distribution lists:", error);
    setLists([]); // optionally show fallback
  } finally {
    setLoading(false);
  }
};


  const filteredLists = lists.filter((list) => {
  const name = list.name || "";
  const description = list.description || "";
  return (
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    description.toLowerCase().includes(searchTerm.toLowerCase())
  );
});


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Distribution Lists</h1>
        <p className="text-gray-600">View and manage agent distribution lists</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search distribution lists..."
          />
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.map((list) => (
          <div
            key={list._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{list.fileName}</h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      list.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {list.status}
                  </span>
                  
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>{list.agentCount} agents assigned</span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Created {formatDate(list.createdAt)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link to={`/dashboard/lists/${list.uploadId}`}>
  <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
    View Details
  </button>
</Link>
            </div>
          </div>
        ))}
      </div>

      {filteredLists.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No distribution lists found</h3>
          <p className="text-gray-500">
            {searchTerm ? "Try adjusting your search criteria." : "Create your first distribution list to get started."}
          </p>
        </div>
      )}
    </div>
  )
}
