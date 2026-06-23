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
            : data[field] || "No response"
        );
      }
    } catch (error) {
      console.error(error);
      setResult("Backend error");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>AI Marketing Platform</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />

      <div>
        <button onClick={() => callAPI("generate-blog", "blog")}>
          Generate Blog
        </button>

        <button onClick={() => callAPI("generate-caption", "caption")}>
          Generate Caption
        </button>

        <button onClick={() => callAPI("generate-email", "email")}>
          Generate Email
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {result && <pre>{result}</pre>}
    </div>
  );
}