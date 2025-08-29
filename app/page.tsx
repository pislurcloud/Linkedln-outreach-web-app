"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Briefcase, Users, Mail, BarChart, FileText, Plus, Send, Target, TrendingUp, Calendar, Clock, Check, X, ChevronRight, Star, Upload, Edit } from "lucide-react";

export default function LinkedInOutreachApp() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [resumeScore, setResumeScore] = useState(75);

  const tabs = [
    { id: "jobs", label: "Job Search", icon: Briefcase },
    { id: "connections", label: "Connections", icon: Users },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "analytics", label: "Analytics", icon: BarChart }
  ];

  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$150k - $200k",
      posted: "2 days ago",
      match: 92,
      applied: false
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$120k - $180k",
      posted: "1 week ago",
      match: 85,
      applied: true
    },
    {
      id: 3,
      title: "React Developer",
      company: "Digital Agency",
      location: "New York, NY",
      salary: "$130k - $170k",
      posted: "3 days ago",
      match: 88,
      applied: false
    }
  ];

  const mockConnections = [
    { id: 1, name: "Sarah Johnson", title: "Engineering Manager", company: "TechCorp Inc.", mutual: 12 },
    { id: 2, name: "Michael Chen", title: "Senior Developer", company: "StartupXYZ", mutual: 8 },
    { id: 3, name: "Emily Davis", title: "Tech Recruiter", company: "Digital Agency", mutual: 15 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">LinkedIn Outreach Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search jobs by title, company, or skills..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {mockJobs.map((job) => (
                  <Card key={job.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <CardDescription>{job.company} • {job.location}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">{job.match}% Match</div>
                          <div className="text-xs text-gray-500">{job.posted}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{job.salary}</span>
                        <div className="flex gap-2">
                          {job.applied ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Applied</span>
                          ) : (
                            <Button size="sm">Quick Apply</Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Star className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Job Match Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Average Match Score</span>
                      <span className="font-semibold">88%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Jobs Applied</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Response Rate</span>
                      <span className="font-semibold">25%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Connections Tab */}
        {activeTab === "connections" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Suggested Connections</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Find More
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockConnections.map((connection) => (
                <Card key={connection.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{connection.name}</h3>
                        <p className="text-sm text-gray-600">{connection.title}</p>
                        <p className="text-xs text-gray-500">{connection.company}</p>
                        <p className="text-xs text-gray-500 mt-1">{connection.mutual} mutual connections</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resume Tab */}
        {activeTab === "resume" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Optimization</CardTitle>
                <CardDescription>AI-powered analysis to improve your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drop your resume here or click to upload</p>
                  <Button variant="outline">Choose File</Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-blue-600">{resumeScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${resumeScore}%` }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Improvement Suggestions</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Strong action verbs used throughout</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <span className="text-sm">Add quantifiable achievements</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <span className="text-sm">Include more relevant keywords</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Optimize Resume</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>Customize your outreach messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template">Select Template</Label>
                  <Select defaultValue="connection">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="connection">Initial Connection</SelectItem>
                      <SelectItem value="followup">Follow Up</SelectItem>
                      <SelectItem value="inquiry">Job Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Hi [Name], I noticed we both work in [Industry]..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">Save Template</Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">33%</div>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +5% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  This week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  +8 new this week
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

// END OF FILE
