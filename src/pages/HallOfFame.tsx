import { Crown, Users, GraduationCap, Clock, Sparkles, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HallOfFame = () => {
  const ComingSoonCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) => (
    <Card className="relative overflow-hidden border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-500 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-8 w-8 text-primary/60" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-center">
        <CardTitle className="text-xl text-primary mb-3 font-orbitron">{title}</CardTitle>
        <p className="text-muted-foreground font-exo mb-4">{description}</p>
        
        <div className="flex items-center justify-center space-x-2 text-primary/60">
          <Clock className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-rajdhani font-semibold">Coming Soon</span>
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-primary">Hall of Fame</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get ready to witness excellence! Our Hall of Fame is preparing to showcase the extraordinary achievements 
            of our brightest students and most distinguished lecturers.
          </p>
        </div>

        <Tabs defaultValue="students" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span>Top Students</span>
            </TabsTrigger>
            <TabsTrigger value="lecturers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Distinguished Lecturers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ComingSoonCard
                title="Academic Excellence"
                description="Celebrating students with outstanding academic performance and remarkable CGPA achievements"
                icon={GraduationCap}
              />
              
              <ComingSoonCard
                title="Innovation Leaders"
                description="Spotlighting students who have created groundbreaking projects and technological innovations"
                icon={Target}
              />
              
              <ComingSoonCard
                title="Research Pioneers"
                description="Recognizing students who have contributed significantly to research and development"
                icon={Sparkles}
              />
            </div>

            <div className="mt-12 text-center">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-primary mr-3 animate-pulse" />
                    <h3 className="text-2xl font-bold text-primary">First Edition Coming Soon</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    We're curating the inaugural Hall of Fame to celebrate our department's finest achievements. 
                    Stay tuned for the big reveal!
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lecturers">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ComingSoonCard
                title="Teaching Excellence"
                description="Honoring lecturers who have demonstrated exceptional teaching methodologies and student mentorship"
                icon={Users}
              />
              
              <ComingSoonCard
                title="Research Contributions"
                description="Recognizing faculty members with significant research publications and academic contributions"
                icon={Target}
              />
              
              <ComingSoonCard
                title="Industry Impact"
                description="Celebrating lecturers who have made substantial impact in the industry and community"
                icon={Sparkles}
              />
            </div>

            <div className="mt-12 text-center">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-primary mr-3 animate-pulse" />
                    <h3 className="text-2xl font-bold text-primary">Faculty Recognition Coming Soon</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    We're preparing to honor our distinguished lecturers and their incredible contributions 
                    to computer science education and research.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-primary">Be Part of History</h3>
              </div>
              <p className="text-muted-foreground text-lg mb-4">
                This is your chance to be among the first to be featured in our Hall of Fame. 
                Excel in your studies, innovate, and make your mark!
              </p>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Launching Soon • Stay Tuned
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HallOfFame;