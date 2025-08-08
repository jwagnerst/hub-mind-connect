import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import KanbanBoard, { KanbanColumn, KanbanItem } from "@/components/kanban/KanbanBoard";

const initialLeads: KanbanColumn[] = [
  {
    id: "new",
    title: "New Leads",
    color: "#3b82f6",
    items: [
      {
        id: "1",
        title: "John Smith - Tech Corp",
        description: "Interested in our enterprise solution",
        priority: "high",
        assignee: "JD",
        tags: ["Enterprise", "Technology"]
      },
      {
        id: "2", 
        title: "Sarah Johnson - Marketing Inc",
        description: "Looking for marketing automation tools",
        priority: "medium",
        assignee: "MB",
        tags: ["Marketing", "SMB"]
      }
    ]
  },
  {
    id: "qualified",
    title: "Qualified",
    color: "#10b981",
    items: [
      {
        id: "3",
        title: "Mike Wilson - RetailCo",
        description: "Budget confirmed, decision maker identified",
        priority: "high",
        assignee: "JD",
        tags: ["Retail", "Qualified"]
      }
    ]
  },
  {
    id: "proposal",
    title: "Proposal Sent",
    color: "#f59e0b",
    items: [
      {
        id: "4",
        title: "Emma Davis - FinanceHub",
        description: "Proposal sent, awaiting feedback",
        priority: "medium",
        assignee: "MB",
        tags: ["Finance", "Proposal"]
      }
    ]
  },
  {
    id: "closed",
    title: "Closed",
    color: "#8b5cf6",
    items: [
      {
        id: "5",
        title: "Robert Brown - LogisticsPro",
        description: "Deal closed successfully",
        priority: "low",
        assignee: "JD",
        tags: ["Logistics", "Won"]
      }
    ]
  }
];

export default function Leads() {
  const [leads, setLeads] = useState<KanbanColumn[]>(initialLeads);

  const handleItemMove = (itemId: string, sourceColumnId: string, targetColumnId: string) => {
    setLeads(prev => {
      const newLeads = [...prev];
      const sourceColumn = newLeads.find(col => col.id === sourceColumnId);
      const targetColumn = newLeads.find(col => col.id === targetColumnId);
      
      if (sourceColumn && targetColumn) {
        const itemIndex = sourceColumn.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          const [item] = sourceColumn.items.splice(itemIndex, 1);
          targetColumn.items.push(item);
        }
      }
      
      return newLeads;
    });
  };

  const handleAddItem = (columnId: string) => {
    // In a real app, this would open a dialog to create a new lead
    console.log("Add new lead to column:", columnId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground">
            Track and manage your sales leads through the pipeline
          </p>
        </div>
        <Button className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>

      <KanbanBoard 
        columns={leads}
        onItemMove={handleItemMove}
        onAddItem={handleAddItem}
      />
    </div>
  );
}