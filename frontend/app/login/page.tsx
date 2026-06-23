"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aqsajamil112-aiautomation.hf.space"; // fallback

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.detail || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.access_token);

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Backend not reachable (check API URL or CORS)");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h1 className="text-2xl mb-6 text-center">Login</h1>

        {error && (
          <p className="text-red-500 mb-3 text-center">{error}</p>
        )}

        <input
          className="w-full p-2 mb-4 text-black rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 text-black rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}