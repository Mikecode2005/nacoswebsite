import { Database, Shield, ChartBar as BarChart3, Code, ArrowRight, Users, Award, TrendingUp } from "lucide-react";
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
      stats: { students: '30+', courses: '25+', placement: '95%' },
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
      stats: { students: '20+', courses: '20+', placement: '98%' },
      tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite']
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-primary rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-accent rounded-lg rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-orbitron mb-6 text-primary">
            Our Departments
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-exo leading-relaxed">
            Explore our specialized departments designed to prepare you for the future of technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className={`${dept.borderColor} bg-gradient-to-br ${dept.bgGradient} hover:shadow-lg transition-all duration-300 relative overflow-hidden group h-full border-2`}>
                  
                  {/* Subtle background animation */}
                  <div className="absolute inset-0 opacity-10">
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${dept.gradient} rounded-full transform translate-x-20 -translate-y-20`} />
                  </div>

                  <CardHeader className="text-center relative z-10 pb-6">
                    <motion.div 
                      className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <CardTitle className={`text-2xl font-orbitron ${dept.textColor} mb-4`}>
                      {dept.name}
                    </CardTitle>
                    
                    <p className="text-muted-foreground font-exo leading-relaxed">
                      {dept.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    {/* Department Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-white/80 rounded-lg shadow-sm">
                        <div className={`text-lg font-orbitron font-bold ${dept.textColor}`}>
                          {dept.stats.students}
                        </div>
                        <div className="text-xs text-muted-foreground font-rajdhani">Students</div>
                      </div>
                      
                      <div className="text-center p-3 bg-white/80 rounded-lg shadow-sm">
                        <div className={`text-lg font-orbitron font-bold ${dept.textColor}`}>
                          {dept.stats.courses}
                        </div>
                        <div className="text-xs text-muted-foreground font-rajdhani">Courses</div>
                      </div>
                      
                      <div className="text-center p-3 bg-white/80 rounded-lg shadow-sm">
                        <div className={`text-lg font-orbitron font-bold ${dept.textColor}`}>
                          {dept.stats.placement}
                        </div>
                        <div className="text-xs text-muted-foreground font-rajdhani">Placement</div>
                      </div>
                    </div>

                    {/* Tools & Technologies */}
                    <div className="space-y-3">
                      <h4 className={`font-rajdhani font-semibold ${dept.textColor} text-center text-sm`}>
                        Key Technologies
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {dept.tools.map((tool, toolIndex) => (
                          <span
                            key={tool}
                            className={`px-2 py-1 bg-white/90 text-gray-700 rounded-full text-xs font-rajdhani font-medium border ${dept.borderColor} shadow-sm`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      asChild
                      className={`w-full bg-gradient-to-r ${dept.gradient} hover:shadow-md text-white font-rajdhani font-semibold py-4 rounded-lg transition-all duration-300 group`}
                    >
                      <Link to={dept.route}>
                        Explore {dept.name}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
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