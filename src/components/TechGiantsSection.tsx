import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, ExternalLink, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TechGiantsSection = () => {
  const alumniGiants = [
    {
      id: 1,
      name: "Ebenezer Abegunde",
      position: "Founder & Creative Director",
      company: "Cpaws Studio",
      bio: "Exceptional alumnus who built a successful Web3 creative studio.",
      image_url: "/images/Cpaws2.jpg",
      years_experience: 4,
      portfolio: "https://www.cpawsstudio.com"
    },
    {
      id: 2,
      name: "Eniola Arnold",
      position: "Graphic Artist/Designer",
      company: "GrayPlug",
      bio: "Passionate about blending clean layouts with emotional storytelling.",
      image_url: "/images/Arnold.jpg",
      years_experience: 2,
      portfolio: "https://www.instagram.com/arnolden_dev"
    },
    {
      id: 3,
      name: "Omolayo Ayokanmi",
      position: "Full-Stack Developer",
      company: "BeeTechHub",
      bio: "Forward-thinking full-stack developer building smart applications.",
      image_url: "/images/BJ2.jpg",
      years_experience: 3,
      portfolio: "https://omolayoayokanmi.com.ng/"
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="text-accent font-rajdhani font-semibold text-sm uppercase tracking-wider">Alumni Success</span>
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-primary mb-4">
            Alumni Tech Giants
          </h2>
          <p className="text-muted-foreground font-exo max-w-2xl mx-auto">
            Celebrating our exceptional alumni who are making waves in the tech industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {alumniGiants.map((alumni, index) => (
            <motion.div
              key={alumni.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full border-border/30 bg-gradient-to-br from-card to-accent/5 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${index === 0 ? 'from-yellow-500 to-amber-400' : 'from-accent to-primary'}`} />
                
                <CardHeader className="text-center pb-2">
                  {/* Big Image */}
                  <div className="relative mx-auto mb-4">
                    <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden border-4 ${index === 0 ? 'border-yellow-500' : 'border-accent'} shadow-lg`}>
                      <img src={alumni.image_url} alt={alumni.name} className="w-full h-full object-cover" />
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-500 text-yellow-900' : 'bg-accent text-primary'}`}>
                      #{index + 1}
                    </span>
                  </div>
                  
                  <CardTitle className="text-xl font-orbitron text-primary">{alumni.name}</CardTitle>
                  <p className="text-base font-medium text-accent">{alumni.position}</p>
                  <p className="text-sm text-muted-foreground">{alumni.company}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-3">{alumni.bio}</p>
                  
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                    <span className="font-rajdhani font-bold text-accent text-lg">{alumni.years_experience}+</span>
                    <span className="ml-2">years experience</span>
                  </div>
                  
                  {alumni.portfolio && (
                    <Button 
                      variant="outline" 
                      className="w-full border-accent/30 text-accent hover:bg-accent/10 text-base py-6"
                      onClick={() => window.open(alumni.portfolio, '_blank')}
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      {index === 0 ? "View Website" : index === 1 ? "View Instagram" : "View Portfolio"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Button 
            asChild 
            className="bg-accent hover:bg-accent/90 text-primary font-rajdhani font-semibold text-lg px-10 py-6"
          >
            <Link to="/tech-giants">
              Explore All Alumni
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechGiantsSection;
