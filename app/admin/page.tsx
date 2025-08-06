"use client"

import { motion } from "framer-motion"
import { Users, FileText, Calendar, TrendingUp, Bell, MessageSquare, Trophy, ImageIcon, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12% from last month",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Notices",
    value: "23",
    change: "+3 from last month",
    icon: Bell,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "+2 from last month",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Blog Posts",
    value: "156",
    change: "+8 from last month",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "notice",
    title: "New admission notice published",
    time: "2 hours ago",
    icon: Bell,
  },
  {
    id: 2,
    type: "event",
    title: "Sports Day event created",
    time: "4 hours ago",
    icon: Calendar,
  },
  {
    id: 3,
    type: "result",
    title: "SEE Results 2024 uploaded",
    time: "1 day ago",
    icon: Trophy,
  },
  {
    id: 4,
    type: "message",
    title: "New inquiry from parent",
    time: "2 days ago",
    icon: MessageSquare,
  },
]

const quickActions = [
  {
    title: "Add Notice",
    description: "Create a new notice",
    href: "/admin/notices",
    icon: Bell,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Create Event",
    description: "Schedule new event",
    href: "/admin/events",
    icon: Calendar,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Upload Photos",
    description: "Add to gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Write Blog",
    description: "Create blog post",
    href: "/admin/blog",
    icon: FileText,
    color: "bg-orange-500 hover:bg-orange-600",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at Chirayu Academy.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">
            <Mail className="w-4 h-4 mr-2" />
            View Messages
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor} shadow-md`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest updates and changes in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                    >
                      <div className="p-2 bg-white rounded-full shadow-sm">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200 bg-white shadow-sm"
                        asChild
                      >
                        <a href={action.href}>
                          <div className={`p-2 rounded-lg ${action.color} mr-3 shadow-sm`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{action.title}</p>
                            <p className="text-xs text-gray-500">{action.description}</p>
                          </div>
                        </a>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
