"use client";
import { useState } from "react";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (file) formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:3020/api/auth/register", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Registration successful!");
        setEmail("");
        setPassword("");
        setFile(null);
      } else {
        setStatus(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setStatus(`⚠️ Error submitting form: ${String(err)}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 via-blue-100 to-green-100">
      <form
        className="bg-white p-8 rounded-xl shadow-2xl w-80 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Register
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-800 p-3 rounded-lg w-full 
             focus:outline-none focus:ring-2 focus:ring-purple-400 
             placeholder-gray-400 text-gray-900 text-base"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-800 p-3 rounded-lg w-full 
             focus:outline-none focus:ring-2 focus:ring-purple-400 
             placeholder-gray-400 text-gray-900 text-base"
        />

        <label className="flex flex-col items-center p-3 border border-gray-800 rounded-lg w-full cursor-pointer hover:bg-gray-100 text-gray-600">
          {file ? file.name : "Upload your resume"}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="hidden"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
        >
          Submit
        </button>

        {status && (
          <p
            className={`mt-2 text-sm text-center font-medium ${
              status.startsWith("✅")
                ? "text-green-600"
                : status.startsWith("❌")
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
