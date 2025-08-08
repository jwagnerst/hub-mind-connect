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
  MessageSquare,
  Send,
  MoreVertical
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
    lastContact: "2 days ago",
    avatar: "JS"
  },
  {
    id: 2,
    name: "Sarah Johnson", 
    email: "sarah.j@marketinginc.com",
    phone: "+1 (555) 987-6543",
    company: "Marketing Inc",
    position: "Marketing Director",
    status: "Active",
    lastContact: "1 week ago",
    avatar: "SJ"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "m.wilson@retailco.com", 
    phone: "+1 (555) 456-7890",
    company: "RetailCo",
    position: "VP Sales",
    status: "Inactive",
    lastContact: "2 weeks ago",
    avatar: "MW"
  }
];

const conversations = [
  {
    id: 1,
    sender: "John Smith",
    message: "Thanks for the proposal. Can we schedule a call to discuss pricing?",
    time: "10:30 AM",
    type: "received"
  },
  {
    id: 2,
    sender: "You",
    message: "Absolutely! I'm available tomorrow afternoon. What time works best for you?",
    time: "10:45 AM", 
    type: "sent"
  },
  {
    id: 3,
    sender: "John Smith",
    message: "How about 2 PM EST? I'll send a calendar invite.",
    time: "11:00 AM",
    type: "received"
  }
];

export default function Conversations() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversas</h1>
          <p className="text-muted-foreground">
            Gerencie suas conversas e mensagens
          </p>
        </div>
        <Button className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          New Contact
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Contacts List */}
        <div className="col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">All Contacts</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search contacts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 overflow-y-auto max-h-[500px]">
              {filteredContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedContact.id === contact.id ? "ring-2 ring-crm-primary" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-crm-primary text-crm-primary-foreground rounded-full flex items-center justify-center font-medium">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.company}</p>
                      <div className="flex items-center gap-2 mt-1">
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

        {/* Contact Details & Conversation */}
        <div className="col-span-8">
          <div className="grid grid-rows-[auto_1fr] gap-6 h-full">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-crm-primary text-crm-primary-foreground rounded-full flex items-center justify-center font-medium text-lg">
                      {selectedContact.avatar}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{selectedContact.name}</h2>
                      <p className="text-muted-foreground">{selectedContact.position} at {selectedContact.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-crm-primary" />
                    <span className="text-sm">{selectedContact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-crm-primary" />
                    <span className="text-sm">{selectedContact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-crm-primary" />
                    <span className="text-sm">{selectedContact.company}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation Section */}
            <Card className="flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-crm-primary" />
                  Conversation
                  <Badge variant="outline" className="ml-auto">
                    WhatsApp Integration Coming Soon
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto mb-4 max-h-80">
                  {conversations.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.type === "sent"
                            ? "bg-crm-primary text-crm-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.type === "received" && (
                          <p className="text-xs font-medium mb-1">{msg.sender}</p>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === "sent" ? "text-crm-primary-foreground/70" : "text-muted-foreground"
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-crm-primary hover:bg-crm-primary-hover text-crm-primary-foreground"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}