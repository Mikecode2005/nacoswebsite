import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit3, Upload, X, GripVertical, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";

interface AdCarouselItem {
  id: string;
  title: string;
  subtitle: string | null;
  image_id: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminAdCarouselManager = () => {
  const [ads, setAds] = useState<AdCarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdCarouselItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    button_text: "Learn More",
    button_link: "",
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ad_carousel')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch advertisements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `ads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('ad-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('ad-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAd) {
        const { error } = await supabase
          .from('ad_carousel')
          .update({
            title: formData.title,
            subtitle: formData.subtitle || null,
            image_url: formData.image_url || null,
            button_text: formData.button_text || null,
            button_link: formData.button_link || null,
            display_order: formData.display_order,
            is_active: formData.is_active
          })
          .eq('id', editingAd.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Advertisement updated successfully"
        });
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { error } = await supabase
          .from('ad_carousel')
          .insert({
            title: formData.title,
            subtitle: formData.subtitle || null,
            image_url: formData.image_url || null,
            button_text: formData.button_text || null,
            button_link: formData.button_link || null,
            display_order: formData.display_order,
            is_active: formData.is_active
          });
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Advertisement created successfully"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchAds();
    } catch (error) {
      console.error('Error saving ad:', error);
      toast({
        title: "Error",
        description: "Failed to save advertisement",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (adId: string) => {
    if (!confirm('Are you sure you want to delete this advertisement?')) return;
    
    try {
      const { error } = await supabase
        .from('ad_carousel')
        .delete()
        .eq('id', adId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Advertisement deleted successfully"
      });
      fetchAds();
    } catch (error) {
      console.error('Error deleting ad:', error);
      toast({
        title: "Error",
        description: "Failed to delete advertisement",
        variant: "destructive"
      });
    }
  };

  const handleToggleActive = async (ad: AdCarouselItem) => {
    try {
      const { error } = await supabase
        .from('ad_carousel')
        .update({ is_active: !ad.is_active })
        .eq('id', ad.id);
      
      if (error) throw error;
      fetchAds();
    } catch (error) {
      console.error('Error toggling ad:', error);
      toast({
        title: "Error",
        description: "Failed to update advertisement",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (ad: AdCarouselItem) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      subtitle: ad.subtitle || "",
      image_url: ad.image_url || "",
      button_text: ad.button_text || "Learn More",
      button_link: ad.button_link || "",
      display_order: ad.display_order,
      is_active: ad.is_active
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingAd(null);
    setFormData({
      title: "",
      subtitle: "",
      image_url: "",
      button_text: "Learn More",
      button_link: "",
      display_order: ads.length,
      is_active: true
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div 
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-primary" />
          Advertisement Carousel Manager
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Advertisement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-orbitron text-xl">
                {editingAd ? 'Edit Advertisement' : 'Add New Advertisement'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Background Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="Image URL or upload below"
                    className="flex-1"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="shrink-0"
                  >
                    {uploading ? (
                      <motion.div 
                        className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formData.image_url && (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={formData.image_url} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => setFormData({...formData, image_url: ""})}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <Label className="block text-sm font-medium mb-2">Title *</Label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter advertisement title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <Label className="block text-sm font-medium mb-2">Subtitle / Description</Label>
                <Textarea
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  placeholder="Enter advertisement description"
                  className="min-h-[80px]"
                />
              </div>

              {/* Button Text & Link */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-2">Button Text</Label>
                  <Input
                    value={formData.button_text}
                    onChange={(e) => setFormData({...formData, button_text: e.target.value})}
                    placeholder="Learn More"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">Button Link</Label>
                  <Input
                    value={formData.button_link}
                    onChange={(e) => setFormData({...formData, button_link: e.target.value})}
                    placeholder="www.example.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Enter full URL like www.slatelabs.io or https://example.com</p>
                </div>
              </div>

              {/* Display Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-2">Display Order</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                  />
                  <Label className="text-sm font-medium">Active</Label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingAd ? 'Update Advertisement' : 'Create Advertisement'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {ads.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-exo">No advertisements found. Create your first ad!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {ads.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border border-border/50 group hover:shadow-lg transition-all duration-300 overflow-hidden ${!ad.is_active ? 'opacity-60' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Drag Handle */}
                        <div className="hidden sm:flex items-center justify-center w-8 text-muted-foreground">
                          <GripVertical className="h-4 w-4" />
                        </div>
                        
                        {/* Preview Image */}
                        <div className="relative w-full sm:w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          {ad.image_url ? (
                            <img 
                              src={ad.image_url} 
                              alt={ad.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-primary/40" />
                            </div>
                          )}
                          {!ad.is_active && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Inactive</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-orbitron font-semibold text-base truncate">{ad.title}</h3>
                              <p className="text-muted-foreground text-xs line-clamp-2 break-words mt-1">{ad.subtitle}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                {ad.button_text && ad.button_link && (
                                  <span className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                                    <ExternalLink className="h-3 w-3" />
                                    {ad.button_text}
                                  </span>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  Order: {ad.display_order}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2 justify-end">
                          <Switch
                            checked={ad.is_active}
                            onCheckedChange={() => handleToggleActive(ad)}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(ad)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(ad.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAdCarouselManager;
