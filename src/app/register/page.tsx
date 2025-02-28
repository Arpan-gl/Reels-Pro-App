"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const route = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [onloading, setOnloading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOnloading(true);
    try {
      await axios.post("api/auth/register", user)
        .then((res) => {
          console.log(res.data);
          setOnloading(false);
          setError(null);
          route.push("/login");
        })
    } catch (error: any) {
      console.log(error);
      setOnloading(false);
      setError(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <label htmlFor="email" className="block mb-1">
            Email:
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
            Password:
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
          disabled={onloading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        {error && (<p className="text-center mt-4">Their is an Error: {error}</p>)}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp;