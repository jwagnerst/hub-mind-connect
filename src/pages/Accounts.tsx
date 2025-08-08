import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Building2, 
  Users, 
  DollarSign, 
  Calendar,
  MoreVertical,
  ExternalLink
} from "lucide-react";

const accounts = [
  {
    id: 1,
    name: "Tech Corp",
    industry: "Technology",
    revenue: "$2.5M",
    employees: "250-500",
    status: "Active",
    type: "Enterprise",
    contacts: 5,
    opportunities: 3,
    lastActivity: "2 days ago",
    location: "San Francisco, CA",
    website: "www.techcorp.com"
  },
  {
    id: 2,
    name: "Marketing Inc",
    industry: "Marketing & Advertising", 
    revenue: "$850K",
    employees: "50-100",
    status: "Active",
    type: "SMB",
    contacts: 3,
    opportunities: 1,
    lastActivity: "1 week ago",
    location: "New York, NY",
    website: "www.marketinginc.com"
  },
  {
    id: 3,
    name: "RetailCo",
    industry: "Retail",
    revenue: "$5.2M", 
    employees: "500-1000",
    status: "Inactive",
    type: "Enterprise",
    contacts: 8,
    opportunities: 0,
    lastActivity: "3 weeks ago",
    location: "Chicago, IL",
    website: "www.retailco.com"
  },
  {
    id: 4,
    name: "FinanceHub",
    industry: "Financial Services",
    revenue: "$1.8M",
    employees: "100-250", 
    status: "Active",
    type: "Mid-Market",
    contacts: 4,
    opportunities: 2,
    lastActivity: "5 days ago",
    location: "Boston, MA",
    website: "www.financehub.com"
  }
];

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-crm-success text-crm-success-foreground" 
      : "bg-muted text-muted-foreground";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Enterprise": return "bg-crm-primary text-crm-primary-foreground";
      case "Mid-Market": return "bg-crm-info text-crm-info-foreground";
      case "SMB": return "bg-crm-warning text-crm-warning-foreground";
      default: return "bg-crm-secondary text-crm-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Manage your customer accounts and relationships
          </p>
        </div>
        <Button className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          New Account
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search accounts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Accounts List */}
        <div className="col-span-8">
          <div className="grid gap-4">
            {filteredAccounts.map((account) => (
              <Card 
                key={account.id}
                className={`transition-all hover:shadow-md cursor-pointer ${
                  selectedAccount.id === account.id ? "ring-2 ring-crm-primary" : ""
                }`}
                onClick={() => setSelectedAccount(account)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-crm-primary text-crm-primary-foreground rounded-lg flex items-center justify-center">
                        <Building2 size={24} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{account.name}</h3>
                          <Badge className={getStatusColor(account.status)}>
                            {account.status}
                          </Badge>
                          <Badge className={getTypeColor(account.type)}>
                            {account.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{account.industry}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{account.location}</span>
                          <span>•</span>
                          <span>{account.employees} employees</span>
                          <span>•</span>
                          <span>Revenue: {account.revenue}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-crm-primary" />
                      <span className="text-sm">{account.contacts} Contacts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-crm-success" />
                      <span className="text-sm">{account.opportunities} Opportunities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-crm-info" />
                      <span className="text-sm">{account.lastActivity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-crm-primary hover:underline cursor-pointer">
                        {account.website}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Account Details Sidebar */}
        <div className="col-span-4">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-crm-primary" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedAccount.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span>{selectedAccount.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge className={getTypeColor(selectedAccount.type)}>
                      {selectedAccount.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(selectedAccount.status)}>
                      {selectedAccount.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span>{selectedAccount.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employees:</span>
                    <span>{selectedAccount.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{selectedAccount.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <Users className="h-6 w-6 text-crm-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedAccount.contacts}</div>
                  <div className="text-xs text-muted-foreground">Contacts</div>
                </Card>
                <Card className="p-4 text-center">
                  <DollarSign className="h-6 w-6 text-crm-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedAccount.opportunities}</div>
                  <div className="text-xs text-muted-foreground">Opportunities</div>
                </Card>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  View Contacts
                </Button>
                <Button variant="outline" className="w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Opportunities
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}