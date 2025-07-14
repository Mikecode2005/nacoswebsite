import { useEffect, useState } from "react";
import { Crown, Trophy, Star, Medal, Users, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface HallOfFameMember {
  id: string;
  name: string;
  achievement: string;
  category: string;
  gpa?: string;
  year: string;
  project?: string;
  department?: string;
  specialization?: string;
  image_url?: string;
  bio?: string;
  rank_position: number;
}

const HallOfFame = () => {
  const [students, setStudents] = useState<HallOfFameMember[]>([]);
  const [lecturers, setLecturers] = useState<HallOfFameMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHallOfFameData();
  }, []);

  const fetchHallOfFameData = async () => {
    try {
      const { data, error } = await supabase
        .from('hall_of_fame')
        .select('*')
        .order('rank_position', { ascending: true });

      if (error) throw error;

      const studentsData = data?.filter(member => member.category === 'student') || [];
      const lecturersData = data?.filter(member => member.category === 'lecturer') || [];

      setStudents(studentsData);
      setLecturers(lecturersData);
    } catch (error) {
      console.error('Error fetching hall of fame data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-6 w-6 text-primary" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-500 to-orange-500";
      case 2:
        return "bg-gradient-to-br from-gray-400 to-gray-600";
      case 3:
        return "bg-gradient-to-br from-amber-600 to-orange-700";
      default:
        return "bg-gradient-to-br from-primary/20 to-primary/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-primary">Hall of Fame</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating our exceptional students who have demonstrated outstanding academic excellence, 
            innovation, and leadership in Computer Science.
          </p>
        </div>

        <Tabs defaultValue="students" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="lecturers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Lecturers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <div className="grid gap-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : students.length > 0 ? (
                students.map((student) => (
                  <Card 
                    key={student.id} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                      student.rank_position <= 3 ? 'border-2 border-primary/30' : ''
                    }`}
                  >
                    <div className={`absolute top-0 left-0 w-full h-2 ${getRankColor(student.rank_position)}`} />
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-full ${getRankColor(student.rank_position)}`}>
                            {getRankIcon(student.rank_position)}
                          </div>
                          <div>
                            <CardTitle className="text-xl text-primary font-orbitron">{student.name}</CardTitle>
                            <p className="text-muted-foreground font-exo">Class of {student.year}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={student.rank_position <= 3 ? "default" : "secondary"} className="text-lg px-3 py-1 font-rajdhani">
                            #{student.rank_position}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-2 font-rajdhani">Achievement</h4>
                          <p className="text-muted-foreground mb-3 font-exo">{student.achievement}</p>
                          
                          {student.project && (
                            <>
                              <h4 className="font-semibold text-primary mb-2 font-rajdhani">Final Year Project</h4>
                              <p className="text-muted-foreground font-exo">{student.project}</p>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="text-3xl font-bold text-primary mb-1 font-orbitron">{student.gpa}</div>
                            <div className="text-sm text-muted-foreground font-exo">CGPA</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-2 font-rajdhani">No Students Yet</h3>
                    <p className="text-muted-foreground font-exo">Outstanding students will be added to the hall of fame.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="lecturers">
            <div className="grid gap-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : lecturers.length > 0 ? (
                lecturers.map((lecturer) => (
                  <Card 
                    key={lecturer.id} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                      lecturer.rank_position <= 3 ? 'border-2 border-primary/30' : ''
                    }`}
                  >
                    <div className={`absolute top-0 left-0 w-full h-2 ${getRankColor(lecturer.rank_position)}`} />
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-full ${getRankColor(lecturer.rank_position)}`}>
                            {getRankIcon(lecturer.rank_position)}
                          </div>
                          <div>
                            <CardTitle className="text-xl text-primary font-orbitron">{lecturer.name}</CardTitle>
                            <p className="text-muted-foreground font-exo">
                              {lecturer.department} {lecturer.specialization && `• ${lecturer.specialization}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={lecturer.rank_position <= 3 ? "default" : "secondary"} className="text-lg px-3 py-1 font-rajdhani">
                            #{lecturer.rank_position}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div>
                        <h4 className="font-semibold text-primary mb-2 font-rajdhani">Achievement</h4>
                        <p className="text-muted-foreground mb-3 font-exo">{lecturer.achievement}</p>
                        
                        {lecturer.bio && (
                          <>
                            <h4 className="font-semibold text-primary mb-2 font-rajdhani">Biography</h4>
                            <p className="text-muted-foreground font-exo">{lecturer.bio}</p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-2 font-rajdhani">No Lecturers Yet</h3>
                    <p className="text-muted-foreground font-exo">Distinguished lecturers will be added to the hall of fame.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Join the Hall of Fame</h3>
              <p className="text-muted-foreground">
                Work hard, innovate, and excel in your studies to be recognized among our top performers. 
                The Hall of Fame is updated annually to celebrate our most outstanding students.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HallOfFame;