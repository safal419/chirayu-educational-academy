"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, X, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TopPerformer {
  id: string
  name: string
  gpa: string
  school: string
  photo: string
}

interface SEEResult {
  id: string
  year: string
  totalStudents: number
  passPercentage: number
  topPerformers: TopPerformer[]
  description: string
}

export default function SEEResultsAdmin() {
  const [results, setResults] = useState<SEEResult[]>([
    {
      id: "1",
      year: "2024",
      totalStudents: 150,
      passPercentage: 95.5,
      topPerformers: [
        {
          id: "1",
          name: "Aisha Sharma",
          gpa: "3.95",
          school: "Chirayu Academy",
          photo: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "2",
          name: "Rajesh Thapa",
          gpa: "3.90",
          school: "Chirayu Academy",
          photo: "/placeholder.svg?height=100&width=100",
        },
      ],
      description: "Excellent performance by our students in SEE 2024",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedResult, setSelectedResult] = useState<SEEResult | null>(null)
  const [formData, setFormData] = useState<Partial<SEEResult>>({})

  const handleAdd = () => {
    setFormData({
      year: "",
      totalStudents: 0,
      passPercentage: 0,
      topPerformers: [],
      description: "",
    })
    setIsAddDialogOpen(true)
  }

  const handleEdit = (result: SEEResult) => {
    setSelectedResult(result)
    setFormData(result)
    setIsEditDialogOpen(true)
  }

  const handleView = (result: SEEResult) => {
    setSelectedResult(result)
    setIsViewDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this result?")) {
      setResults(results.filter((result) => result.id !== id))
    }
  }

  const handleSave = () => {
    if (selectedResult) {
      // Edit existing
      setResults(results.map((result) => (result.id === selectedResult.id ? { ...(formData as SEEResult) } : result)))
      setIsEditDialogOpen(false)
    } else {
      // Add new
      const newResult: SEEResult = {
        ...(formData as SEEResult),
        id: Date.now().toString(),
      }
      setResults([...results, newResult])
      setIsAddDialogOpen(false)
    }
    setFormData({})
    setSelectedResult(null)
  }

  const addTopPerformer = () => {
    const newPerformer: TopPerformer = {
      id: Date.now().toString(),
      name: "",
      gpa: "",
      school: "Chirayu Academy",
      photo: "/placeholder.svg?height=100&width=100",
    }
    setFormData({
      ...formData,
      topPerformers: [...(formData.topPerformers || []), newPerformer],
    })
  }

  const updateTopPerformer = (index: number, field: keyof TopPerformer, value: string) => {
    const updatedPerformers = [...(formData.topPerformers || [])]
    updatedPerformers[index] = { ...updatedPerformers[index], [field]: value }
    setFormData({ ...formData, topPerformers: updatedPerformers })
  }

  const removeTopPerformer = (index: number) => {
    const updatedPerformers = formData.topPerformers?.filter((_, i) => i !== index) || []
    setFormData({ ...formData, topPerformers: updatedPerformers })
  }

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateTopPerformer(index, "photo", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEE Results Management</h1>
          <p className="text-gray-600 mt-1">Manage SEE examination results and top performers</p>
        </div>
        <Button
          onClick={handleAdd}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Result
        </Button>
      </div>

      {/* Results Table */}
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
        <CardHeader>
          <CardTitle>SEE Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Pass Percentage</TableHead>
                  <TableHead>Top Performers</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.year}</TableCell>
                    <TableCell>{result.totalStudents}</TableCell>
                    <TableCell>{result.passPercentage}%</TableCell>
                    <TableCell>{result.topPerformers.length} students</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(result)}
                          className="bg-white shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(result)}
                          className="bg-white shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(result.id)}
                          className="bg-white shadow-sm hover:shadow-md transition-all duration-200 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>Add New SEE Result</DialogTitle>
            <DialogDescription>Enter the details for the new SEE result</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year || ""}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
                />
              </div>
              <div>
                <Label htmlFor="totalStudents">Total Students</Label>
                <Input
                  id="totalStudents"
                  type="number"
                  value={formData.totalStudents || ""}
                  onChange={(e) => setFormData({ ...formData, totalStudents: Number.parseInt(e.target.value) })}
                  placeholder="150"
                />
              </div>
              <div>
                <Label htmlFor="passPercentage">Pass Percentage</Label>
                <Input
                  id="passPercentage"
                  type="number"
                  step="0.1"
                  value={formData.passPercentage || ""}
                  onChange={(e) => setFormData({ ...formData, passPercentage: Number.parseFloat(e.target.value) })}
                  placeholder="95.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description..."
                rows={3}
              />
            </div>

            {/* Top Performers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Top Performers</Label>
                <Button
                  type="button"
                  onClick={addTopPerformer}
                  variant="outline"
                  size="sm"
                  className="shadow-sm bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Performer
                </Button>
              </div>
              <div className="space-y-4">
                {formData.topPerformers?.map((performer, index) => (
                  <Card key={performer.id} className="p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={performer.photo || "/placeholder.svg"}
                            alt={performer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="mt-2 text-xs"
                        />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={performer.name}
                            onChange={(e) => updateTopPerformer(index, "name", e.target.value)}
                            placeholder="Student name"
                          />
                        </div>
                        <div>
                          <Label>GPA</Label>
                          <Input
                            value={performer.gpa}
                            onChange={(e) => updateTopPerformer(index, "gpa", e.target.value)}
                            placeholder="3.95"
                          />
                        </div>
                        <div>
                          <Label>School</Label>
                          <Input
                            value={performer.school}
                            onChange={(e) => updateTopPerformer(index, "school", e.target.value)}
                            placeholder="School name"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTopPerformer(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Result
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>Edit SEE Result</DialogTitle>
            <DialogDescription>Update the details for this SEE result</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  value={formData.year || ""}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
                />
              </div>
              <div>
                <Label htmlFor="edit-totalStudents">Total Students</Label>
                <Input
                  id="edit-totalStudents"
                  type="number"
                  value={formData.totalStudents || ""}
                  onChange={(e) => setFormData({ ...formData, totalStudents: Number.parseInt(e.target.value) })}
                  placeholder="150"
                />
              </div>
              <div>
                <Label htmlFor="edit-passPercentage">Pass Percentage</Label>
                <Input
                  id="edit-passPercentage"
                  type="number"
                  step="0.1"
                  value={formData.passPercentage || ""}
                  onChange={(e) => setFormData({ ...formData, passPercentage: Number.parseFloat(e.target.value) })}
                  placeholder="95.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description..."
                rows={3}
              />
            </div>

            {/* Top Performers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Top Performers</Label>
                <Button
                  type="button"
                  onClick={addTopPerformer}
                  variant="outline"
                  size="sm"
                  className="shadow-sm bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Performer
                </Button>
              </div>
              <div className="space-y-4">
                {formData.topPerformers?.map((performer, index) => (
                  <Card key={performer.id} className="p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={performer.photo || "/placeholder.svg"}
                            alt={performer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="mt-2 text-xs"
                        />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={performer.name}
                            onChange={(e) => updateTopPerformer(index, "name", e.target.value)}
                            placeholder="Student name"
                          />
                        </div>
                        <div>
                          <Label>GPA</Label>
                          <Input
                            value={performer.gpa}
                            onChange={(e) => updateTopPerformer(index, "gpa", e.target.value)}
                            placeholder="3.95"
                          />
                        </div>
                        <div>
                          <Label>School</Label>
                          <Input
                            value={performer.school}
                            onChange={(e) => updateTopPerformer(index, "school", e.target.value)}
                            placeholder="School name"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTopPerformer(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Update Result
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>SEE Result Details - {selectedResult?.year}</DialogTitle>
          </DialogHeader>
          {selectedResult && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Total Students</h3>
                  <p className="text-2xl font-bold text-blue-600">{selectedResult.totalStudents}</p>
                </Card>
                <Card className="p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Pass Percentage</h3>
                  <p className="text-2xl font-bold text-green-600">{selectedResult.passPercentage}%</p>
                </Card>
                <Card className="p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Top Performers</h3>
                  <p className="text-2xl font-bold text-purple-600">{selectedResult.topPerformers.length}</p>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{selectedResult.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedResult.topPerformers.map((performer) => (
                    <Card key={performer.id} className="p-4 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <img
                          src={performer.photo || "/placeholder.svg"}
                          alt={performer.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{performer.name}</h4>
                          <p className="text-sm text-gray-600">GPA: {performer.gpa}</p>
                          <p className="text-sm text-gray-600">{performer.school}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
