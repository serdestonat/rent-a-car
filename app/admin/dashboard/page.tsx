"use client";

import { useState } from "react";
import SidebarDemo from "./components/SidebarDemo";
import DashboardHome from "./components/DashboardHome";
import Vehicles from "./components/Vehicles";
import Settings from "./components/Settings";
import { signOut } from "next-auth/react";

export type ActiveComponent = "dashboard" | "vehicles" | "settings" | "logout";

export default function DashboardPage() {
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("dashboard");

  const handleLinkClick = (component: ActiveComponent) => {
    if (component === "logout") {
      signOut({ callbackUrl: "/" });
    } else {
      setActiveComponent(component);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "vehicles":
        return <Vehicles />;
      case "settings":
        return <Settings />;
      case "dashboard":
      default:
        return <DashboardHome />;
    }
  };

  return (
    <SidebarDemo
      activeComponent={activeComponent}
      onLinkClick={handleLinkClick}
    >
      {renderComponent()}
    </SidebarDemo>
  );
}
