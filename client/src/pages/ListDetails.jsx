
"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { FileText } from "lucide-react"

export default function ListDetails() {
  const { uploadId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [fileInfo, setFileInfo] = useState(null);

 useEffect(() => {
  const fetchListDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lists/${uploadId}`);
      setItems(res.data.rows);     
      setFileInfo(res.data.file);   
    } catch (err) {
      console.error('Error fetching list details:', err);
    } finally {
      setLoading(false); // <-- THIS WAS MISSING
    }
  };

  fetchListDetails();
}, [uploadId]);


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">List Details</h1>
      {loading ? (
        <div>Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500">No items in this list.</div>
      ) : (
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
