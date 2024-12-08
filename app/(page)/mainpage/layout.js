import UpBar from "../../interface/navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <UpBar>
      {children}
    </UpBar>
  
  );
}