"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import axios from "axios";
import { apiConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

export default function BlogDetailPage() {
  const params = useParams() as { id?: string };
  const id = params?.id;
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = apiConfig?.endpoints?.articles ?? "/articles";
        const res = await axios.get(`${endpoint}/${id}`);
        if (!mounted) return;
        const a = res.data;
        const mapped = {
          id: a._id ?? a.id,
          title: a.title,
          excerpt: a.excerpt,
          content: a.content,
          author: a.author,
          date: a.publishDate ?? a.createdAt,
          category: a.category,
          image: a.image,
          tags: a.tags ?? [],
        };
        setPost(mapped);
      } catch (err) {
        console.error("Failed to load post", err);
        setError("Failed to load post");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPost();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <Loading mode="skeleton" message="Loading post..." />;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!post) return <div className="p-8">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          ← Back
        </Button>
      </div>

      {post.image && (
        // use <img> to avoid Next/Image external domain issues
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        By {post.author || "Unknown"} •{" "}
        {post.date ? new Date(post.date).toLocaleDateString() : ""}
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t: string) => (
            <span
              key={t}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
