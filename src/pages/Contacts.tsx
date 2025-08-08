import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  MapPin,
  Calendar,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Corp",
    position: "CTO",
    status: "Active",
    location: "New York, NY",
    lastContact: "2 days ago",
    avatar: "JS",
    notes: "Interested in enterprise solution. Follow up needed on pricing."
  },
  {
    id: 2,
    name: "Sarah Johnson", 
    email: "sarah.j@marketinginc.com",
    phone: "+1 (555) 987-6543",
    company: "Marketing Inc",
    position: "Marketing Director",
    status: "Active",
    location: "Los Angeles, CA",
    lastContact: "1 week ago",
    avatar: "SJ",
    notes: "Potential partnership opportunity. Scheduled for next month."
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "m.wilson@retailco.com", 
    phone: "+1 (555) 456-7890",
    company: "RetailCo",
    position: "VP Sales",
    status: "Inactive",
    location: "Chicago, IL",
    lastContact: "2 weeks ago",
    avatar: "MW",
    notes: "Lost contact. Attempt re-engagement."
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@startup.io",
    phone: "+1 (555) 321-9876",
    company: "StartupIO",
    position: "CEO",
    status: "Active",
    location: "San Francisco, CA",
    lastContact: "3 days ago",
    avatar: "ED",
    notes: "High-priority contact. Interested in custom implementation."
  }
];

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contatos</h1>
          <p className="text-muted-foreground">
            Gerencie seus contatos e informações
          </p>
        </div>
        <Button className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Novo Contato
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Lista de Contatos */}
        <div className="col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Todos os Contatos</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Buscar contatos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 overflow-y-auto max-h-[600px]">
              {filteredContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedContact.id === contact.id ? "ring-2 ring-crm-primary" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-crm-primary text-crm-primary-foreground rounded-full flex items-center justify-center font-medium">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.position}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.company}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          variant={contact.status === "Active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {contact.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{contact.lastContact}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detalhes do Contato */}
        <div className="col-span-7">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-crm-primary text-crm-primary-foreground rounded-full flex items-center justify-center font-medium text-xl">
                    {selectedContact.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
                    <p className="text-muted-foreground text-lg">{selectedContact.position}</p>
                    <p className="text-muted-foreground">{selectedContact.company}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Informações de Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações de Contato</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="h-5 w-5 text-crm-primary" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="h-5 w-5 text-crm-primary" />
                    <div>
                      <p className="text-sm font-medium">Telefone</p>
                      <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Building2 className="h-5 w-5 text-crm-primary" />
                    <div>
                      <p className="text-sm font-medium">Empresa</p>
                      <p className="text-sm text-muted-foreground">{selectedContact.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <MapPin className="h-5 w-5 text-crm-primary" />
                    <div>
                      <p className="text-sm font-medium">Localização</p>
                      <p className="text-sm text-muted-foreground">{selectedContact.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-crm-primary" />
                    <div>
                      <p className="text-sm font-medium">Último Contato</p>
                      <p className="text-sm text-muted-foreground">{selectedContact.lastContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Status e Notas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Status e Notas</h3>
                
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Badge 
                      variant={selectedContact.status === "Active" ? "default" : "secondary"}
                      className="text-sm"
                    >
                      {selectedContact.status}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Notas</p>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{selectedContact.notes}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ações */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ações Rápidas</h3>
                <div className="flex gap-2">
                  <Button className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Email
                  </Button>
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Ligar
                  </Button>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}