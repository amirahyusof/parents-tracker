import NavBar from "@/app/interface/navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen overflow-y-auto">
      <NavBar />
      <div className="bg-[#FFF9CA] min-h-screen">
        {children}
      </div>
    </div>
  );
}
