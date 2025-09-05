"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Bell,
  MessageSquare,
  Trophy,
  ImageIcon,
  Mail,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { apiConfig } from "@/lib/config";

interface DashboardData {
  totalStudents: number;
  activeNotices: number;
  upcomingEvents: number;
  totalGalleryAlbums: number;
  recentActivities: Array<{
    id: string;
    type: string;
    title: string;
    time: string;
    icon: any;
  }>;
}

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
];

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalStudents: 0,
    activeNotices: 0,
    upcomingEvents: 0,
    totalGalleryAlbums: 0,
    recentActivities: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch data from all APIs in parallel
      const [eventsRes, galleryRes, noticesRes, resultsRes] = await Promise.all(
        [
          axios.get(apiConfig.endpoints.events).catch(() => ({ data: [] })),
          axios.get(apiConfig.endpoints.gallery).catch(() => ({ data: [] })),
          axios.get(apiConfig.endpoints.notices).catch(() => ({ data: [] })),
          axios.get(apiConfig.endpoints.results).catch(() => ({ data: [] })),
        ]
      );

      const events = eventsRes.data || [];
      const gallery = galleryRes.data || [];
      const notices = noticesRes.data || [];
      const results = resultsRes.data || [];

      // Calculate upcoming events (next 30 days)
      const now = new Date();
      const thirtyDaysFromNow = new Date(
        now.getTime() + 30 * 24 * 60 * 60 * 1000
      );
      const upcomingEvents = events.filter((event: any) => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= thirtyDaysFromNow;
      });

      // Calculate total students from results
      const totalStudents = results.reduce((sum: number, result: any) => {
        return sum + (result.totalStudents || 0);
      }, 0);

      // Create recent activities from all data sources
      const recentActivities = [
        ...events.slice(0, 2).map((event: any) => ({
          id: `event-${event._id || event.id}`,
          type: "event",
          title: `"${event.title}" event ${
            event.status === "upcoming" ? "scheduled" : "created"
          }`,
          time: new Date(event.date).toLocaleDateString(),
          icon: Calendar,
        })),
        ...gallery.slice(0, 1).map((album: any) => ({
          id: `gallery-${album._id || album.id}`,
          type: "gallery",
          title: `"${album.title}" album added to gallery`,
          time: new Date(album.date).toLocaleDateString(),
          icon: ImageIcon,
        })),
        ...results.slice(0, 1).map((result: any) => ({
          id: `result-${result._id || result.id}`,
          type: "result",
          title: `SEE Results ${result.year} (${result.batch}) uploaded`,
          time: new Date().toLocaleDateString(),
          icon: Trophy,
        })),
      ]
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 4);

      setDashboardData({
        totalStudents,
        activeNotices: notices.length,
        upcomingEvents: upcomingEvents.length,
        totalGalleryAlbums: gallery.length,
        recentActivities,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Students",
      value: dashboardData.totalStudents.toLocaleString(),
      change: "From all SEE results",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Notices",
      value: dashboardData.activeNotices.toString(),
      change: "Published notices",
      icon: Bell,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Upcoming Events",
      value: dashboardData.upcomingEvents.toString(),
      change: "Next 30 days",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Gallery Albums",
      value: dashboardData.totalGalleryAlbums.toString(),
      change: "Photo albums",
      icon: ImageIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at Chirayu Academy.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                      <div className="p-3 bg-gray-200 rounded-full animate-pulse">
                        <div className="w-6 h-6"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          : stats.map((stat, index) => {
              const Icon = stat.icon;
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
                          <p className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">
                            {stat.value}
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            {stat.change}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full ${stat.bgColor} shadow-md`}
                        >
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
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
              <CardDescription>
                Latest updates and changes in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  // Loading skeleton for activities
                  Array.from({ length: 4 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-gray-200 rounded-full animate-pulse">
                        <div className="w-4 h-4"></div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                      </div>
                    </motion.div>
                  ))
                ) : dashboardData.recentActivities.length > 0 ? (
                  dashboardData.recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
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
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent activities found</p>
                    <p className="text-sm">
                      Activities will appear here as you use the system
                    </p>
                  </div>
                )}
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
                  const Icon = action.icon;
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
                          <div
                            className={`p-2 rounded-lg ${action.color} mr-3 shadow-sm`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{action.title}</p>
                            <p className="text-xs text-gray-500">
                              {action.description}
                            </p>
                          </div>
                        </a>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
