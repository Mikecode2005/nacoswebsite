import { useEffect, useState } from "react";
import { Calendar, MapPin, ExternalLink, Plus, Trash2, Edit3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url?: string;
  registration_link?: string;
}

const AdminEventsManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    image_url: "",
    registration_link: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update({
            title: formData.title,
            description: formData.description,
            event_date: new Date(formData.event_date).toISOString(),
            location: formData.location,
            image_url: formData.image_url || null,
            registration_link: formData.registration_link || null
          })
          .eq('id', editingEvent.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Event updated successfully"
        });
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { error } = await supabase
          .from('events')
          .insert({
            title: formData.title,
            description: formData.description,
            event_date: new Date(formData.event_date).toISOString(),
            location: formData.location,
            image_url: formData.image_url || null,
            registration_link: formData.registration_link || null,
            created_by: user.id
          });
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Event created successfully"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Event deleted successfully"
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date.split('T')[0],
      location: event.location,
      image_url: event.image_url || "",
      registration_link: event.registration_link || ""
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      event_date: "",
      location: "",
      image_url: "",
      registration_link: ""
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Manage Events
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-orbitron">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Event description"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Event location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Registration Link</label>
                  <Input
                    type="url"
                    value={formData.registration_link}
                    onChange={(e) => setFormData({...formData, registration_link: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No events found</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id} className="border border-border/50 group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {event.image_url && (
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={event.image_url} 
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-orbitron font-semibold text-lg truncate">{event.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{format(new Date(event.event_date), 'MMM dd, yyyy')}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end sm:justify-start flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(event)}
                        className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                      >
                        <Edit3 className="h-3 w-3 sm:mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
                        className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                      >
                        <Trash2 className="h-3 w-3 sm:mr-1" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminEventsManager;