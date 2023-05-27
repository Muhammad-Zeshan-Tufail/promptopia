"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  return (
    <nav className="w-full flex justify-between mb-3 pt-3">
      <Link href={"/"} className="flex gap-1 items-center">
        <Image
          src="/assets/images/favicon.ico"
          alt="logo"
          width={40}
          height={40}
          className="object-cover object-center overflow-hidden"
        />
        <p className="text-gray-600 text-xl font-bold max-sm:hidden">
          Promptopia
        </p>
      </Link>

      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex items-center md:gap-5 gap-3">
            <Link
              href={"/create-prompt"}
              className="bg-gray-600 text-white px-4 font-semibold py-1 rounded-full border-2 border-gray-600 hover:bg-transparent hover:text-gray-600"
            >
              Create Post
            </Link>
            <Link
              href={"/"}
              className="hover:bg-gray-600 px-4 font-semibold py-1 rounded-full border-2 border-gray-600 hover:text-white"
              type="button"
              onClick={handleLogout}
            >
              Sign Out
            </Link>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                alt="user"
                width={40}
                height={40}
                className="object-contain rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="hover:bg-gray-600 px-4 font-semibold py-1 rounded-full border-2 border-gray-600 hover:text-white"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user.image}
              alt="user"
              width={40}
              height={40}
              className="object-contain cursor-pointer rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown bg-slate-100 flex flex-col py-3 absolute top-0 right-0 mt-9 text-gray-600 rounded-lg">
                <Link
                  href={"/profile"}
                  onClick={() => setToggleDropdown(false)}
                  className="dropdown_link min-w-max w-full py-1 px-3 font-semibold hover:bg-slate-200"
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  onClick={() => setToggleDropdown(false)}
                  className="dropdown_link w-max py-1 px-3 font-semibold hover:bg-slate-200"
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="text-left py-1 px-3 font-semibold hover:bg-slate-200 w-full"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="hover:bg-gray-600 px-4 font-semibold py-1 rounded-full border-2 border-gray-600 hover:text-white"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
