"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const route = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await signIn("credentials",{...user,redirect:false})
      .then(() => {
        setError(null);
        setLoading(false);
        route.push("/");
      })
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
<div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        {error && (<p className="text-center mt-4">Their is an Error: {error}</p>)}
        <p className="text-center mt-4">
          Create New Account{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login;