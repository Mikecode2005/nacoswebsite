import { Crown, Star, GraduationCap, Users, ArrowRight, Mail, Linkedin, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LeadershipSection = () => {
  const leaders = [
    {
      id: 'hod',
      name: 'Dr O.O Lawal',
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
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-accent rounded-lg rotate-45" />
      </div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-accent font-rajdhani font-semibold text-sm uppercase tracking-wider">Meet Our Leaders</span>
            <Sparkles className="h-5 w-5 text-accent" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4">
            Our Leadership Team
          </h2>
          <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
            Meet the visionary leaders driving JABU NACOS to new heights of excellence and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {leaders.map((leader, index) => {
            const Icon = leader.icon;
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-gradient-to-br from-card to-card/80 rounded-2xl border border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top Accent Line */}
                  <div className="h-1 bg-gradient-to-r from-accent to-primary w-full" />
                  
                  {/* Content */}
                  <div className="p-6 sm:p-8 text-center relative z-10">
                    {/* Image Container */}
                    <motion.div
                      className="relative inline-block mb-6"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-28 h-28 mx-auto rounded-full overflow-hidden ring-4 ring-accent/30 group-hover:ring-accent/50 transition-all duration-300">
                        {leader.image_url ? (
                          <img
                            src={leader.image_url}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                            <Icon className="h-12 w-12 text-primary" />
                          </div>
                        )}
                      </div>
                      
                      {/* Status Indicator */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-card"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Icon className="h-3 w-3 text-primary" />
                      </motion.div>
                    </motion.div>

                    {/* Name */}
                    <h3 className="font-orbitron text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {leader.name}
                    </h3>
                    
                    {/* Position */}
                    <p className="text-accent font-rajdhani font-semibold text-lg mb-4">{leader.position}</p>
                    
                    {/* Description */}
                    <p className="text-muted-foreground font-exo text-sm leading-relaxed mb-6">
                      {leader.description}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mb-6">
                      <motion.a
                        href={`mailto:${leader.email}`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                      </motion.a>
                      <motion.a
                        href={leader.linkedin}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        <Linkedin className="h-4 w-4 text-primary" />
                      </motion.a>
                    </div>
                    
                    {/* CTA Button */}
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-rajdhani font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    >
                      <Link to={leader.route}>
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
