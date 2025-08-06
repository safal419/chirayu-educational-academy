"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MailOpen, Reply, Trash2, Star, Archive, Search } from "lucide-react"

const mockMessages = [
  {
    id: 1,
    name: "Rajesh Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+977-98-12345678",
    subject: "Admission Inquiry for Grade 5",
    message:
      "I would like to inquire about the admission process for my child in Grade 5. Could you please provide information about the requirements and fees?",
    inquiryType: "admission",
    date: "2024-01-15T10:30:00",
    status: "unread",
    priority: "high",
  },
  {
    id: 2,
    name: "Priya Thapa",
    email: "priya.thapa@email.com",
    phone: "+977-98-87654321",
    subject: "Question about Academic Programs",
    message:
      "Hello, I wanted to know more about the co-curricular activities offered at your school. My daughter is particularly interested in music and dance.",
    inquiryType: "academic",
    date: "2024-01-14T14:20:00",
    status: "read",
    priority: "medium",
  },
  {
    id: 3,
    name: "Amit Poudel",
    email: "amit.poudel@email.com",
    phone: "+977-98-11223344",
    subject: "Transport Facility Inquiry",
    message:
      "I live in Lalitpur and would like to know if you provide transport facility from our area. What are the routes and charges?",
    inquiryType: "facilities",
    date: "2024-01-13T09:15:00",
    status: "replied",
    priority: "low",
  },
  {
    id: 4,
    name: "Sunita Gurung",
    email: "sunita.gurung@email.com",
    phone: "+977-98-55667788",
    subject: "SEE Results Inquiry",
    message:
      "Could you please provide detailed information about the SEE results of the last batch? I'm considering admission for my son.",
    inquiryType: "general",
    date: "2024-01-12T16:45:00",
    status: "unread",
    priority: "medium",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-gray-100 text-gray-800"
      case "replied":
        return "bg-green-100 text-green-800"
      case "archived":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((m) => m.status === "unread").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Manage inquiries and communications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <MailOpen className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Replied</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.status === "replied").length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Reply className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{message.name}</span>
                        <Star className={`h-4 w-4 ${getPriorityColor(message.priority)}`} />
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{message.subject}</p>
                    <p className="text-xs text-gray-500 mb-2">{message.email}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(message.date).toLocaleDateString()} at {new Date(message.date).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>From: {selectedMessage.name}</span>
                      <span>Email: {selectedMessage.email}</span>
                      <span>Phone: {selectedMessage.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}
                      >
                        {selectedMessage.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(selectedMessage.date).toLocaleDateString()} at{" "}
                        {new Date(selectedMessage.date).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Reply className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-800 leading-relaxed">{selectedMessage.message}</p>
                </div>

                {/* Reply Form */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reply</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        defaultValue={`Re: ${selectedMessage.subject}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type your reply..."
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline">Save Draft</Button>
                      <Button type="submit">Send Reply</Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Message Selected</h3>
                <p className="text-gray-600">Select a message from the inbox to view its details and reply.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
