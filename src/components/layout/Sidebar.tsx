import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Building2,
  Target,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Target },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Accounts", href: "/accounts", icon: Building2 },
  { name: "Opportunities", href: "/opportunities", icon: MessageSquare },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-crm-sidebar text-crm-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-crm-sidebar-accent">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-crm-primary to-crm-info bg-clip-text text-transparent">
              CRM Pro
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-crm-sidebar-foreground hover:bg-crm-sidebar-accent hover:text-crm-sidebar-foreground"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-colors",
                  collapsed ? "px-2" : "px-4",
                  isActive
                    ? "bg-crm-primary text-crm-primary-foreground hover:bg-crm-primary-hover hover:text-crm-primary-foreground"
                    : "text-crm-sidebar-foreground hover:bg-crm-sidebar-accent hover:text-crm-sidebar-foreground"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-crm-sidebar-accent">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-crm-sidebar-foreground hover:bg-crm-sidebar-accent",
            collapsed ? "px-2" : "px-4"
          )}
        >
          <Settings size={20} />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Button>
      </div>
    </div>
  );
}