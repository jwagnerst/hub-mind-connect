import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  value?: string;
  assignee?: string;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onItemMove?: (itemId: string, sourceColumnId: string, targetColumnId: string) => void;
  onAddItem?: (columnId: string) => void;
  className?: string;
}

export default function KanbanBoard({ 
  columns, 
  onItemMove, 
  onAddItem, 
  className 
}: KanbanBoardProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (draggedItem && onItemMove) {
      const sourceColumn = columns.find(col => 
        col.items.some(item => item.id === draggedItem)
      );
      if (sourceColumn && sourceColumn.id !== targetColumnId) {
        onItemMove(draggedItem, sourceColumn.id, targetColumnId);
      }
    }
    setDraggedItem(null);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high": return "bg-crm-danger text-crm-danger-foreground";
      case "medium": return "bg-crm-warning text-crm-warning-foreground";
      case "low": return "bg-crm-success text-crm-success-foreground";
      default: return "bg-crm-secondary text-crm-secondary-foreground";
    }
  };

  return (
    <div className={cn("flex gap-6 overflow-x-auto pb-4", className)}>
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {column.color && (
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: column.color }}
                    />
                  )}
                  {column.title}
                  <Badge variant="secondary" className="ml-2">
                    {column.items.length}
                  </Badge>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddItem?.(column.id)}
                  className="h-8 w-8 p-0"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {column.items.map((item) => (
                <Card
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  className={cn(
                    "cursor-move transition-all hover:shadow-md",
                    draggedItem === item.id && "opacity-50"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal size={12} />
                      </Button>
                    </div>
                    
                    {item.description && (
                      <p className="text-xs text-muted-foreground mb-3">
                        {item.description}
                      </p>
                    )}
                    
                    {item.value && (
                      <div className="text-lg font-semibold text-crm-primary mb-2">
                        {item.value}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {item.priority && (
                          <Badge 
                            className={cn("text-xs", getPriorityColor(item.priority))}
                          >
                            {item.priority}
                          </Badge>
                        )}
                        {item.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {item.assignee && (
                        <div className="w-6 h-6 bg-crm-primary text-crm-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          {item.assignee.charAt(0)}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}