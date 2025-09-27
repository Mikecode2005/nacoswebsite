import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryCarousel from "@/components/GalleryCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Camera, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
  created_at: string;
}

const Gallery = () => {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newImage, setNewImage] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newImage.title || !imageFile) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and select an image file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload image to storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      // Insert into database
      const { error } = await supabase
        .from('gallery')
        .insert({
          title: newImage.title,
          description: newImage.description,
          image_url: publicUrl,
          category: newImage.category
        });

      if (error) throw error;

      toast({
        title: "Image Uploaded! 📸",
        description: "Your image has been added to the gallery.",
      });

      setNewImage({ title: "", description: "", category: "" });
      setImageFile(null);
      setShowUploadForm(false);
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Upload Failed 😞",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!user || !['admin', 'superadmin'].includes(userRole || '')) {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to delete images.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      toast({
        title: "Image Deleted! 🗑️",
        description: "The image has been removed from the gallery.",
      });

      fetchImages();
    } catch (error: any) {
      toast({
        title: "Delete Failed 😞",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4 font-orbitron flex items-center justify-center gap-3">
            <Camera className="h-10 w-10" />
            Photo Gallery 📸
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-exo">
            Explore moments captured from our tech community events and activities!
          </p>
        </motion.div>

        {/* Upload Button for Admins */}
        {user && ['admin', 'superadmin', 'lecturer'].includes(userRole || '') && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Upload New Image ✨
            </Button>
          </motion.div>
        )}

        {/* Upload Form */}
        {showUploadForm && user && ['admin', 'superadmin', 'lecturer'].includes(userRole || '') && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl max-w-2xl mx-auto">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center text-2xl font-orbitron">
                  <Upload className="h-6 w-6 mr-2" />
                  Upload New Image
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleUpload} className="space-y-6">
                  <div>
                    <label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                      Image Title *
                    </label>
                    <Input
                      value={newImage.title}
                      onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                      placeholder="e.g., NACOS Tech Conference 2024"
                      required
                      className="text-lg p-4 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                      Select Image *
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      required
                      className="text-lg p-4 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                      Category
                    </label>
                    <Input
                      value={newImage.category}
                      onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                      placeholder="e.g., Events, Workshops, Competitions"
                      className="text-lg p-4 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <label className="text-lg font-medium text-primary mb-3 block font-rajdhani">
                      Description
                    </label>
                    <Textarea
                      value={newImage.description}
                      onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                      placeholder="Describe the image or event..."
                      rows={3}
                      className="text-lg p-4 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani text-lg px-8 py-3 flex-1"
                    >
                      {isUploading ? "Uploading..." : "Upload Image 🚀"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowUploadForm(false)}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-rajdhani text-lg px-8 py-3"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Gallery Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <GalleryCarousel />
        </motion.div>

        {/* Admin Gallery Management */}
        {user && ['admin', 'superadmin'].includes(userRole || '') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary font-orbitron">Gallery Management</CardTitle>
                <p className="text-muted-foreground font-exo">Manage all uploaded images</p>
              </CardHeader>
              <CardContent>
                {images.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-video bg-secondary/5 rounded-lg border border-secondary/20 overflow-hidden">
                          <img 
                            src={image.image_url} 
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(image.id)}
                              className="opacity-90 hover:opacity-100"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-primary font-rajdhani">{image.title}</h4>
                          {image.description && (
                            <p className="text-sm text-muted-foreground font-exo mt-1">{image.description}</p>
                          )}
                          {image.category && (
                            <span className="inline-block mt-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                              {image.category}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-exo">No images in gallery yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;