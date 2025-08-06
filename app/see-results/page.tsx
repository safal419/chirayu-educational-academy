"use client"

import { useState } from "react"
import { Trophy, TrendingUp, Users, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const resultsData = [
  {
    batch: "2081",
    year: "2024",
    totalStudents: 22,
    results: {
      "A+": 2,
      A: 12,
      "B+": 8,
      B: 0,
      "C+": 0,
      C: 0,
      "D+": 0,
      D: 0,
    },
    successRate: 100,
    toppers: [
      { name: "Anisha Sharma", grade: "A+", gpa: "3.95", photo: "/student-testimonial.png" },
      { name: "Rohit Thapa", grade: "A", gpa: "3.85", photo: "/placeholder-fa0sc.png" },
      { name: "Priya Gurung", grade: "A", gpa: "3.80", photo: "/parent-testimonial.png" },
    ],
  },
  {
    batch: "2080",
    year: "2023",
    totalStudents: 20,
    results: {
      "A+": 1,
      A: 11,
      "B+": 8,
      B: 0,
      "C+": 0,
      C: 0,
      "D+": 0,
      D: 0,
    },
    successRate: 100,
    toppers: [
      { name: "Suman Rai", grade: "A+", gpa: "4.00", photo: "/placeholder-k4mmd.png" },
      { name: "Kritika Poudel", grade: "A", gpa: "3.90", photo: "/friendly-woman-counselor.png" },
      { name: "Arjun Shrestha", grade: "A", gpa: "3.85", photo: "/placeholder-ff8jg.png" },
    ],
  },
  {
    batch: "2079",
    year: "2022",
    totalStudents: 18,
    results: {
      "A+": 2,
      A: 9,
      "B+": 6,
      B: 1,
      "C+": 0,
      C: 0,
      "D+": 0,
      D: 0,
    },
    successRate: 100,
    toppers: [
      { name: "Maya Tamang", grade: "A+", gpa: "3.95", photo: "/student-testimonial.png" },
      { name: "Bikash Gurung", grade: "A+", gpa: "3.90", photo: "/placeholder-fa0sc.png" },
      { name: "Sunita Karki", grade: "A", gpa: "3.85", photo: "/parent-testimonial.png" },
    ],
  },
]

export default function SEEResultsPage() {
  const [selectedYear, setSelectedYear] = useState("all")

  const filteredResults =
    selectedYear === "all" ? resultsData : resultsData.filter((batch) => batch.year === selectedYear)

  const years = [
    "all",
    ...Array.from(new Set(resultsData.map((batch) => batch.year)))
      .sort()
      .reverse(),
  ]

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">SEE Results</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Outstanding academic achievements of our Grade 10 students in the Secondary Education Examination across
            different batches.
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center bg-white rounded-lg shadow-lg p-2">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium mr-3">Filter by Year:</span>
            {years.map((year) => (
              <Button
                key={year}
                onClick={() => setSelectedYear(year)}
                variant={selectedYear === year ? "default" : "outline"}
                size="sm"
                className={`mx-1 ${
                  selectedYear === year
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-transparent hover:bg-blue-50 hover:shadow-md"
                }`}
              >
                {year === "all" ? "All Years" : year}
              </Button>
            ))}
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Trophy className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-sm opacity-90">Overall Success Rate</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Users className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">
              {filteredResults.reduce((sum, batch) => sum + batch.totalStudents, 0)}
            </div>
            <div className="text-sm opacity-90">Total Students</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <TrendingUp className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">
              {filteredResults.reduce((sum, batch) => sum + batch.results["A+"], 0)}
            </div>
            <div className="text-sm opacity-90">A+ Grades</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Filter className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">
              {filteredResults.reduce((sum, batch) => sum + batch.results.A, 0)}
            </div>
            <div className="text-sm opacity-90">A Grades</div>
          </div>
        </div>

        {/* Batch Results */}
        <div className="space-y-12">
          {filteredResults.map((batch) => (
            <div
              key={batch.batch}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Batch {batch.batch} ({batch.year})
                    </h2>
                    <p className="text-blue-100">{batch.totalStudents} students appeared for SEE examination</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-4xl font-bold">{batch.successRate}%</div>
                    <div className="text-sm text-blue-100">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Grade Distribution */}
                  <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Grade Distribution</h3>
                    <div className="space-y-4">
                      {Object.entries(batch.results).map(([grade, count]) => (
                        <div
                          key={grade}
                          className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full mr-3 shadow-sm ${
                                grade === "A+"
                                  ? "bg-green-500"
                                  : grade === "A"
                                    ? "bg-blue-500"
                                    : grade === "B+"
                                      ? "bg-purple-500"
                                      : grade === "B"
                                        ? "bg-orange-500"
                                        : "bg-gray-400"
                              }`}
                            ></div>
                            <span className="font-medium">Grade {grade}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900 mr-2">{count}</span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              ({((count / batch.totalStudents) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Performers</h3>
                    <div className="space-y-4">
                      {batch.toppers.map((student, index) => (
                        <div
                          key={student.name}
                          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-102"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-md ${
                                index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-400"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 shadow-md">
                              <img
                                src={student.photo || "/placeholder.svg"}
                                alt={student.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-600">GPA: {student.gpa}</div>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                              student.grade === "A+" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            Grade {student.grade}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Achieve Excellence with Us</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Join Chirayu Educational Academy and be part of our tradition of academic excellence. Our proven track
            record speaks for itself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              Apply for Admission
            </a>
            <a
              href="/academics/programs"
              className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              View Programs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
