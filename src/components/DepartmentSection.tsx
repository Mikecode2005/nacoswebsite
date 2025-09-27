import { Database, Shield, BarChart3, Code, ArrowRight, Users, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DepartmentSection = () => {
  const departments = [
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Master the art of extracting insights from data using cutting-edge tools and techniques.',
      route: '/data-analysis',
      icon: BarChart3,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100',
      stats: { students: '150+', courses: '25+', placement: '95%' },
      tools: ['Python', 'R', 'SQL', 'Tableau']
    },
    {
      id: 'cyber-security',
      name: 'Cyber Security',
      description: 'Protect digital assets and learn ethical hacking in our comprehensive security program.',
      route: '/cyber-security',
      icon: Shield,
      gradient: 'from-red-500 to-rose-600',
      bgGradient: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      iconBg: 'bg-red-100',
      stats: { students: '120+', courses: '20+', placement: '98%' },
      tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite']
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-accent rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border border-secondary rounded-full animate-spin"></div>
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
            Our Departments
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-exo leading-relaxed">
            Explore our specialized departments designed to prepare you for the future of technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 3,
                  z: 50
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className={`${dept.borderColor} bg-gradient-to-br ${dept.bgGradient} hover:shadow-2xl transition-all duration-500 relative overflow-hidden group h-full`}>
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <motion.div 
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${dept.gradient} rounded-full transform translate-x-20 -translate-y-20`}
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
                      className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${dept.gradient} rounded-lg transform -translate-x-16 translate-y-16 rotate-45`}
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

                  <CardHeader className="text-center relative z-10 pb-6">
                    <motion.div 
                      className={`w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative`}
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
                    
                    <CardTitle className={`text-3xl font-orbitron ${dept.textColor} mb-4 group-hover:scale-105 transition-transform duration-300`}>
                      {dept.name}
                    </CardTitle>
                    
                    <p className={`${dept.textColor} font-exo text-lg leading-relaxed`}>
                      {dept.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-8 relative z-10">
                    {/* Department Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div 
                        className="text-center p-4 bg-white/80 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className={`text-2xl font-orbitron font-bold ${dept.textColor}`}>
                          {dept.stats.students}
                        </div>
                        <div className="text-sm text-muted-foreground font-rajdhani">Students</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-white/80 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className={`text-2xl font-orbitron font-bold ${dept.textColor}`}>
                          {dept.stats.courses}
                        </div>
                        <div className="text-sm text-muted-foreground font-rajdhani">Courses</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-4 bg-white/80 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className={`text-2xl font-orbitron font-bold ${dept.textColor}`}>
                          {dept.stats.placement}
                        </div>
                        <div className="text-sm text-muted-foreground font-rajdhani">Placement</div>
                      </motion.div>
                    </div>

                    {/* Tools & Technologies */}
                    <div className="space-y-4">
                      <h4 className={`font-rajdhani font-semibold ${dept.textColor} text-center`}>
                        Key Technologies
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {dept.tools.map((tool, toolIndex) => (
                          <motion.span
                            key={tool}
                            className={`px-3 py-2 bg-gradient-to-r ${dept.gradient} text-white rounded-full text-sm font-rajdhani font-medium shadow-lg`}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: toolIndex * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        asChild
                        className={`w-full bg-gradient-to-r ${dept.gradient} hover:shadow-xl text-white font-rajdhani font-semibold text-lg py-6 rounded-xl transition-all duration-300 group`}
                      >
                        <Link to={dept.route}>
                          Explore {dept.name}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>

                  {/* Scanning Light Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DepartmentSection;