import { Users, Briefcase, Trophy, Star, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TechGiants = () => {
  const techGiants = [
    {
      id: 1,
      name: "Dr. Olumide Adeyemi",
      position: "Head of Computer Science Department",
      company: "Federal University of Technology",
      achievement: "AI Research Pioneer",
      image: "/placeholder.svg",
      bio: "Leading researcher in Artificial Intelligence and Machine Learning with over 15 years of experience. Published 50+ research papers in top-tier journals.",
      specialties: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision"],
      yearsOfExperience: 15,
      projects: 25,
      awards: 8
    },
    {
      id: 2,
      name: "Prof. Amina Hassan",
      position: "Professor of Software Engineering",
      company: "University of Ibadan",
      achievement: "Software Architecture Expert",
      image: "/placeholder.svg",
      bio: "Renowned software architect and consultant for Fortune 500 companies. Expert in large-scale system design and microservices architecture.",
      specialties: ["Software Engineering", "System Architecture", "Cloud Computing", "DevOps"],
      yearsOfExperience: 12,
      projects: 30,
      awards: 6
    },
    {
      id: 3,
      name: "Dr. Emeka Nwankwo",
      position: "Cybersecurity Research Lead",
      company: "Nigerian Cybersecurity Institute",
      achievement: "Cybersecurity Innovator",
      image: "/placeholder.svg",
      bio: "Leading expert in cybersecurity and blockchain technology. Advisor to government agencies on national cybersecurity policies.",
      specialties: ["Cybersecurity", "Blockchain", "Cryptography", "Network Security"],
      yearsOfExperience: 10,
      projects: 20,
      awards: 5
    },
    {
      id: 4,
      name: "Eng. Kemi Adebola",
      position: "Senior Data Scientist",
      company: "Andela Nigeria",
      achievement: "Data Science Pioneer",
      image: "/placeholder.svg",
      bio: "Data science evangelist and mentor to hundreds of aspiring data scientists. Expert in big data analytics and predictive modeling.",
      specialties: ["Data Science", "Big Data Analytics", "Statistical Modeling", "Python"],
      yearsOfExperience: 8,
      projects: 40,
      awards: 4
    },
    {
      id: 5,
      name: "Mr. Tunde Bakare",
      position: "Mobile App Development Expert",
      company: "Flutterwave",
      achievement: "Mobile Innovation Leader",
      image: "/placeholder.svg",
      bio: "Mobile app development specialist with expertise in cross-platform development. Built apps used by millions of users across Africa.",
      specialties: ["Mobile Development", "Flutter", "React Native", "iOS/Android"],
      yearsOfExperience: 7,
      projects: 35,
      awards: 3
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-primary">Department Tech Giants</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the distinguished faculty members and industry experts who are shaping the future 
            of Computer Science education and research in our department.
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {techGiants.map((giant, index) => (
            <Card key={giant.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                    <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-primary" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
                    >
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <CardTitle className="text-2xl text-primary mb-1">{giant.name}</CardTitle>
                        <p className="text-lg font-semibold text-muted-foreground">{giant.position}</p>
                        <p className="text-sm text-muted-foreground">{giant.company}</p>
                      </div>
                      <Badge variant="default" className="text-sm">
                        {giant.achievement}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="px-0">
                    <p className="text-muted-foreground mb-4">{giant.bio}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {giant.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-primary/5 p-3 rounded-lg">
                          <div className="text-lg font-bold text-primary">{giant.yearsOfExperience}+</div>
                          <div className="text-xs text-muted-foreground">Years Exp</div>
                        </div>
                        <div className="bg-accent/5 p-3 rounded-lg">
                          <div className="text-lg font-bold text-accent">{giant.projects}+</div>
                          <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                        <div className="bg-secondary/20 p-3 rounded-lg">
                          <div className="text-lg font-bold text-secondary-foreground">{giant.awards}</div>
                          <div className="text-xs text-muted-foreground">Awards</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {giant.yearsOfExperience} years in industry
                        </span>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Join Our Legacy</h3>
              <p className="text-muted-foreground mb-4">
                Our department is proud to have such distinguished faculty members and industry experts 
                who continue to push the boundaries of technology and education.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">
                  Research Opportunities
                </Button>
                <Button>
                  Contact Faculty
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechGiants;