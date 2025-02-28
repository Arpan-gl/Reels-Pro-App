"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Home, User } from "lucide-react";

const Header = () => {
  const { data } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
          >
            <Home className="w-5 h-5" />
            ImageKit ReelsPro
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <User className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
              >
                {data ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {data.user?.email?.split("@")[0]}
                      </span>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                      >
                        Video Upload
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                    >
                      Sign Up
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;