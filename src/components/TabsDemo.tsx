import React from "react";
import { AxisTabs, TabItem, FigmaTab } from "./AxisTabs";
import { Gift, CreditCard, Zap, User, Bell, Settings, Calendar } from "lucide-react";

export const TabsDemo = () => {
  // Default tabs
  const defaultTabs: TabItem[] = [
    {
      id: "Benefits",
      label: "Benefits",
      icon: <Gift className="h-4 w-4" />,
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Benefits Content</h3>
          <p className="mt-2 text-muted-foreground">
            Discover your exclusive Benefits and offers tailored for your Axis Bank account.
          </p>
        </div>
      )
    },
    {
      id: "offers",
      label: "Offers",
      icon: <CreditCard className="h-4 w-4" />,
      badge: 3,
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Offers Content</h3>
          <p className="mt-2 text-muted-foreground">
            Special discounts and promotions available for Axis Bank customers.
          </p>
        </div>
      )
    },
    {
      id: "activities",
      label: "Activities",
      icon: <Zap className="h-4 w-4" />,
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Activities Content</h3>
          <p className="mt-2 text-muted-foreground">
            Track your recent transactions and account activities.
          </p>
        </div>
      )
    }
  ];

  // Outline variant tabs
  const outlineTabs: TabItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />,
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Profile Content</h3>
          <p className="mt-2 text-muted-foreground">
            Manage your personal information and account details.
          </p>
        </div>
      )
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
      badge: 5,
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Notifications Content</h3>
          <p className="mt-2 text-muted-foreground">
            View your recent alerts and notifications.
          </p>
        </div>
      )
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Settings Content</h3>
          <p className="mt-2 text-muted-foreground">
            Configure your account preferences and security options.
          </p>
        </div>
      )
    }
  ];

  // Pills variant tabs
  const pillsTabs: TabItem[] = [
    {
      id: "today",
      label: "Today",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Today's Content</h3>
          <p className="mt-2 text-muted-foreground">
            View today's transactions and account summary.
          </p>
        </div>
      )
    },
    {
      id: "week",
      label: "This Week",
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">This Week's Content</h3>
          <p className="mt-2 text-muted-foreground">
            View this week's transactions and account summary.
          </p>
        </div>
      )
    },
    {
      id: "month",
      label: "This Month",
      content: (
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">This Month's Content</h3>
          <p className="mt-2 text-muted-foreground">
            View this month's transactions and account summary.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-12 p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#97144D]">Default Tabs</h2>
        <AxisTabs tabs={defaultTabs} defaultTabId="Benefits" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#97144D]">Outline Tabs</h2>
        <AxisTabs tabs={outlineTabs} defaultTabId="profile" variant="outline" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#97144D]">Pills Tabs</h2>
        <AxisTabs tabs={pillsTabs} defaultTabId="today" variant="pills" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#97144D]">Full Width Tabs</h2>
        <AxisTabs tabs={defaultTabs.slice(0, 3)} defaultTabId="Benefits" fullWidth />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#97144D]">Figma-based Tabs</h2>
        <div className="flex border-b">
          <FigmaTab label="Tab 1" isActive={true} />
          <FigmaTab label="Tab 2" />
          <FigmaTab label="Tab 3" />
        </div>
        <div className="p-6 border rounded-lg mt-4">
          <h3 className="text-lg font-medium">Figma Tab Content</h3>
          <p className="mt-2 text-muted-foreground">
            These tabs match exactly with the Figma design.
          </p>
        </div>
      </div>
    </div>
  );
};