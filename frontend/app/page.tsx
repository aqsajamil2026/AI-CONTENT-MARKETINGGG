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

      const response = await fetch(
        `${API}/ai/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

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
  };

  // 👇 Yahan se tumhara baqi JSX same rahega