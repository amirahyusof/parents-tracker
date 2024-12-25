"use client"

import Link from "next/link";
import Image from "next/image";
import MainImage from "@/public/asset/front-page.jpeg"
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";
import { useEffect } from "react";

export default function SignOut() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await logout();
        // Wait for a short time to ensure the logout process is complete
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (error) {
        console.error("Failed to sign out", error);
      }
    };

    handleSignOut();
  }, [logout, router]);

  return (
    <main className="flex w-full bg-[#FFF9CA] h-screen">
      <div className="m-4 flex flex-col mx-auto justify-center w-[400px]">
        <div className="bg-white w-full rounded-2xl shadow-2xl space-y-2 p-6 text-center">
          <h1 className="text-3xl font-bold text-[#FFB4B4] mb-4">Successfully Signed Out!</h1>
          
          <Image
            src={MainImage}
            width={250}
            height={300}
            loading="lazy"
            placeholder="blur"
            alt="Front Image"
            className="w-auto h-auto object-contain mx-auto mb-4"
          />
          
          <p className="text-black mb-4">Want to log in again?</p>
          
          <Link href="/login">
            <button className="btn border-white w-full bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}


