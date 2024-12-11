import NavBar from "@/app/interface/navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div>
        {children}
      </div>
    </div>
  );
}
