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

```
if (!token) {
  router.push("/login");
}
```

}, [router]);

const callAPI = async (endpoint: string, field: string) => {
setLoading(true);

```
try {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/ai/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    setResult(data.detail || "Request failed");
    setLoading(false);
    return;
  }

  if (Array.isArray(data[field])) {
    setResult(data[field].join(", "));
  } else {
    setResult(data[field] || "No response received");
  }
} catch (error) {
  console.error(error);
  setResult("Something went wrong.");
}

setLoading(false);
```

};

return ( <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white"> <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800 backdrop-blur-xl bg-black/40 sticky top-0 z-50"> <div> <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
AI Marketing Platform </h1>

```
      <p className="text-gray-500 text-sm">
        Content Automation Dashboard
      </p>
    </div>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/login");
      }}
      className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-2 rounded-xl font-semibold shadow-lg hover:shadow-red-500/30"
    >
      Logout
    </button>
  </nav>

  <section className="max-w-7xl mx-auto px-8 py-20 text-center">
    <div className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6 animate-pulse">
      🚀 AI Powered Marketing Suite
    </div>

    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
      Create Marketing Content{" "}
      <span className="text-blue-500 drop-shadow-lg">
        Instantly
      </span>
    </h1>

    <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12">
      Generate captions, blogs, hashtags, SEO keywords, emails and ad copy
      within seconds using AI.
    </p>

    <input
      type="text"
      placeholder="Enter your marketing idea..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className="w-full max-w-4xl mx-auto p-5 rounded-2xl bg-gray-900 border border-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    />
  </section>

  <section className="max-w-6xl mx-auto px-8">
    <h2 className="text-3xl font-bold mb-8">
      AI Tools
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        ["generate-caption", "caption", "✨ Caption Generator"],
        ["generate-blog", "blog", "📝 Blog Generator"],
        ["generate-hashtags", "hashtags", "#️⃣ Hashtag Generator"],
        ["generate-seo", "keywords", "🔍 SEO Keywords"],
        ["generate-email", "email", "📧 Email Generator"],
        ["generate-ad-copy", "ad_copy", "🚀 Ad Copy Generator"],
      ].map(([endpoint, field, label]) => (
        <button
          key={endpoint}
          onClick={() => callAPI(endpoint, field)}
          className="bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-300 p-6 rounded-2xl shadow-lg hover:scale-[1.03] active:scale-95"
        >
          {label}
        </button>
      ))}
    </div>

    <div className="mt-16 mb-20">
      {loading && (
        <div className="bg-gray-900 p-10 text-center rounded-2xl border border-gray-700 animate-pulse">
          Generating Content...
        </div>
      )}

      {!loading && result && (
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl transition-all duration-300">
          <h2 className="text-2xl mb-4 text-blue-400">
            Result
          </h2>

          <p className="whitespace-pre-wrap leading-8 text-gray-300">
            {result}
          </p>
        </div>
      )}
    </div>
  </section>
</div>
```

);
}
