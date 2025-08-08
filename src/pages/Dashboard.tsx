import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle
} from "lucide-react";

const stats = [
  {
    title: "Total Leads",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Target,
    color: "text-crm-primary"
  },
  {
    title: "Active Contacts",
    value: "856",
    change: "+5%",
    trend: "up", 
    icon: Users,
    color: "text-crm-success"
  },
  {
    title: "Total Accounts",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: Building2,
    color: "text-crm-info"
  },
  {
    title: "Revenue",
    value: "$248,900",
    change: "-2%",
    trend: "down",
    icon: DollarSign,
    color: "text-crm-warning"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "lead",
    title: "New lead created",
    description: "John Smith from Tech Corp",
    time: "5 minutes ago",
    status: "new"
  },
  {
    id: 2,
    type: "opportunity",
    title: "Deal closed",
    description: "$50,000 deal with ABC Company",
    time: "1 hour ago",
    status: "success"
  },
  {
    id: 3,
    type: "contact",
    title: "Contact updated",
    description: "Sarah Johnson - contact information",
    time: "2 hours ago",
    status: "updated"
  },
  {
    id: 4,
    type: "account",
    title: "New account added",
    description: "Microsoft Corporation",
    time: "4 hours ago",
    status: "new"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Badge variant="outline" className="text-crm-primary border-crm-primary">
          Live Data
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-crm-success" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-crm-danger" />
                )}
                <span className={stat.trend === "up" ? "text-crm-success" : "text-crm-danger"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-crm-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-crm-success" />
                  ) : activity.status === "new" ? (
                    <Target className="h-5 w-5 text-crm-primary" />
                  ) : (
                    <Clock className="h-5 w-5 text-crm-warning" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-crm-primary" />
                <div>
                  <p className="font-medium">Create New Lead</p>
                  <p className="text-xs text-muted-foreground">Add a potential customer</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-crm-success" />
                <div>
                  <p className="font-medium">Add Contact</p>
                  <p className="text-xs text-muted-foreground">Create a new contact</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-crm-warning" />
                <div>
                  <p className="font-medium">New Opportunity</p>
                  <p className="text-xs text-muted-foreground">Track a potential deal</p>
                </div>
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}