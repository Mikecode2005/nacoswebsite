import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Award, Users, Trophy, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TechGiantsSection = () => {
  // Hardcoded alumni data
  const alumniGiants = [
    {
      id: 1,
      name: "Ebenezer Abegunde",
      position: "Founder & Creative Director",
      company: "Cpaws Studio",
      bio: "Exceptional alumnus who excelled in multiple digital creative fields. Built a successful Web3 creative studio that combines cutting-edge technology with stunning visual design.",
      image_url: "/images/Cpaws1.jpg",
      achievements: "Web3 Creative Pioneer",
      years_experience: 4,
      specialties: ["Web Development", "Branding & Graphic Design", "Video Editing", "Web3 Technologies"],
      business: "Cpaws Studio (Web3 Creative Studio)"
    },
    {
      id: 2,
      name: "Eniola Arnold",
      position: "Tech Professional",
      company: "Information coming soon",
      bio: "Details about Eniola's achievements and career path will be added soon.",
      image_url: "/placeholder.svg",
      achievements: "Rising Tech Star",
      years_experience: 0,
      specialties: ["Skills to be updated"],
      business: "Information coming soon"
    },
    {
      id: 3,
      name: "Benjamin",
      position: "Tech Professional",
      company: "Information coming soon",
      bio: "Details about Benjamin's achievements and career path will be added soon.",
      image_url: "/placeholder.svg",
      achievements: "Tech Innovator",
      years_experience: 0,
      specialties: ["Skills to be updated"],
      business: "Information coming soon"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-primary mr-3" />
            <h2 className="text-4xl font-bold font-orbitron text-primary">
              Alumni Tech Giants
            </h2>
          </div>
          <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
            Celebrating our exceptional alumni who are making waves in the tech industry and inspiring the next generation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {alumniGiants.map((alumni, index) => (
            <motion.div
              key={alumni.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  
                  <CardHeader className="text-center pb-2">
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                        {alumni.image_url && alumni.image_url !== "/placeholder.svg" ? (
                          <img
                            src={alumni.image_url} 
                            alt={alumni.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                            <Users className="h-12 w-12 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <CardTitle className="font-orbitron text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                      {alumni.name}
                    </CardTitle>
                    <p className="text-primary font-rajdhani font-semibold text-lg">{alumni.position}</p>
                    <p className="text-accent font-rajdhani font-medium">{alumni.company}</p>
                    {alumni.business && alumni.business !== "Information coming soon" && (
                      <p className="text-sm text-muted-foreground font-medium mt-1">{alumni.business}</p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-muted-foreground font-exo text-sm leading-relaxed">
                        {alumni.bio}
                      </p>
                    </div>
                    
                    {alumni.specialties && alumni.specialties.length > 0 && alumni.specialties[0] !== "Skills to be updated" && (
                      <div className="bg-primary/10 rounded-lg p-3">
                        <div className="flex items-center justify-center mb-2">
                          <Award className="h-4 w-4 text-primary mr-2" />
                          <span className="font-rajdhani font-semibold text-primary text-sm">Specialties</span>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {alumni.specialties.slice(0, 3).map((specialty, idx) => (
                            <span key={idx} className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {alumni.years_experience && alumni.years_experience > 0 && (
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4 mr-2 text-accent" />
                        <span className="font-rajdhani">{alumni.years_experience}+ years experience</span>
                      </div>
                    )}
                    
                    {alumni.id === 1 && (
                      <div className="text-center">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Portfolio
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/tech-giants">
              Explore All Alumni
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechGiantsSection;