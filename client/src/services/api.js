import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("adminToken")
          window.location.href = "/login"
        }
        return Promise.reject(error)
      },
    )
  }

  setAuthToken(token) {
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete this.api.defaults.headers.common["Authorization"]
    }
  }

  // Auth endpoints
  login(credentials) {
    return this.api.post("/auth/login", credentials)
  }

  // Agent endpoints
  getAgents() {
    return this.api.get("/agents")
  }

  createAgent(agentData) {
    return this.api.post("/agents", agentData)
  }

  updateAgent(id, agentData) {
    return this.api.put(`/agents/${id}`, agentData)
  }

  deleteAgent(id) {
    return this.api.delete(`/agents/${id}`)
  }

  // File upload
  uploadFile(file) {
    const formData = new FormData()
    formData.append("file", file)
    return this.api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  // Distribution lists
  getDistributionLists() {
    return this.api.get("/distribution-lists")
  }
}

export const apiService = new ApiService()
