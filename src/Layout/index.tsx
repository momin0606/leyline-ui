import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* This will render the matched child route */}
      </main>
    </div>
  );
};

export default Layout;
