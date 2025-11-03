import { Crown, Star, GraduationCap, Users, ArrowRight, Mail, Linkedin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LeadershipSection = () => {
  const leaders = [
    {
      id: 'hod',
      name: 'Mr Lawal',
      position: 'Head of Department',
      description: 'Leading the Computer Science department with excellence and industry experience.',
      route: '/hod',
      icon: GraduationCap,
      email: 'lawal.jabu.edu.ng',
      linkedin: '#',
      image_url: '/images/HOD.jpg'
    },
    {
      id: 'president',
      name: 'Duduyemi Olalaken',
      position: 'NACOS President',
      description: 'Leading NACOS with vision and passion for tech innovation and student excellence.',
      route: '/president',
      icon: Crown,
      email: 'omoniyiolalekan@nacos.jabu.edu.ng',
      linkedin: '#',
      image_url: '/images/Duduyemi.jpg'
    },
    {
      id: 'chairman',
      name: 'Ogunmola Michael',
      position: 'Executive Chairman',
      description: 'Driving strategic vision and fostering innovation within the NACOS community.',
      route: '/executive-chairman',
      icon: Star,
      email: 'chairman@nacos.jabu.edu.ng',
      linkedin: '#',
      image_url: '/images/Michael2.jpg'
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
            <Users className="h-12 w-12 text-primary mr-3" />
            <h2 className="text-4xl font-bold font-orbitron text-primary">
              Our Leadership Team
            </h2>
          </div>
          <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
            Meet the visionary leaders driving NACOS to new heights of excellence and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                
                <CardHeader className="text-center pb-2">
                  <div className="relative">
                    {/* Image Container */}
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      {leader.image_url ? (
                        <img
                          src={leader.image_url}
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                          <leader.icon className="h-12 w-12 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Position Badge */}
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      #{index + 1}
                    </div>
                  </div>
                  
                  <CardTitle className="font-orbitron text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                    {leader.name}
                  </CardTitle>
                  <p className="text-primary font-rajdhani font-semibold text-lg">{leader.position}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-muted-foreground font-exo text-sm leading-relaxed">
                      {leader.description}
                    </p>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex justify-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-primary/10 rounded-full cursor-pointer"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-primary/10 rounded-full cursor-pointer"
                    >
                      <Linkedin className="h-4 w-4 text-primary" />
                    </motion.div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <Button 
                      asChild
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-semibold"
                    >
                      <Link to={leader.route}>
                        Meet {leader.position.split(' ')[0]}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
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
            <Link to="/executives">
              Explore All Executives
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;