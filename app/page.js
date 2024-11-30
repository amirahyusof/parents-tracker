"use client"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-[#FFF9CA]">
      <main className="hero-content flex-col lg:flex-row-reserve">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Parent Tracker</h1>
        </div>

        <div className="card mt-4">
          <div className="mt-6">
            <button className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">
              <Link href="/component/login">Login</Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
