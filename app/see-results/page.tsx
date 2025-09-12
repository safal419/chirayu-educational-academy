"use client";

import { useEffect, useState } from "react";
import { Trophy, TrendingUp, Users, Filter, Calendar } from "lucide-react";
import { Result } from "@/types";
import axios from "axios";
import { apiConfig } from "@/lib/config";
import Loading from "@/components/Loading";

export default function SEEResultsPage() {
  const [resultsData, setResultsData] = useState<Result[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get<Result[]>(apiConfig.endpoints.results);
        setResultsData(res.data);
      } catch (err) {
        console.error("Failed to fetch SEE results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const filteredResults =
    selectedYear === "all"
      ? resultsData
      : resultsData.filter((batch) => batch.year === selectedYear);

  const years = [
    "all",
    ...Array.from(new Set(resultsData.map((batch) => batch.year)))
      .sort()
      .reverse(),
  ];

  if (loading)
    return <Loading mode="skeleton" count={4} message="Loading results..." />;

  if (resultsData.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          No Results Found
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-md">
          Try adjusting your search or filter to find what you’re looking for.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm sm:text-base font-medium shadow hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>
    );

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SEE Results
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Outstanding academic achievements of our Grade 10 students in the
            Secondary Education Examination across different batches.
          </p>
        </div>

        {/* Year Filter Dropdown */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center bg-white rounded-lg shadow-lg p-2">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium mr-3">
              Filter by Year:
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "all" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Trophy className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">
              {filteredResults.length > 0
                ? Math.round(
                    filteredResults.reduce(
                      (sum, batch) => sum + batch.successRate,
                      0
                    ) / filteredResults.length
                  )
                : 0}
              %
            </div>
            <div className="text-sm opacity-90">Overall Success Rate</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Users className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">
              {filteredResults.reduce(
                (sum, batch) => sum + batch.totalStudents,
                0
              )}
            </div>
            <div className="text-sm opacity-90">Total Students</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <TrendingUp className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">
              {filteredResults.reduce(
                (sum, batch) =>
                  sum + batch.toppers.filter((t) => t.grade === "A+").length,
                0
              )}
            </div>
            <div className="text-sm opacity-90">A+ Grades</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Filter className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">
              {filteredResults.reduce(
                (sum, batch) =>
                  sum + batch.toppers.filter((t) => t.grade === "A").length,
                0
              )}
            </div>
            <div className="text-sm opacity-90">A Grades</div>
          </div>
        </div>

        {/* Batch Results */}
        <div className="space-y-12">
          {filteredResults.map((batch) => (
            <div
              key={batch._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Batch {batch.batch} ({batch.year})
                    </h2>
                    <p className="text-blue-100">
                      {batch.totalStudents} students appeared for SEE
                      examination
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-center bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-4xl font-bold">
                      {batch.successRate}%
                    </div>
                    <div className="text-sm text-blue-100">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Performers */}
                  <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Top Performers
                    </h3>
                    <div className="space-y-4">
                      {batch.toppers.map((student, index) => (
                        <div
                          key={student.name}
                          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-102"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-md ${
                                index === 0
                                  ? "bg-yellow-500"
                                  : index === 1
                                  ? "bg-gray-400"
                                  : "bg-orange-400"
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
                              <div className="font-semibold text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                GPA: {student.gpa}
                              </div>
                              {student.school && (
                                <div className="text-sm text-gray-500">
                                  {student.school}
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                              student.grade === "A+"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
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
      </div>
    </div>
  );
}
