"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aqsajamil112-aiautomation.hf.space";

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const callAPI = async (endpoint: string, field: string) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API}/ai/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.detail || "Request failed");
      } else {
        setResult(
          Array.isArray(data[field])
            ? data[field].join(", ")
            : data[field] || "No response received"
        );
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI Marketing Platform
          </h1>

          <p className="text-gray-500 text-sm">
            Content Automation Dashboard
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>
      </nav>

      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
          🚀 AI Powered Marketing Suite
        </div>

        <h1 className="text-6xl font-bold mb-6">
          Create Marketing Content{" "}
          <span className="text-blue-500">Instantly</span>
        </h1>

        <p className="text-gray-400 text-xl mb-12">
          Generate captions, blogs, hashtags, SEO keywords, emails and ad copy.
        </p>

        <input
          type="text"
          placeholder="Enter your marketing idea..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full max-w-4xl p-5 rounded-2xl bg-gray-900 border border-gray-700 text-white"
        />
      </section>

      <section className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["generate-caption", "caption", "✨ Caption"],
            ["generate-blog", "blog", "📝 Blog"],
            ["generate-hashtags", "hashtags", "#️⃣ Hashtags"],
            ["generate-seo", "keywords", "🔍 SEO"],
            ["generate-email", "email", "📧 Email"],
            ["generate-ad-copy", "ad_copy", "🚀 Ad Copy"],
          ].map(([endpoint, field, label]) => (
            <button
              key={endpoint}
              onClick={() => callAPI(endpoint, field)}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-blue-500"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {loading && <p>Generating...</p>}

          {result && (
            <div className="bg-gray-900 p-6 rounded-xl mt-5">
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}