import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search contacts, leads, accounts..."
              className="pl-10 w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-crm-danger text-crm-danger-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <User size={20} />
            <span>John Doe</span>
          </Button>
        </div>
      </div>
    </header>
  );
}