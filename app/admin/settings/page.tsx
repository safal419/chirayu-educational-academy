"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChangePasswordPage from "../change-password/page";
import CreateUserPage from "../create-user/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState as useReactState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [tab, setTab] = useState("popup"); // Set default tab to popup
  const [uploading, setUploading] = useReactState(false);
  const [file, setFile] = useReactState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // You may need to adjust the endpoint below to match your backend
      await axios.post("/api/upload-popup-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Popup image updated!");
      setFile(null);
      router.refresh();
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6 w-full flex">
          <TabsTrigger value="popup" className="flex-1">
            Change Popup Image
          </TabsTrigger>
          <TabsTrigger value="password" className="flex-1">
            Change Password
          </TabsTrigger>
          <TabsTrigger value="create" className="flex-1">
            Create User
          </TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <ChangePasswordPage />
        </TabsContent>
        <TabsContent value="create">
          <CreateUserPage />
        </TabsContent>
        <TabsContent value="popup">
          <Card>
            <CardHeader>
              <CardTitle>Change Popup Image</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button type="submit" disabled={uploading || !file}>
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </form>
              <div className="mt-6">
                <p className="mb-2 text-sm text-gray-500">
                  Current Popup Image:
                </p>
                <img
                  src="/popup-image.jpg"
                  alt="Popup"
                  className="rounded-lg shadow w-full max-w-xs"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
