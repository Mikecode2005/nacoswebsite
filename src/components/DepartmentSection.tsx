import { Database, Shield, BarChart3, Code, ArrowRight, Users, Award, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
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
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      bgGradient: 'from-emerald-950/30 via-green-950/20 to-background',
      borderGradient: 'from-emerald-500/50 to-green-500/30',
      textGradient: 'from-emerald-400 to-green-400',
      accentColor: 'text-emerald-400',
      stats: { students: '30+', courses: '25+', placement: '95%' },
      tools: ['Python', 'R', 'SQL', 'Tableau']
    },
    {
      id: 'cyber-security',
      name: 'Cyber Security',
      description: 'Protect digital assets and learn ethical hacking in our comprehensive security program.',
      route: '/cyber-security',
      icon: Shield,
      gradient: 'from-violet-500 via-purple-500 to-indigo-500',
      bgGradient: 'from-violet-950/30 via-purple-950/20 to-background',
      borderGradient: 'from-violet-500/50 to-purple-500/30',
      textGradient: 'from-violet-400 to-purple-400',
      accentColor: 'text-violet-400',
      stats: { students: '20+', courses: '20+', placement: '98%' },
      tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite']
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-primary rounded-full" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-accent rounded-lg rotate-45" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-accent/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-accent font-rajdhani font-semibold text-sm uppercase tracking-wider">Our Focus Areas</span>
            <Sparkles className="h-5 w-5 text-accent" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4">
            Sub Departments
          </h2>
          <p className="text-muted-foreground font-exo text-lg max-w-3xl mx-auto">
            Explore our specialized departments designed to prepare you for the future of technology
          </p>
        </motion.div>

        {/* Department Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Card */}
                <div className={`
                  relative h-full rounded-2xl overflow-hidden
                  bg-gradient-to-br ${dept.bgGradient}
                  border border-border/30
                  hover:border-accent/30
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500
                `}>
                  {/* Gradient Border Top */}
                  <div className={`h-1 bg-gradient-to-r ${dept.gradient}`} />
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${dept.gradient} opacity-10 rounded-full transform translate-x-20 -translate-y-20`} />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className={`
                        w-16 h-16 mb-6 rounded-2xl
                        bg-gradient-to-br ${dept.gradient}
                        flex items-center justify-center
                        shadow-lg group-hover:shadow-xl
                        transition-all duration-300
                      `}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold font-orbitron ${dept.accentColor} mb-3`}>
                      {dept.name}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground font-exo text-sm leading-relaxed mb-6">
                      {dept.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <motion.div 
                        className="text-center p-3 bg-background/50 rounded-xl border border-border/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-lg font-orbitron font-bold ${dept.accentColor}`}>
                          {dept.stats.students}
                        </div>
                        <div className="text-xs text-muted-foreground font-rajdhani">Students</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-3 bg-background/50 rounded-xl border border-border/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-lg font-orbitron font-bold ${dept.accentColor}`}>
                          {dept.stats.courses}
                        </div>
                        <div className="text-xs text-muted-foreground font-rajdhani">Courses</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-3 bg-background/50 rounded-xl border border-border/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-lg font-orbitron font-bold ${dept.accentColor}`}>
                          {dept.stats.placement}
                        </div>
                        <div className="text-xs text-muted-foreground font-rajdhani">Placement</div>
                      </motion.div>
                    </div>

                    {/* Tools */}
                    <div className="mb-6">
                      <div className={`font-rajdhani font-semibold ${dept.accentColor} text-xs uppercase tracking-wider mb-3`}>
                        Key Technologies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {dept.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1.5 bg-background/80 rounded-lg text-xs font-rajdhani font-medium text-muted-foreground border border-border/30 hover:border-accent/30 transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button 
                      asChild
                      className={`
                        w-full bg-gradient-to-r ${dept.gradient}
                        hover:opacity-90 text-white font-rajdhani font-semibold
                        py-3 rounded-xl shadow-lg hover:shadow-xl
                        transition-all duration-300
                        group/btn
                      `}
                    >
                      <Link to={dept.route}>
                        Explore {dept.name.split(' ')[0]}
                        <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            asChild 
            variant="outline"
            className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-rajdhani font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            <Link to="/departments">
              View All Departments
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DepartmentSection;
