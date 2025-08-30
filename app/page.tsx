"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, Users, Mail, BarChart, FileText, Plus, Send, LogOut, User, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LinkedInOutreachApp() {
  const [activeTab, setActiveTab] = useState("auth");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Data states
  const [jobs, setJobs] = useState([]);
  const [connections, setConnections] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Check for stored token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setActiveTab("jobs");
    }
  }, []);

  // Auth functions
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin 
      ? { email, password }
      : { email, password, name };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setActiveTab("jobs");
      
      // Clear form
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setActiveTab("auth");
  };

  // Fetch jobs
  const fetchJobs = async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/api/jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  // Fetch connections
  const fetchConnections = async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/api/connections`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConnections(data);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/api/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === "jobs") fetchJobs();
    if (activeTab === "connections") fetchConnections();
    if (activeTab === "analytics") fetchAnalytics();
  }, [activeTab, token]);

  // Add a new job manually
  const handleAddJob = async () => {
    const jobData = {
      title: "Senior Frontend Developer",
      company: "Example Corp",
      location: "San Francisco, CA",
      description: "Looking for an experienced React developer with Next.js expertise",
      requirements: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      salary_range: "$150k - $200k",
      job_url: "https://example.com/jobs/123",
      application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    try {
      const response = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        fetchJobs(); // Refresh jobs list
      }
    } catch (err) {
      console.error('Error adding job:', err);
    }
  };

  // Add a new connection
  const handleAddConnection = async () => {
    const connectionData = {
      name: "John Doe",
      title: "Engineering Manager",
      company: "Tech Company",
      linkedin_url: "https://linkedin.com/in/johndoe",
      email: "john@example.com",
      notes: "Met at conference, interested in hiring React developers"
    };

    try {
      const response = await fetch(`${API_URL}/api/connections`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionData),
      });

      if (response.ok) {
        fetchConnections(); // Refresh connections list
      }
    } catch (err) {
      console.error('Error adding connection:', err);
    }
  };

  // Apply to a job
  const handleApplyToJob = async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cover_letter: "I am very interested in this position...",
          resume_version: "default"
        }),
      });

      if (response.ok) {
        fetchJobs(); // Refresh to show updated status
      }
    } catch (err) {
      console.error('Error applying to job:', err);
    }
  };

  // Render authentication form
  const renderAuthForm = () => (
    <div className="max-w-md mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Welcome back! Please login to continue.' : 'Create an account to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                isLogin ? 'Login' : 'Register'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );

  // Render jobs tab
  const renderJobsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Jobs</h2>
        <Button onClick={handleAddJob}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sample Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No jobs found. Click "Add Sample Job" to create one.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.company} • {job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements?.map((req, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {req}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium">{job.salary_range}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleApplyToJob(job.id)}
                  disabled={job.applied}
                >
                  {job.applied ? 'Applied' : 'Apply Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // Render connections tab
  const renderConnectionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Connections</h2>
        <Button onClick={handleAddConnection}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sample Connection
        </Button>
      </div>

      {connections.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No connections found. Click "Add Sample Connection" to create one.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {connections.map((connection) => (
            <Card key={connection.id}>
              <CardHeader>
                <CardTitle>{connection.name}</CardTitle>
                <CardDescription>{connection.title} at {connection.company}</CardDescription>
              </CardHeader>
              <CardContent>
                {connection.notes && (
                  <p className="text-sm text-gray-600">{connection.notes}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // Render analytics tab
  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      
      {analytics ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analytics.total_applications || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Total Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analytics.total_connections || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analytics.response_rate || '0%'}</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-10">
            <BarChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No analytics data available yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Main render
  if (!user && activeTab !== "auth") {
    return renderAuthForm();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">LinkedIn Outreach App</h1>
            
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.name || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      {user && (
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("jobs")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "jobs"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Briefcase className="h-4 w-4 inline mr-2" />
                Jobs
              </button>
              <button
                onClick={() => setActiveTab("connections")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "connections"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Connections
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "analytics"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <BarChart className="h-4 w-4 inline mr-2" />
                Analytics
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "auth" && renderAuthForm()}
        {activeTab === "jobs" && renderJobsTab()}
        {activeTab === "connections" && renderConnectionsTab()}
        {activeTab === "analytics" && renderAnalyticsTab()}
      </main>

      {/* Connection Status (for debugging) */}
      <div className="fixed bottom-4 right-4 text-xs bg-gray-800 text-white px-3 py-1 rounded">
        API: {API_URL}
      </div>
    </div>
  );
}

// END OF FILE
