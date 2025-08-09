import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type LeadStatus = "captura" | "enriquecimento" | "qualificacao" | "nao-qualificado" | "qualificado";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  assignee: string;
  createdAt: string;
  priority: "high" | "medium" | "low";
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "João Silva",
    company: "Tech Corp",
    email: "joao@techcorp.com",
    phone: "+55 11 99999-9999",
    status: "captura",
    source: "Website",
    assignee: "JD",
    createdAt: "2024-01-15",
    priority: "high"
  },
  {
    id: "2",
    name: "Maria Santos",
    company: "Marketing Inc",
    email: "maria@marketing.com",
    phone: "+55 11 88888-8888",
    status: "enriquecimento",
    source: "Evento",
    assignee: "MB",
    createdAt: "2024-01-14",
    priority: "medium"
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    company: "RetailCo",
    email: "carlos@retailco.com",
    phone: "+55 11 77777-7777",
    status: "qualificacao",
    source: "LinkedIn",
    assignee: "JD",
    createdAt: "2024-01-13",
    priority: "high"
  },
  {
    id: "4",
    name: "Ana Costa",
    company: "FinanceHub",
    email: "ana@financehub.com",
    phone: "+55 11 66666-6666",
    status: "qualificado",
    source: "Indicação",
    assignee: "MB",
    createdAt: "2024-01-12",
    priority: "medium"
  },
  {
    id: "5",
    name: "Pedro Ferreira",
    company: "LogisticsPro",
    email: "pedro@logistics.com",
    phone: "+55 11 55555-5555",
    status: "nao-qualificado",
    source: "Google Ads",
    assignee: "JD",
    createdAt: "2024-01-11",
    priority: "low"
  }
];

const statusLabels: Record<LeadStatus, string> = {
  captura: "Captura",
  enriquecimento: "Enriquecimento",
  qualificacao: "Qualificação",
  "nao-qualificado": "Não Qualificado",
  qualificado: "Qualificado (MQL/SQL)"
};

const statusColors: Record<LeadStatus, string> = {
  captura: "bg-crm-info text-crm-info-foreground",
  enriquecimento: "bg-crm-warning text-crm-warning-foreground",
  qualificacao: "bg-crm-secondary text-crm-secondary-foreground",
  "nao-qualificado": "bg-crm-danger text-crm-danger-foreground",
  qualificado: "bg-crm-success text-crm-success-foreground"
};

const priorityColors = {
  high: "bg-crm-danger text-crm-danger-foreground",
  medium: "bg-crm-warning text-crm-warning-foreground",
  low: "bg-crm-success text-crm-success-foreground"
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = () => {
    console.log("Add new lead");
  };

  const handleEditLead = (leadId: string) => {
    console.log("Edit lead:", leadId);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Leads</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe seus leads através das etapas do funil
          </p>
        </div>
        <Button onClick={handleAddLead} className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="captura">Captura</SelectItem>
            <SelectItem value="enriquecimento">Enriquecimento</SelectItem>
            <SelectItem value="qualificacao">Qualificação</SelectItem>
            <SelectItem value="nao-qualificado">Não Qualificado</SelectItem>
            <SelectItem value="qualificado">Qualificado (MQL/SQL)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Etapas do Lead */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">Etapas do Lead</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-crm-info"></div>
              <span className="font-medium">Captura</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Chega por marketing, evento, rede social, formulário etc.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-crm-warning"></div>
              <span className="font-medium">Enriquecimento</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Coleta de mais informações (nome, empresa, segmento, telefone, e-mail, etc.).
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-crm-secondary"></div>
              <span className="font-medium">Qualificação</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Avaliação do potencial do lead baseado em critérios definidos.
            </p>
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-crm-danger"></div>
                <span className="font-medium text-sm">Lead não qualificado</span>
              </div>
              <p className="text-xs text-muted-foreground">Descarta ou envia para nutrição de marketing.</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-crm-success"></div>
                <span className="font-medium text-sm">Lead qualificado (MQL/SQL)</span>
              </div>
              <p className="text-xs text-muted-foreground">Vira Oportunidade.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.status]}>
                    {statusLabels[lead.status]}
                  </Badge>
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Badge className={priorityColors[lead.priority]}>
                    {lead.priority === "high" ? "Alta" : lead.priority === "medium" ? "Média" : "Baixa"}
                  </Badge>
                </TableCell>
                <TableCell>{lead.assignee}</TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditLead(lead.id)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-crm-danger"
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum lead encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}