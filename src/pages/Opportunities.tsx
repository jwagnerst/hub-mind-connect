import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import KanbanBoard, { KanbanColumn, KanbanItem } from "@/components/kanban/KanbanBoard";

const initialOpportunities: KanbanColumn[] = [
  {
    id: "prospecting",
    title: "Prospecting",
    color: "#6b7280",
    items: [
      {
        id: "1",
        title: "Tech Corp - Enterprise License",
        description: "Annual enterprise software license",
        value: "$75,000",
        priority: "high",
        assignee: "JD",
        tags: ["Enterprise", "Software"]
      },
      {
        id: "2",
        title: "Marketing Inc - Marketing Suite",
        description: "Complete marketing automation package",
        value: "$25,000",
        priority: "medium",
        assignee: "MB",
        tags: ["Marketing", "SMB"]
      }
    ]
  },
  {
    id: "qualification",
    title: "Qualification",
    color: "#3b82f6",
    items: [
      {
        id: "3",
        title: "RetailCo - POS Integration",
        description: "Point of sale system integration",
        value: "$40,000",
        priority: "high",
        assignee: "JD",
        tags: ["Retail", "Integration"]
      }
    ]
  },
  {
    id: "proposal",
    title: "Proposal/Quote",
    color: "#f59e0b",
    items: [
      {
        id: "4",
        title: "FinanceHub - Security Package",
        description: "Advanced security and compliance package",
        value: "$60,000",
        priority: "high",
        assignee: "MB",
        tags: ["Finance", "Security"]
      },
      {
        id: "5",
        title: "LogisticsPro - Custom Development",
        description: "Custom logistics management solution",
        value: "$85,000",
        priority: "medium",
        assignee: "JD",
        tags: ["Logistics", "Custom"]
      }
    ]
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "#f97316",
    items: [
      {
        id: "6",
        title: "DataCorp - Analytics Platform",
        description: "Business intelligence and analytics platform",
        value: "$120,000",
        priority: "high",
        assignee: "MB",
        tags: ["Analytics", "Enterprise"]
      }
    ]
  },
  {
    id: "closed-won",
    title: "Closed Won",
    color: "#10b981",
    items: [
      {
        id: "7",
        title: "StartupXYZ - Starter Package",
        description: "Basic package for startup company",
        value: "$15,000",
        priority: "low",
        assignee: "JD",
        tags: ["Startup", "Basic"]
      }
    ]
  },
  {
    id: "closed-lost",
    title: "Closed Lost",
    color: "#ef4444",
    items: [
      {
        id: "8",
        title: "CompetitorClient - Enterprise Deal",
        description: "Lost to competitor pricing",
        value: "$95,000",
        priority: "low",
        assignee: "MB",
        tags: ["Enterprise", "Lost"]
      }
    ]
  }
];

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<KanbanColumn[]>(initialOpportunities);

  const handleItemMove = (itemId: string, sourceColumnId: string, targetColumnId: string) => {
    setOpportunities(prev => {
      const newOpportunities = [...prev];
      const sourceColumn = newOpportunities.find(col => col.id === sourceColumnId);
      const targetColumn = newOpportunities.find(col => col.id === targetColumnId);
      
      if (sourceColumn && targetColumn) {
        const itemIndex = sourceColumn.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          const [item] = sourceColumn.items.splice(itemIndex, 1);
          targetColumn.items.push(item);
        }
      }
      
      return newOpportunities;
    });
  };

  const handleAddItem = (columnId: string) => {
    // In a real app, this would open a dialog to create a new opportunity
    console.log("Add new opportunity to column:", columnId);
  };

  // Calculate total pipeline value
  const totalPipelineValue = opportunities
    .flatMap(col => col.items)
    .filter(item => !["closed-won", "closed-lost"].includes(
      opportunities.find(col => col.items.includes(item))?.id || ""
    ))
    .reduce((sum, item) => {
      const value = parseFloat(item.value?.replace(/[$,]/g, "") || "0");
      return sum + value;
    }, 0);

  const closedWonValue = opportunities
    .find(col => col.id === "closed-won")?.items
    .reduce((sum, item) => {
      const value = parseFloat(item.value?.replace(/[$,]/g, "") || "0");
      return sum + value;
    }, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground">
            Track and manage your sales opportunities through the pipeline
          </p>
        </div>
        <Button className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          New Opportunity
        </Button>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
          <div className="text-2xl font-bold text-crm-primary">
            ${totalPipelineValue.toLocaleString()}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Closed Won This Month</div>
          <div className="text-2xl font-bold text-crm-success">
            ${closedWonValue.toLocaleString()}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Active Opportunities</div>
          <div className="text-2xl font-bold text-crm-info">
            {opportunities.flatMap(col => col.items).filter(item => 
              !["closed-won", "closed-lost"].includes(
                opportunities.find(col => col.items.includes(item))?.id || ""
              )
            ).length}
          </div>
        </div>
      </div>

      <KanbanBoard 
        columns={opportunities}
        onItemMove={handleItemMove}
        onAddItem={handleAddItem}
      />
    </div>
  );
}