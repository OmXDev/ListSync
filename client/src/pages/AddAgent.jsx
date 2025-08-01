import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import axios from "axios"
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export default function AddAgent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: {
            countryCode: "+1",
            number: "",
        },
        department: "",
        status: "active",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        // Handle nested phone fields
        if (name === "countryCode" || name === "number") {
            setFormData((prev) => ({
                ...prev,
                phone: {
                    ...prev.phone,
                    [name]: value,
                },
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const fullNumber = `${formData.phone.countryCode}${formData.phone.number}`

        try {
            await axios.post("http://localhost:5000/api/agents", {
                ...formData,
                phone: {
                    ...formData.phone,
                    fullNumber, // ✅ include fullNumber
                },
            })
            navigate("/dashboard/agents")
        } catch (error) {
            setError(error.response?.data?.error || "Failed to create agent")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link
                    to="/dashboard/agents"
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Agent</h1>
                    <p className="text-gray-600">Create a new agent profile</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter agent's full name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="agent@example.com"
                            />
                        </div>

                        <div className="w-full space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number *
                            </label>
                            <PhoneInput
                                country={'us'}
                                enableSearch
                                value={`${formData.phone.countryCode}${formData.phone.number}`}
                                onChange={(value, country) => {
                                    const countryCode = `+${country.dialCode}`
                                    const number = value.replace(country.dialCode, "").replace(/^\+/, "")
                                    setFormData((prev) => ({
                                        ...prev,
                                        phone: {
                                            countryCode,
                                            number,
                                        },
                                    }))
                                }}
                                inputProps={{
                                    required: true,
                                    name: "phone",
                                    id: "phone",
                                }}
                                containerClass="!w-full"
                                inputClass="!w-full !py-2 !pl-14 !pr-3 !rounded-lg !border !border-gray-300 focus:!ring-2 focus:!ring-blue-500 focus:!outline-none"
                                buttonClass="!border-none"
                                dropdownStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "0.5rem",
                                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                                    fontSize: "0.875rem",
                                    padding: "0.5rem",
                                    maxHeight: "220px",
                                    overflowY: "auto",
                                }}
                            />
                        </div>



                        {/* Department */}
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                                Department
                            </label>
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Department</option>
                                <option value="sales">Sales</option>
                                <option value="marketing">Marketing</option>
                                <option value="support">Support</option>
                                <option value="operations">Operations</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            to="/dashboard/agents"
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            {loading ? "Creating..." : "Create Agent"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
