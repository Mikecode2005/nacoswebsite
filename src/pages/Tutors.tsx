import { Crown, Star, PenTool, Mail, Clock, BookOpen, Users, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tutors = () => {
  const tutors = [
    {
      id: 1,
      name: "Duduyemi Olalekan",
      specialization: "NACOS President & Academic Mentor",
      experience: "3 years",
      icon: Crown,
      bio: "Leading NACOS with academic excellence and providing guidance to fellow students in computer science fundamentals and leadership development.",
      subjects: ["Computer Science Fundamentals", "Leadership", "Academic Planning", "Project Guidance", "Calculus"],
      availability: "Mon, Wed, Fri - 2:00 PM - 5:00 PM",
      email: "president@nacos.jabu.edu.ng",
      whatsapp: "+234 XXX XXX XXXX",
      sessions: 80,
      rating: 4.9
    },
    {
      id: 2,
      name: "Ogunmola Michael (ECM)",
      specialization: "Web Development & Technical Skills",
      experience: "2 years",
      icon: Star,
      bio: "Passionate about web technologies and helping students master modern development tools. Specializing in frontend and backend development.",
      subjects: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database Design", "Mathematics", "Calculus", "BCD to 7-Segment Decoder"],
      availability: "Sunday - 3:00 PM - 7:00 PM",
      email: "chairman@nacos.jabu.edu.ng",
      whatsapp: "+234 XXX XXX XXXX",
      sessions: 65,
      rating: 4.92
    },
    {
      id: 3,
      name: "Adebayo Oluwatoyin",
      specialization: "Programming & Problem Solving",
      experience: "2 years",
      icon: PenTool,
      bio: "Experienced in programming competitions and algorithm design. Dedicated to helping students improve their coding skills and problem-solving abilities.",
      subjects: ["Python", "Java", "Algorithms", "Data Structures", "Competitive Programming", "Calculus"],
      availability: "Mon, Wed, Fri - 9:00 AM - 12:00 PM",
      email: "adebayo.oluwatoyin@student.jabu.edu.ng",
      whatsapp: "+234 XXX XXX XXXX",
      sessions: 50,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-primary">Student Tutors</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized guidance from our dedicated student tutors who excel in various 
            areas of Computer Science and are committed to helping their peers succeed.
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {tutors.map((tutor, index) => {
            const Icon = tutor.icon;
            return (
              <Card key={tutor.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-green-500 shadow-lg">
                        <Icon className="h-16 w-16 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <CardHeader className="px-0 pt-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-2xl text-primary mb-2">{tutor.name}</CardTitle>
                          <p className="text-lg font-semibold text-muted-foreground">{tutor.specialization}</p>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {tutor.experience} Experience
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="px-0">
                      <p className="text-muted-foreground mb-4">{tutor.bio}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-primary mb-2 flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Subjects
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {tutor.subjects.map((subject, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary mb-2 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Availability
                          </h4>
                          <p className="text-sm text-muted-foreground">{tutor.availability}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{tutor.sessions} Sessions</span>
                          <span>★ {tutor.rating}/5.0</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <Phone className="h-4 w-4 mr-1" />
                            WhatsApp
                          </Button>
                          <Button size="sm" className="flex-1 sm:flex-none">
                            Book Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Need Academic Help?</h3>
              <p className="text-muted-foreground mb-4">
                Our student tutors are here to help you succeed in your academic journey. 
                Book a session today and get personalized guidance from your peers who understand your challenges.
              </p>
              <Button size="lg">
                Schedule a Session
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Meet Our Past Tutors</h3>
              <p className="text-muted-foreground mb-4">
                Discover the exceptional alumni who have dedicated their time to help fellow students succeed. 
                Learn from their experiences and see how they've impacted our academic community.
              </p>
              <Button size="lg" asChild>
                <Link to="/past-tutors">
                  View Past Tutors
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tutors;