import { GraduationCap, Mail, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tutors = () => {
  const tutors = [
    {
      id: 1,
      name: "Dr. Adebayo Kehinde",
      specialization: "Data Structures & Algorithms",
      experience: "8 years",
      image: "/placeholder.svg",
      bio: "Expert in competitive programming and algorithm optimization. Former software engineer at Google.",
      subjects: ["Data Structures", "Algorithms", "Competitive Programming"],
      availability: "Mon, Wed, Fri - 2:00 PM - 5:00 PM",
      email: "adebayo.kehinde@university.edu.ng",
      sessions: 150,
      rating: 4.9
    },
    {
      id: 2,
      name: "Eng. Fatima Suleiman",
      specialization: "Web Development & UI/UX",
      experience: "6 years",
      image: "/placeholder.svg",
      bio: "Full-stack developer and UI/UX designer with expertise in modern web technologies and user experience design.",
      subjects: ["HTML/CSS", "JavaScript", "React", "UI/UX Design"],
      availability: "Tue, Thu, Sat - 10:00 AM - 1:00 PM",
      email: "fatima.suleiman@university.edu.ng",
      sessions: 120,
      rating: 4.8
    },
    {
      id: 3,
      name: "Mr. Chinedu Okonkwo",
      specialization: "Database Design & Management",
      experience: "5 years",
      image: "/placeholder.svg",
      bio: "Database architect and consultant specializing in SQL, NoSQL databases, and enterprise data management solutions.",
      subjects: ["SQL", "Database Design", "MongoDB", "Data Modeling"],
      availability: "Mon, Wed, Fri - 9:00 AM - 12:00 PM",
      email: "chinedu.okonkwo@university.edu.ng",
      sessions: 95,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-primary">Our Tutors</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized guidance from our experienced tutors who are experts in various 
            areas of Computer Science and committed to helping you succeed.
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {tutors.map((tutor, index) => (
            <Card key={tutor.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-16 w-16 text-primary" />
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{tutor.sessions} Sessions</span>
                        <span>★ {tutor.rating}/5.0</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm">
                          Book Session
                        </Button>
                      </div>
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
              <h3 className="text-2xl font-bold text-primary mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Our tutors are here to help you succeed in your academic journey. 
                Book a session today and get personalized guidance tailored to your needs.
              </p>
              <Button size="lg">
                Schedule a Session
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