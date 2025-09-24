import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User, Save } from "lucide-react";

interface ProfileEditProps {
  onClose: () => void;
}

const ProfileEdit = ({ onClose }: ProfileEditProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !displayName.trim()) return;
    
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName.trim() })
        .eq("user_id", user.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile Updated! ✅",
        description: "Your display name has been saved successfully.",
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Update Failed 😞",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <User className="h-5 w-5 mr-2" />
          Update Your Profile 👤
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-primary mb-2 block">
              Display Name 📝
            </label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name to show on blog posts..."
              required
              className="border-primary/30 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This name will appear on your blog posts instead of "Anonymous User"
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={saving || !displayName.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Name 💾"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileEdit;