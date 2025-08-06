"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, User, Mail, Phone, Award } from "lucide-react";

const mockTeam = [
  {
    id: 1,
    name: "Dr. Ram Sharma",
    position: "Principal",
    department: "Administration",
    email: "principal@chirayuacademy.edu.np",
    phone: "+977-9851060977",
    experience: "15 years",
    qualification: "Ph.D. in Education",
    status: "active",
    image: "/team-principal.png",
  },
  {
    id: 2,
    name: "Ms. Sita Thapa",
    position: "Vice Principal",
    department: "Administration",
    email: "vice.principal@chirayuacademy.edu.np",
    phone: "+977-1-4450778",
    experience: "12 years",
    qualification: "M.Ed. in Educational Leadership",
    status: "active",
    image: "/team-vice-principal.png",
  },
  {
    id: 3,
    name: "Mr. Hari Poudel",
    position: "Mathematics Teacher",
    department: "Academic",
    email: "hari.poudel@chirayuacademy.edu.np",
    phone: "+977-1-4450779",
    experience: "8 years",
    qualification: "M.Sc. Mathematics",
    status: "active",
    image: "/team-math-teacher.png",
  },
  {
    id: 4,
    name: "Ms. Gita Gurung",
    position: "Science Teacher",
    department: "Academic",
    email: "gita.gurung@chirayuacademy.edu.np",
    phone: "+977-1-4450780",
    experience: "6 years",
    qualification: "M.Sc. Physics",
    status: "active",
    image: "/team-science-teacher.png",
  },
  {
    id: 5,
    name: "Mr. Krishna Shrestha",
    position: "English Teacher",
    department: "Academic",
    email: "krishna.shrestha@chirayuacademy.edu.np",
    phone: "+977-1-4450781",
    experience: "10 years",
    qualification: "M.A. English Literature",
    status: "active",
    image: "/team-english-teacher.png",
  },
  {
    id: 6,
    name: "Ms. Maya Rai",
    position: "Computer Teacher",
    department: "Technology",
    email: "maya.rai@chirayuacademy.edu.np",
    phone: "+977-1-4450782",
    experience: "5 years",
    qualification: "B.E. Computer Engineering",
    status: "active",
    image: "/team-computer-teacher.png",
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState(mockTeam);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Administration":
        return "bg-blue-100 text-blue-800";
      case "Academic":
        return "bg-green-100 text-green-800";
      case "Technology":
        return "bg-purple-100 text-purple-800";
      case "Sports":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            Team Management
          </h1>
          <p className="text-gray-600">
            Manage school staff and faculty members
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 w-full md:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold">{team.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Teachers</p>
                <p className="text-2xl font-bold">
                  {team.filter((t) => t.department === "Academic").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Award className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin Staff</p>
                <p className="text-2xl font-bold">
                  {team.filter((t) => t.department === "Administration").length}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <User className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Experience</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    team.reduce(
                      (sum, t) => sum + Number.parseInt(t.experience),
                      0
                    ) / team.length
                  )}{" "}
                  yrs
                </p>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <Award className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative">
                <User className="h-16 w-16 text-white" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(
                      member.department
                    )}`}
                  >
                    {member.department}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{member.position}</p>
                  <p className="text-sm text-gray-600">
                    {member.qualification}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-green-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 mr-2 text-purple-500" />
                    <span>{member.experience} experience</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Create Team Member Modal */}
      {showCreateModal && (
        <CreateTeamMemberModal onClose={() => setShowCreateModal(false)} />
      )}
    </motion.div>
  );
}

function CreateTeamMemberModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">
            Add Team Member
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mathematics Teacher"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Administration">Administration</option>
                <option value="Academic">Academic</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 5 years"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Qualification
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., M.Sc. Mathematics"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@chirayuacademy.edu.np"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+977-1-XXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="member-photo-upload"
              />
              <label htmlFor="member-photo-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-2">
                  <User className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">Click to upload photo</p>
                <p className="text-sm text-gray-500">JPG, PNG up to 2MB</p>
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full md:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              Add Member
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
