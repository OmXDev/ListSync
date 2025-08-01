import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import DashboardLayout from "./components/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Agents from "./pages/Agents"
import AddAgent from "./pages/AddAgent"
import Upload from "./pages/Upload"
import DistributionLists from "./pages/DistributionLists"
import Settings from "./pages/Settings"
import "./App.css"
import ListDetails from "./pages/ListDetails"
import AgentListItems from "./pages/AgentListItems"
import HeroSection from "./components/HeroSection"
import HomeLayout from "./components/HomeLayout"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<HomeLayout/>}/>

          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="agents" element={<Agents />} />
            <Route path="agents/add" element={<AddAgent />} />
            <Route path="upload" element={<Upload />} />
            <Route path="lists" element={<DistributionLists />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/dashboard/lists/:uploadId" element={<ListDetails/>} />
            <Route path="/dashboard/agents/:agentId/lists" element={<AgentListItems/>} />

          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
