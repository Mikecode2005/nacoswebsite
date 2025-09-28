import { Crown, Star, GraduationCap, Users, ArrowRight, Mail, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LeadershipSection = () => {
  const leaders = [
    {
      id: 'hod',
      name: 'Dr. Adebayo Kolawole',
      position: 'Head of Department',
      description: 'Leading the Computer Science department with academic excellence and industry experience.',
      route: '/hod',
      icon: GraduationCap,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      iconBg: 'bg-green-100',
      email: 'hod@nacos.jabu.edu.ng'
    },
    {
      id: 'president',
      name: 'Emmanuel Adebayo',
      position: 'NACOS President',
      description: 'Leading NACOS with vision and passion for tech innovation and student excellence.',
      route: '/president',
      icon: Crown,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      iconBg: 'bg-yellow-100',
      email: 'president@nacos.jabu.edu.ng'
    },
    {
      id: 'chairman',
      name: 'Ogunmola Michael',
      position: 'Executive Chairman',
      description: 'Driving strategic vision and fostering innovation within the NACOS community.',
      route: '/executive-chairman',
      icon: Star,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100',
      email: 'chairman@nacos.jabu.edu.ng'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-accent rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-secondary rounded-full animate-spin"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl font-bold font-orbitron mb-6 text-primary"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Our Leadership Team
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-exo leading-relaxed">
            Meet the visionary leaders driving NACOS to new heights of excellence and innovation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {leaders.map((leader, index) => {
            const Icon = leader.icon;
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className={`${leader.borderColor} bg-gradient-to-br ${leader.bgGradient} hover:shadow-2xl transition-all duration-500 relative overflow-hidden group`}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <motion.div 
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${leader.gradient} rounded-full transform translate-x-20 -translate-y-20`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${leader.gradient} rounded-lg transform -translate-x-16 translate-y-16 rotate-45`}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [45, 225, 45]
                      }}
                      transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </div>

                  <CardHeader className="text-center relative z-10">
                    <motion.div 
                      className={`w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${leader.gradient} flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative`}
                      whileHover={{ 
                        rotate: [0, 5, -5, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-16 w-16 text-white drop-shadow-2xl" />
                      
                      {/* Floating particles around icon */}
                      <div className="absolute inset-0">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/60 rounded-full"
                            style={{
                              left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                              top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                    
                    <CardTitle className={`text-3xl font-orbitron ${leader.textColor} mb-4 group-hover:scale-105 transition-transform duration-300`}>
                      {leader.name}
                    </CardTitle>
                    
                    <motion.div 
                      className={`inline-block px-6 py-3 bg-gradient-to-r ${leader.gradient} text-white rounded-full text-lg font-rajdhani font-semibold shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {leader.position}
                    </motion.div>
                  </CardHeader>

                  <CardContent className="text-center space-y-6 relative z-10">
                    <p className={`${leader.textColor} font-exo text-lg leading-relaxed`}>
                      {leader.description}
                    </p>

                    {/* Contact Info */}
                    <div className="flex justify-center space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-3 ${leader.iconBg} rounded-full`}
                      >
                        <Mail className={`h-5 w-5 ${leader.textColor}`} />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className={`p-3 ${leader.iconBg} rounded-full`}
                      >
                        <Linkedin className={`h-5 w-5 ${leader.textColor}`} />
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        asChild
                        className={`w-full bg-gradient-to-r ${leader.gradient} hover:shadow-xl text-white font-rajdhani font-semibold text-lg py-6 rounded-xl transition-all duration-300`}
                      >
                        <Link to={leader.route}>
                          Meet {leader.position.split(' ')[0]}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${leader.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`}></div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* General Executives Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-primary via-accent to-secondary animate-pulse"></div>
            </div>

            <CardContent className="p-12 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-8"
              >
                <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-primary mb-4 font-orbitron">
                Meet Our Executive Team
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-exo">
                Discover the passionate individuals who make NACOS a thriving community of tech innovators and leaders
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-semibold text-xl px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link to="/executives">
                    Explore All Executives
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;