import { useState, useEffect } from "react";
import { Code, Database, Cpu, Globe, ArrowRight, Terminal, Sparkles, Play, Lock, Terminal as TerminalIcon, Shield, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  stats: { label: string; value: string }[];
  activities: string[];
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "NACOS v2.0",
    subtitle: "The Future of Computer Science Education",
    icon: Code,
    stats: [
      { label: "Students", value: "500+" },
      { label: "Courses", value: "25+" },
      { label: "Progress", value: "78%" }
    ],
    activities: ["Data Structures", "Algorithm Analysis", "Web Development"]
  },
  {
    id: 2,
    title: "Innovate & Create",
    subtitle: "Building the Next Generation of Tech Leaders",
    icon: Globe,
    stats: [
      { label: "Events", value: "20+" },
      { label: "Workshops", value: "15+" },
      { label: "Projects", value: "50+" }
    ],
    activities: ["Hackathons", "Tech Talks", "Code Challenges"]
  },
  {
    id: 3,
    title: "Learn & Grow",
    subtitle: "Your Journey to Tech Excellence Starts Here",
    icon: Cpu,
    stats: [
      { label: "Mentors", value: "10+" },
      { label: "Partners", value: "5+" },
      { label: "Awards", value: "8+" }
    ],
    activities: ["Pair Programming", "Code Reviews", "Tech Blogging"]
  }
];

