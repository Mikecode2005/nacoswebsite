import { Users, Briefcase, Trophy, Star, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TechGiants = () => {
  const techGiants = [
    {
      id: 1,
      name: "Ebenezer Abegunde",
      position: "Founder & Creative Director",
      company: "Cpaws Studio",
      achievement: "Web3 Creative Pioneer",
      image: "/images/Cpaws2.jpg",
      bio: "Exceptional alumnus who excelled in multiple digital creative fields. Built a successful Web3 creative studio that combines cutting-edge technology with stunning visual design.",
      specialties: ["Web Development", "Branding & Graphic Design", "Video Editing", "Web3 Technologies"],
      yearsOfExperience: 4,
      projects: 40,
      awards: 3,
      business: "Cpaws Studio (Web3 Creative Studio)",
      portfolio: "https://www.cpawsstudio.com"
    },
    {
      id: 2,
      name: "Eniola Arnold",
      position: "Graphic Artist/Designer",
      company: "GrayPlug",
      achievement: "Visual Storyteller",
      image: "/images/Arnold.jpg",
      bio: "Passionate about blending clean layouts with emotional storytelling. Brings creativity from Instagram portfolio (@arnolden_dev), exploring mood, typography, and visual identity.",
      specialties: ["Graphic Design", "Typography", "Visual Identity", "Branding"],
      yearsOfExperience: 4,
      projects: 25,
      awards: 2,
      portfolio: "https://www.instagram.com/arnolden_dev"
    },
    {
      id: 3,
      name: "Omolayo Ayokanmi (BeeTechHub)",
      position: "Full-Stack Developer",
      company: "BeeTechHub",
      achievement: "Tech Innovator",
      image: "/images/BJ2.jpg",
      bio: "Forward-thinking full-stack developer with a strong foundation in HTML, TailwindCSS, JavaScript, PHP, SQL, Python, and Django. Builds smart, user-friendly web applications that combine traditional best practices with cutting-edge technology.",
      specialties: ["Full-Stack Development", "Python/Django", "JavaScript", "PHP", "SQL"],
      yearsOfExperience: 4,
      projects: 30,
      awards: 3,
      portfolio: "https://omolayoayokanmi.com.ng/"
    },
    {
      id: 4,
      name: "Benjamin",
      position: "Tech Professional",
      company: "Information coming soon",
      achievement: "Tech Leader",
      image: "/placeholder.svg",
      bio: "Details about Benjamin's achievements and career path will be added soon.",
      specialties: ["Skills to be updated"],
      yearsOfExperience: 0,
      projects: 0,
      awards: 0,
      business: "Information coming soon"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-primary">Alumni Tech Giants</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating our exceptional alumni who have made remarkable achievements in the tech industry 
            and continue to inspire current students with their success stories.
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {techGiants.map((giant, index) => (
            <Card key={giant.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Mobile: Stack layout, Desktop: Side by side */}
              <div className="flex flex-col md:flex-row">
                {/* Image Section - Full width on mobile, 1/3 on desktop */}
                <div className="w-full md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                    {giant.image === "/placeholder.svg" ? (
                      <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center">
                        <Users className="h-16 w-16 text-primary" />
                      </div>
                    ) : (
                      <img 
                        src={giant.image} 
                        alt={giant.name}
                        className="w-full h-full object-contain md:object-cover"
                      />
                    )}
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
                    >
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
                
                {/* Content Section - Full width on mobile, 2/3 on desktop */}
                <div className="w-full md:w-2/3 p-6">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                      <div>
                        <CardTitle className="text-2xl text-primary mb-1">{giant.name}</CardTitle>
                        <p className="text-lg font-semibold text-muted-foreground">{giant.position}</p>
                        <p className="text-sm text-muted-foreground">{giant.company}</p>
                        {giant.business && giant.business !== "Information coming soon" && (
                          <p className="text-sm text-accent font-medium mt-1">{giant.business}</p>
                        )}
                      </div>
                      <Badge variant="default" className="text-sm w-fit">
                        {giant.achievement}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="px-0">
                    <p className="text-muted-foreground mb-4">{giant.bio}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {giant.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {giant.yearsOfExperience > 0 && (
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-primary/5 p-3 rounded-lg">
                            <div className="text-lg font-bold text-primary">{giant.yearsOfExperience}+</div>
                            <div className="text-xs text-muted-foreground">Years Exp</div>
                          </div>
                          <div className="bg-accent/5 p-3 rounded-lg">
                            <div className="text-lg font-bold text-accent">{giant.projects}+</div>
                            <div className="text-xs text-muted-foreground">Projects</div>
                          </div>
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="text-lg font-bold text-secondary-foreground">{giant.awards}</div>
                            <div className="text-xs text-muted-foreground">Awards</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {giant.yearsOfExperience > 0 ? (
                        <div className="flex items-center space-x-3">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {giant.yearsOfExperience} years in industry
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Information coming soon
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={giant.id > 3}
                        className="w-full md:w-auto"
                        onClick={() => {
                          if (giant.portfolio) {
                            window.open(giant.portfolio, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {giant.id === 1 ? "View Website" : 
                         giant.id === 2 ? "View Instagram" : 
                         giant.id === 3 ? "View Portfolio" : "Coming Soon"}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Join Our Legacy</h3>
              <p className="text-muted-foreground mb-4">
                Be inspired by our alumni success stories and start your own journey in tech. 
                Your name could be featured here next!
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button variant="outline" className="w-full md:w-auto">
                  Student Resources
                </Button>
                <Button className="w-full md:w-auto">
                  Get Mentorship
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechGiants;