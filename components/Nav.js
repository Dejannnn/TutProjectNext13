"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
export default function Nav() {

  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProvider();
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Prmptopia logo"
          width={30}
          height={30}
          className="object-contain"
          src="/assets/images/logo.svg" />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Destop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (<div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>

          <button type="button" onClick={signOut} className="outline_btn"> Sign Out</button>
          <Link href="/profile">
            <Image src={session?.user?.image} width={37} height={37}
              className="rounded-full"
              alt="profile"
            />
          </Link>
        </div>) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button className="black_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                Sign In
              </button>
            )
            )}
          </>
        )}
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropdown((prevState) => !prevState);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                  <Link href="/profile" className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false)
                  }}> My profile
                  </Link>
                  <Link href="/create-prompt" className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false)
                  }}>
                    Create Prompt
                  </Link>
                  <button className="mt-5 w-full black_btn" type="button" onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button className="black_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                Sign In
              </button>
            )
            )}
          </>
        )}
      </div>
    </nav>
  );
}