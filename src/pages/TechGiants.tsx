import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Sparkles, ExternalLink, Code, Palette, Database, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TechGiants = () => {
  const techGiants = [
    {
      id: 1,
      name: "Ebenezer Abegunde",
      position: "Founder & Creative Director",
      company: "Cpaws Studio",
      bio: "Exceptional alumnus who excelled in multiple digital creative fields. Built a successful Web3 creative studio that combines cutting-edge technology with stunning visual design.",
      specialties: ["Web Development", "Branding & Graphic Design", "Video Editing", "Web3 Technologies"],
      years: 4,
      portfolio: "https://www.cpawsstudio.com"
    },
    {
      id: 2,
      name: "Eniola Arnold",
      position: "Graphic Artist/Designer",
      company: "GrayPlug",
      bio: "Passionate about blending clean layouts with emotional storytelling. Brings creativity from Instagram portfolio (@arnolden_dev), exploring mood, typography, and visual identity.",
      specialties: ["Graphic Design", "Typography", "Visual Identity and branding", "Coding"],
      years: 2,
      portfolio: "https://www.instagram.com/arnolden_dev"
    },
    {
      id: 3,
      name: "Omolayo Ayokanmi (BeeTechHub)",
      position: "Full-Stack Developer",
      company: "BeeTechHub",
      bio: "Forward-thinking full-stack developer with a strong foundation in HTML, TailwindCSS, JavaScript, PHP, SQL, Python, and Django. Builds smart, user-friendly web applications that combine traditional best practices with cutting-edge technology.",
      specialties: ["Full-Stack Development", "Python/Django", "JavaScript", "PHP", "SQL"],
      years: 3,
      portfolio: "https://omolayoayokanmi.com.ng/"
    }
  ];

  const getSpecialtyIcon = (specialty: string) => {
    if (specialty.toLowerCase().includes('web')) return Code;
    if (specialty.toLowerCase().includes('design') || specialty.toLowerCase().includes('graphic')) return Palette;
    if (specialty.toLowerCase().includes('data') || specialty.toLowerCase().includes('sql')) return Database;
    return Rocket;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-accent font-rajdhani font-semibold text-sm uppercase tracking-wider">Alumni Success Stories</span>
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4">
            Alumni Tech Giants
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-exo">
            Celebrating our exceptional alumni who are making waves in the tech industry and inspiring the next generation
          </p>
        </motion.div>

        {/* Alumni Cards - Bigger */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-16">
          {techGiants.map((giant, index) => (
            <motion.div
              key={giant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full border-border/30 bg-gradient-to-br from-card to-accent/5 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-accent via-primary to-secondary" />
                
                <CardContent className="p-8">
                  {/* Big Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className={`w-48 h-48 rounded-full overflow-hidden border-4 ${
                        index === 0 ? 'border-yellow-500' : 'border-accent'
                      } shadow-2xl`}>
                        <img 
                          src={`/images/${index === 0 ? 'Cpaws2' : index === 1 ? 'Arnold' : 'BJ2'}.jpg`} 
                          alt={giant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge className={`absolute -bottom-2 -right-2 text-base px-4 py-2 ${
                        index === 0 ? 'bg-yellow-500 text-yellow-900' : 'bg-accent text-primary'
                      }`}>
                        #{giant.id}
                      </Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold font-orbitron text-primary mb-2">{giant.name}</h3>
                    <p className="text-lg font-medium text-accent">{giant.position}</p>
                    <p className="text-base text-muted-foreground mt-2">{giant.company}</p>
                    {index === 0 && <p className="text-sm text-muted-foreground">{giant.company} (Web3 Creative Studio)</p>}
                    {index === 1 && <p className="text-sm text-muted-foreground">Graphic Design / Java</p>}
                  </div>

                  <p className="text-base text-muted-foreground text-center mb-6 leading-relaxed">{giant.bio}</p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-3">
                      <Badge variant="outline" className="text-sm px-4 py-1">Specialties</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {giant.specialties.slice(0, 3).map((specialty, idx) => {
                        const Icon = getSpecialtyIcon(specialty);
                        return (
                          <Badge key={idx} variant="outline" className="text-sm bg-background/50 px-3 py-1">
                            <Icon className="h-4 w-4 mr-1" />
                            {specialty}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* Years */}
                  <div className="flex items-center justify-center text-lg text-muted-foreground mb-6">
                    <span className="font-bold text-accent text-2xl">{giant.years}+</span>
                    <span className="ml-3">years experience</span>
                  </div>
                  
                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="w-full border-accent/30 text-accent hover:bg-accent/10 text-lg py-6"
                    onClick={() => window.open(giant.portfolio, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {giant.id === 1 ? "View Website" : giant.id === 2 ? "View Instagram" : "View Portfolio"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="max-w-3xl mx-auto border-border/30 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
            <CardContent className="p-10 text-center">
              <Rocket className="h-16 w-16 text-accent mx-auto mb-6" />
              <h3 className="text-3xl font-bold font-orbitron text-primary mb-4">Join Our Legacy</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                Be inspired by our alumni success stories and start your own journey in tech. 
                Your name could be featured here next!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" className="border-primary/30 text-lg px-8 py-6" asChild>
                  <Link to="/resources">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Explore Courses
                  </Link>
                </Button>
                <Button className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-6">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Mentorship
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default TechGiants;
