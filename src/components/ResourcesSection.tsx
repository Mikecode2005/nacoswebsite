import { Laptop, HelpCircle, Book, Globe, Code, Trophy, Crown, GraduationCap, Users, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ResourcesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Past Questions & Quizzes */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-8">Past Questions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card id="past-questions" className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Laptop className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-2">Past Questions</h3>
                  <p className="text-muted-foreground text-sm">Test your knowledge</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <HelpCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-2">Quizzes</h3>
                  <p className="text-muted-foreground text-sm">Test your knowledge</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-primary mb-8">Student Excellence Hub</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/hall-of-fame">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-primary">Hall of Fame</h3>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/tutors">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-primary">Tutors</h3>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* Tech Giants & Sports */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center">
                  <Book className="h-6 w-6 mr-2" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32">
                  <div className="flex space-x-4">
                    <div className="w-16 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <div className="w-16 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Tech Giants</h2>
              <p className="text-muted-foreground mb-4">Our department's tech leaders</p>
              <Link to="/tech-giants">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Department Tech Giants</h3>
                        <p className="text-sm text-muted-foreground">Meet our 5 tech leaders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div id="quizzes">
              <h2 className="text-2xl font-bold text-primary mb-4">Sports</h2>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Sports Activities</h3>
                      <p className="text-sm text-muted-foreground">Join our sports events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Delete Button Section - Responsive */}
        <div className="mt-8 flex justify-center">
          <button className="
            bg-destructive 
            text-destructive-foreground 
            hover:bg-destructive/90 
            transition-colors 
            duration-200 
            rounded-lg 
            font-medium
            flex 
            items-center 
            justify-center
            gap-2
            sm:px-6 
            sm:py-3 
            sm:text-base
            px-3 
            py-3 
            text-sm
            w-full 
            max-w-xs 
            mx-auto
            sm:w-auto
          ">
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Delete</span>
            <span className="sm:hidden">Delete</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;