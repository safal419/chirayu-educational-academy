"use client";
import { useState, useEffect } from "react";
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
import { apiConfig } from "@/lib/config";

export default function AdminSettingsPage() {
  const [tab, setTab] = useState("popup"); // Set default tab to popup
  const [uploading, setUploading] = useReactState(false);
  const [file, setFile] = useReactState<File | null>(null);
  const [currentPopup, setCurrentPopup] = useReactState<any | null>(null);
  const [loadingPopup, setLoadingPopup] = useReactState(false);
  const [toggling, setToggling] = useReactState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Fetch current popup record from API
  const fetchPopup = async () => {
    setLoadingPopup(true);
    try {
      const res = await axios.get(apiConfig.endpoints.popup);
      const data = res?.data;
      let popup: any = null;

      if (Array.isArray(data)) {
        // prefer active one, otherwise first
        popup = data.find((p: any) => p.isActive) || data[0] || null;
      } else if (data && typeof data === "object") {
        // If the API returns an object with items: []
        if (Array.isArray((data as any).items) && (data as any).items.length) {
          const items = (data as any).items;
          popup = items.find((p: any) => p.isActive) || items[0];
        } else {
          popup = data;
        }
      }

      setCurrentPopup(popup);
    } catch (err) {
      console.error("Failed to fetch popup", err);
      toast.error("Failed to load popup data");
    } finally {
      setLoadingPopup(false);
    }
  };

  useEffect(() => {
    fetchPopup();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      // backend expects 'files' per upload helper
      formData.append("files", file);

      // Upload the file to configured upload endpoint
      const uploadRes = await axios.post(apiConfig.endpoints.upload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Attempt to extract an image URL from common response shapes
      const uploadData = uploadRes?.data;

      const extractImageUrl = (data: any): string | null => {
        if (!data) return null;
        // common shapes: { url }, { fileUrl }, { data: { url } }, [{ url }], { files: [{ url }] }
        if (typeof data === "string") return data;
        if (data.url) return data.url;
        if (data.fileUrl) return data.fileUrl;
        if (data.data && typeof data.data === "string") return data.data;
        if (data.data && data.data.url) return data.data.url;
        if (Array.isArray(data) && data[0] && (data[0].url || data[0].fileUrl))
          return data[0].url || data[0].fileUrl;
        if (data.files && Array.isArray(data.files) && data.files[0])
          return (
            data.files[0].url || data.files[0].fileUrl || data.files[0].path
          );

        // fallback: search recursively for first string that looks like a URL
        const findUrl = (obj: any): string | null => {
          if (!obj || typeof obj !== "object") return null;
          for (const key of Object.keys(obj)) {
            const val = obj[key];
            if (
              typeof val === "string" &&
              (val.startsWith("http") || val.startsWith("/"))
            )
              return val;
            if (typeof val === "object") {
              const nested = findUrl(val);
              if (nested) return nested;
            }
          }
          return null;
        };

        return findUrl(data);
      };

      const imageUrl = extractImageUrl(uploadData);

      if (!imageUrl) {
        throw new Error(
          "Could not determine uploaded image URL from upload response."
        );
      }

      // Send the popup image record to the popup endpoint
      await axios.post(apiConfig.endpoints.popup, { imageUrl, isActive: true });

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
          {/* <TabsTrigger value="password" className="flex-1">
            Change Password
          </TabsTrigger>
          <TabsTrigger value="create" className="flex-1">
            Create User
          </TabsTrigger> */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <p className="mb-2 text-sm text-gray-500">
                    Current Popup Image
                  </p>
                  <div className="rounded-lg overflow-hidden border bg-gray-50 p-3 flex items-center justify-center">
                    {loadingPopup ? (
                      <div className="py-6">
                        <div className="animate-pulse w-64 h-40 bg-gray-200 rounded" />
                      </div>
                    ) : currentPopup && currentPopup.imageUrl ? (
                      <img
                        src={currentPopup.imageUrl}
                        alt="Popup"
                        className="rounded-lg shadow w-full h-auto max-w-xs object-contain"
                      />
                    ) : (
                      <div className="text-sm text-gray-500">
                        No popup image set
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center space-x-3">
                    <div className="text-sm">
                      Status:{" "}
                      {loadingPopup ? (
                        "Loading..."
                      ) : currentPopup ? (
                        currentPopup.isActive ? (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">
                            Inactive
                          </span>
                        )
                      ) : (
                        <span className="text-gray-500">Not set</span>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      onClick={async () => {
                        if (!currentPopup)
                          return toast.error("No popup to update");
                        setToggling(true);
                        try {
                          const id = currentPopup._id || currentPopup.id;
                          const newState = !currentPopup.isActive;
                          if (id) {
                            await axios.put(
                              `${apiConfig.endpoints.popup}/${id}`,
                              { isActive: newState }
                            );
                          } else {
                            // fallback: create a new record with same imageUrl
                            await axios.post(apiConfig.endpoints.popup, {
                              imageUrl: currentPopup.imageUrl,
                              isActive: newState,
                            });
                          }
                          toast.success(
                            `Popup ${newState ? "activated" : "deactivated"}`
                          );
                          await fetchPopup();
                        } catch (err) {
                          console.error(err);
                          toast.error("Failed to update popup status");
                        } finally {
                          setToggling(false);
                        }
                      }}
                      disabled={toggling || loadingPopup}
                    >
                      {toggling
                        ? "Updating..."
                        : currentPopup && currentPopup.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </Button>
                  </div>
                </div>

                <div>
                  <form onSubmit={handleUpload} className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="flex items-center space-x-3">
                      <Button type="submit" disabled={uploading || !file}>
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                      <Button onClick={() => setFile(null)} variant="ghost">
                        Clear
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