// Fun password reveal component
const HackSystem = ({ onReveal }: { onReveal: () => void }) => {
  const [hacking, setHacking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [decrypted, setDecrypted] = useState("");
  
  const targetPassword = "jabunacos";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  
  useEffect(() => {
    if (!hacking) return;
    
    let step = 0;
    const totalSteps = 30;
    
    const interval = setInterval(() => {
      step++;
      const progressPercent = Math.min((step / totalSteps) * 100, 100);
      setProgress(progressPercent);
      
      let result = "";
      for (let i = 0; i < targetPassword.length; i++) {
        if (i < Math.floor((step / totalSteps) * targetPassword.length)) {
          result += targetPassword[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDecrypted(result);
      
      if (step >= totalSteps) {
        clearInterval(interval);
        setDecrypted(targetPassword);
        setTimeout(onReveal, 500);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, [hacking, onReveal]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
        <Shield className="h-10 w-10 text-red-500" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold font-orbitron text-red-500 mb-2">SECURITY BREACH DETECTED</h2>
        <p className="text-sm text-white/60 font-exo">Attempting to decrypt password...</p>
      </div>
      
      <div className="w-full max-w-xs mx-auto">
        <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-red-500/30">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-red-400 mt-2 font-mono">{Math.round(progress)}% decrypted</p>
      </div>
      
      <div className="bg-black/80 border border-red-500/30 rounded-lg p-4 max-w-xs mx-auto">
        <p className="text-xs text-green-400 font-mono text-left">
          {"> "}DECRYPTING: {decrypted}
          <span className="animate-pulse">_</span>
        </p>
      </div>
      
      {hacking && (
        <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-mono"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            >
              {["0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase(), "BINARY", "HEX", "ASCII"][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )}
      
      {!hacking && (
        <Button
          onClick={() => setHacking(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-rajdhani font-semibold px-6 py-3 rounded-xl"
        >
          <Zap className="mr-2 h-4 w-4" />
          START HACKING
        </Button>
      )}
    </motion.div>
  );
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introStage, setIntroStage] = useState<"enter" | "password" | "main">("enter");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [hacking, setHacking] = useState(false);

  useEffect(() => {
    if (introStage !== "main") return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [introStage]);

  const handleEnter = () => {
    setIntroStage("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "jabunacos") {
      setIntroStage("main");
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleHackComplete = () => {
    setPassword("jabunacos");
    setHacking(false);
    setIntroStage("main");
  };

  if (introStage === "enter") {
    return (
      <section className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden font-mono">
        <div className="absolute inset-0 opacity-30">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-hero-accent text-xs"
              style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "linear" }}
            >
              {Math.random().toString(36).substring(2, 8)}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-hero-accent/20 to-hero-accent/5 border-2 border-hero-accent/50 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Code className="h-12 w-12 text-hero-accent" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-hero-accent mb-4 tracking-wider">NACOS</h1>
          <p className="text-hero-accent/60 font-exo mb-8 text-lg">Nigerian Association of Computer Science Students</p>
          
          <motion.button
            onClick={handleEnter}
            className="group relative px-8 py-4 bg-hero-accent/20 border-2 border-hero-accent/50 rounded-xl text-hero-accent font-rajdhani font-semibold text-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div className="absolute inset-0 bg-hero-accent/30" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
            <span className="relative z-10 flex items-center gap-2">
              <TerminalIcon className="h-5 w-5" />
              ENTER NACOS
            </span>
          </motion.button>
          
          <p className="mt-6 text-xs text-white/30 font-mono">Authorized personnel only 🔒</p>
        </motion.div>
      </section>
    );
  }

  if (introStage === "password") {
    return (
      <section className="bg-gradient-to-br from-gray-900 via-red-950 to-black min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-red-500 text-xs font-mono"
              style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
            >
              {["ACCESS DENIED", "SECURITY", "FIREWALL", "ENCRYPTION"][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md mx-4">
          <AnimatePresence mode="wait">
            {hacking ? (
              <HackSystem key="hack" onReveal={handleHackComplete} />
            ) : (
              <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="text-center">
                  <motion.div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Lock className="h-10 w-10 text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-bold font-orbitron text-primary mt-4">ENTER PASSWORD</h2>
                  <p className="text-sm text-white/60 font-exo">Enter the access password to continue</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password..."
                      className="bg-black/50 border-primary/30 text-white placeholder:text-white/30 font-mono text-lg py-6"
                    />
                    {showError && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-2">
                        ❌ Incorrect password. Access denied.
                      </motion.p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-semibold py-6">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    ACCESS GRANTED
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-black px-4 text-white/40">OR</span></div>
                </div>

                <Button type="button" variant="outline" onClick={() => setHacking(true)} className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 font-rajdhani font-semibold py-6">
                  <Shield className="mr-2 h-5 w-5" />
                  HACK THE SYSTEM
                </Button>

                <Button type="button" variant="ghost" onClick={() => setIntroStage("enter")} className="w-full text-white/40 hover:text-white/60">
                  ← Back
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    );
  }

  const current = heroSlides[currentSlide];
  const Icon = current.icon;

  return (
    <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <motion.div className="absolute top-20 left-10 w-32 h-20 border-2 border-hero-accent rounded-lg rotate-12 flex items-center justify-center" animate={{ y: [0, -20, 0], rotateY: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
          <Code className="h-8 w-8 text-hero-accent" />
        </motion.div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-hero-accent/30 font-mono text-xs"
              style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
            >
              {['01', '10', '11', '00', 'CS', '{}'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <span className="px-4 py-1.5 bg-accent/20 border border-accent/40 rounded-full text-accent font-rajdhani font-semibold text-sm">{current.subtitle}</span>
                </motion.div>

                <div className="flex items-center gap-4">
                  <motion.div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-xl" whileHover={{ scale: 1.05, rotate: 5 }}>
                    <Icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-orbitron text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    {current.title}
                  </motion.h1>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-3 gap-4">
                  {current.stats.map((stat) => (
                    <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-2xl font-bold font-orbitron text-accent">{stat.value}</div>
                      <div className="text-xs text-white/70 font-rajdhani mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-2">
                  <div className="text-xs text-white/50 font-rajdhani uppercase tracking-wider">Popular Activities</div>
                  <div className="flex flex-wrap gap-2">
                    {current.activities.map((activity) => (
                      <span key={activity} className="px-3 py-1.5 bg-white/10 rounded-lg text-sm text-white/80 font-exo border border-white/10">{activity}</span>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary font-rajdhani font-semibold px-6 py-5 rounded-xl shadow-xl hover:shadow-accent/25 transition-all duration-300">
                    <Link to="/dashboard"><Terminal className="mr-2 h-4 w-4" />Get Started<ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-rajdhani font-semibold px-6 py-5 rounded-xl transition-all duration-300">
                    <Link to="/blog"><Play className="mr-2 h-4 w-4" />Explore</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-accent" : "w-2 bg-white/40 hover:bg-white/60"}`}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.3 }}
                  />
                ))}
              </div>
              <span className="text-xs text-white/50 font-rajdhani"><span className="text-accent">{currentSlide + 1}</span><span className="mx-1">/</span><span>{heroSlides.length}</span></span>
            </div>
          </div>

          <motion.div className="hidden lg:flex justify-center" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative w-full max-w-md">
              <motion.div className="bg-gradient-to-br from-hero-accent/20 to-hero-accent/5 rounded-3xl border-2 border-hero-accent/30 p-6 shadow-2xl backdrop-blur-sm" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="text-xs text-hero-accent/60 font-mono bg-black/20 px-3 py-1 rounded">NACOS Dashboard</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-hero-accent/20 rounded-xl p-4 border border-hero-accent/20">
                    <div className="text-xs text-hero-accent/60 mb-1">Active Members</div>
                    <div className="text-2xl font-bold font-orbitron text-hero-accent">500+</div>
                  </div>
                  <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/20">
                    <div className="text-xs text-blue-400/60 mb-1">Online Now</div>
                    <div className="text-2xl font-bold font-orbitron text-blue-400">24</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs text-hero-accent/60 mb-2"><span>Learning Progress</span><span>78%</span></div>
                  <div className="w-full bg-hero-accent/20 rounded-full h-3 overflow-hidden">
                    <motion.div className="bg-gradient-to-r from-hero-accent to-blue-400 h-full rounded-full" initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.5, delay: 0.5 }} />
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { name: "Data Structures", icon: Database },
                    { name: "Algorithm Analysis", icon: Cpu },
                    { name: "Web Development", icon: Globe }
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-8 h-8 bg-hero-accent/20 rounded-lg flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-hero-accent" />
                      </div>
                      <span className="text-sm text-white/80 font-exo flex-1">{item.name}</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="absolute -top-4 -right-4 w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center bg-accent/10" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <Code className="h-6 w-6 text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center bg-primary/50">
            <motion.div className="w-1.5 h-3 bg-accent rounded-full mt-2" animate={{ opacity: [0, 1, 0], y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-background">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
