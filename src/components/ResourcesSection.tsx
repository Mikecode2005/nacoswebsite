import { Laptop, HelpCircle, Book, Globe, Code, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <h2 className="text-4xl font-bold text-primary mb-8">Learning Resources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🍎</span>
                  </div>
                  <h3 className="font-bold text-lg text-primary">Apple</h3>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">G</span>
                  </div>
                  <h3 className="font-bold text-lg text-primary">Google</h3>
                </CardContent>
              </Card>
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
              <p className="text-muted-foreground mb-4">Stay informed about the industry</p>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Industry Updates</h3>
                      <p className="text-sm text-muted-foreground">Latest tech news</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
      </div>
    </section>
  );
};

export default ResourcesSection;