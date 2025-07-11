import { Crown, Trophy, Star, Medal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HallOfFame = () => {
  const topStudents = [
    {
      id: 1,
      name: "Adebayo Oluwaseun",
      achievement: "Best Final Year Project 2024",
      gpa: "4.95",
      year: "2024",
      project: "AI-Powered Learning Management System",
      rank: 1
    },
    {
      id: 2,
      name: "Fatima Muhammad",
      achievement: "Outstanding Academic Performance",
      gpa: "4.89",
      year: "2024",
      project: "Blockchain-based Student Record System",
      rank: 2
    },
    {
      id: 3,
      name: "Chinedu Okwu",
      achievement: "Innovation in Software Development",
      gpa: "4.85",
      year: "2023",
      project: "Smart Campus Navigation App",
      rank: 3
    },
    {
      id: 4,
      name: "Aisha Bello",
      achievement: "Excellence in Database Design",
      gpa: "4.82",
      year: "2023",
      project: "Hospital Management Information System",
      rank: 4
    },
    {
      id: 5,
      name: "Emmanuel Okafor",
      achievement: "Best Programming Skills",
      gpa: "4.78",
      year: "2023",
      project: "E-commerce Platform with ML Recommendations",
      rank: 5
    }
  ];

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

        <div className="grid gap-6 max-w-4xl mx-auto">
          {topStudents.map((student, index) => (
            <Card 
              key={student.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                student.rank <= 3 ? 'border-2 border-primary/30' : ''
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${getRankColor(student.rank)}`} />
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${getRankColor(student.rank)}`}>
                      {getRankIcon(student.rank)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-primary">{student.name}</CardTitle>
                      <p className="text-muted-foreground">Class of {student.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={student.rank <= 3 ? "default" : "secondary"} className="text-lg px-3 py-1">
                      #{student.rank}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Achievement</h4>
                    <p className="text-muted-foreground mb-3">{student.achievement}</p>
                    
                    <h4 className="font-semibold text-primary mb-2">Final Year Project</h4>
                    <p className="text-muted-foreground">{student.project}</p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-3xl font-bold text-primary mb-1">{student.gpa}</div>
                      <div className="text-sm text-muted-foreground">CGPA</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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