"use client"

import { useState, useRef } from "react"
import { apiService } from "../services/api"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import axios from "axios"
import { useEffect } from "react";
import { Eye } from "lucide-react"; // for view icon

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
const [loadingFiles, setLoadingFiles] = useState(true);
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadResults, setUploadResults] = useState([])
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) => {
      const validTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ]
      return validTypes.includes(file.type) || file.name.endsWith(".csv") || file.name.endsWith(".xlsx")
    })

    setFiles((prev) => [
      ...prev,
      ...validFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        status: "pending",
      })),
    ])
  }

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const uploadFiles = async () => {
  setUploading(true);
  const results = [];

  for (const fileObj of files) {
    const formData = new FormData();
    formData.append("file", fileObj.file);

    try {
      const response = await axios.post("http://localhost:5000/api/lists/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      results.push({
        fileName: fileObj.file.name,
        status: "success",
        message: "File uploaded successfully",
        data: response.data,
      });
    } catch (error) {
      results.push({
        fileName: fileObj.file.name,
        status: "error",
        message: error.response?.data?.error || "Upload failed",
      });
    }
  }

  setUploadResults(results);
  setUploading(false);
  setFiles([]);
};


  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  useEffect(() => {
  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/lists");
      setUploadedFiles(res.data);
    } catch (err) {
      console.error("Error fetching uploaded files:", err);
    }
  };

  fetchFiles();
}, []);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Files</h1>
        <p className="text-gray-600">Upload CSV or XLSX files to import agent data</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>

            <div>
              <p className="text-lg font-medium text-gray-900">Drop files here or click to browse</p>
              <p className="text-sm text-gray-500 mt-1">Supports CSV and XLSX files up to 10MB</p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Files</h3>
          <div className="space-y-3">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{fileObj.file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(fileObj.file.size)}</p>
                  </div>
                </div>
                <button onClick={() => removeFile(fileObj.id)} className="p-1 text-gray-400 hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              {uploading ? "Uploading..." : "Upload Files"}
            </button>
          </div>
        </div>
      )}

      {/* Upload Results */}
      {uploadResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Results</h3>
          <div className="space-y-3">
            {uploadResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  {result.status === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{result.fileName}</p>
                    <p className={`text-xs ${result.status === "success" ? "text-green-600" : "text-red-600"}`}>
                      {result.message}
                    </p>
                  </div>
                </div>
                <span
                  className={`
                  px-2 py-1 text-xs font-semibold rounded-full
                  ${result.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                `}
                >
                  {result.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Uploaded Files Section */}
{/* Uploaded Files Section */}
{uploadedFiles.length > 0 && (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
    <ul className="space-y-4">
      {uploadedFiles
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Newest first
        .map((file) => (
          <li
            key={file._id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{file.fileName}</p>
              <p className="text-xs text-gray-500">
                Uploaded on {new Date(file.createdAt).toLocaleString()}
              </p>
            </div>
            <button
  onClick={() =>
    window.open(
      `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(file.cloudinaryUrl)}`,
      "_blank"
    )
  }
  className="text-blue-600 hover:text-blue-800 text-sm underline"
>
  View Details
</button>

          </li>
        ))}
    </ul>
  </div>
)}


    </div>
  )
}
