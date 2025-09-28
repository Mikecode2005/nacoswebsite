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
      projects: 50,
      awards: 3,
      business: "Cpaws Studio (Web3 Creative Studio)"
    },
    {
      id: 2,
      name: "Eniola Arnold",
      position: "Tech Professional",
      company: "Information coming soon",
      achievement: "Rising Tech Star",
      image: "/placeholder.svg",
      bio: "Details about Eniola's achievements and career path will be added soon.",
      specialties: ["Skills to be updated"],
      yearsOfExperience: 0,
      projects: 0,
      awards: 0,
      business: "Information coming soon"
    },
    {
      id: 3,
      name: "Benjamin",
      position: "Tech Professional",
      company: "Information coming soon",
      achievement: "Tech Innovator",
      image: "/placeholder.svg",
      bio: "Details about Benjamin's achievements and career path will be added soon.",
      specialties: ["Skills to be updated"],
      yearsOfExperience: 0,
      projects: 0,
      awards: 0,
      business: "Information coming soon"
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
              <div className="md:flex">
                {/* Fixed image section for mobile */}
                <div className="md:w-1/3">
                  <div className="h-48 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative p-4">
                    {giant.image === "/placeholder.svg" ? (
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/30 rounded-full flex items-center justify-center">
                        <Users className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={giant.image} 
                          alt={giant.name}
                          className="w-32 h-32 md:w-full md:h-full object-cover rounded-lg md:rounded-none"
                          style={{ 
                            objectPosition: 'center',
                            maxWidth: '100%',
                            maxHeight: '100%'
                          }}
                        />
                      </div>
                    )}
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 right-3 md:top-4 md:right-4 bg-primary/90 text-primary-foreground text-xs md:text-sm"
                    >
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-4 md:p-6">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 space-y-2 md:space-y-0">
                      <div className="flex-1">
                        <CardTitle className="text-xl md:text-2xl text-primary mb-1">{giant.name}</CardTitle>
                        <p className="text-base md:text-lg font-semibold text-muted-foreground">{giant.position}</p>
                        <p className="text-sm text-muted-foreground">{giant.company}</p>
                        {giant.business && giant.business !== "Information coming soon" && (
                          <p className="text-xs md:text-sm text-accent font-medium mt-1">{giant.business}</p>
                        )}
                      </div>
                      <Badge variant="default" className="text-xs md:text-sm w-fit">
                        {giant.achievement}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="px-0">
                    <p className="text-muted-foreground text-sm md:text-base mb-4">{giant.bio}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-2 flex items-center text-sm md:text-base">
                          <Star className="h-3 w-3 md:h-4 md:w-4 mr-1" />
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
                        <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                          <div className="bg-primary/5 p-2 md:p-3 rounded-lg">
                            <div className="text-base md:text-lg font-bold text-primary">{giant.yearsOfExperience}+</div>
                            <div className="text-xs text-muted-foreground">Years Exp</div>
                          </div>
                          <div className="bg-accent/5 p-2 md:p-3 rounded-lg">
                            <div className="text-base md:text-lg font-bold text-accent">{giant.projects}+</div>
                            <div className="text-xs text-muted-foreground">Projects</div>
                          </div>
                          <div className="bg-secondary/20 p-2 md:p-3 rounded-lg">
                            <div className="text-base md:text-lg font-bold text-secondary-foreground">{giant.awards}</div>
                            <div className="text-xs text-muted-foreground">Awards</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
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
                      
                      <Button variant="outline" size="sm" disabled={giant.id > 1} className="w-full md:w-auto">
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                        {giant.id === 1 ? "View Portfolio" : "Coming Soon"}
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
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">Join Our Legacy</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-4">
                Be inspired by our alumni success stories and start your own journey in tech. 
                Your name could be featured here next!
              </p>
              <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
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