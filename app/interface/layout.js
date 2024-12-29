import NavBar from "@/app/interface/navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-[#FFF9CA]">
      <NavBar />
      <main className="md:ml-64 min-h-screen p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}


