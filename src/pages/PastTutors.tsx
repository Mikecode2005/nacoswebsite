import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, GraduationCap, Calendar, ExternalLink, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PastTutors = () => {
  // Past tutor data
  const pastTutors = [
    {
      id: 1,
      name: "Jesuloba Popoola",
      position: "Mathematics & Physics Tutor",
      subjects: ["University Elementary Physics", "Mathematics - Calculus"],
      bio: "Dedicated and passionate tutor with exceptional teaching abilities in mathematics and physics. Known for breaking down complex concepts into easily understandable lessons that help students excel academically. Started teaching since 100 level and has been instrumental in helping numerous students understand difficult mathematical concepts.",
      image_url: "/images/Jesuloba.jpg",
      achievements: "Outstanding Tutor Award 2024",
      years_experience: 4,
      graduation_year: "2024/2025",
      teaching_start: "100 Level",
      specialties: [
        "Differential Calculus",
        "Integral Calculus",
        "Multivariable Calculus",
        "Differential Equations",
        "Limits & Continuity",
        "Applications of Derivatives",
        "Sequences & Series",
        "Vector Calculus",
        "Numerical Computing",
        "Mathematical Modeling"
      ],
      website: "https://www.popjmath.com/",
      strengths: [
        "Conceptual Clarity",
        "Problem-Solving Techniques",
        "Exam Preparation",
        "Individualized Attention",
        "Real-world Applications"
      ],
      calculus_topics: [
        "Functions and Limits",
        "Derivatives and Rates of Change",
        "Applications of Differentiation",
        "Integration Techniques",
        "Applications of Integration",
        "Infinite Series",
        "Partial Derivatives",
        "Multiple Integrals",
        "Vector Calculus",
        "Differential Equations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold font-orbitron text-blue-600">
              Past Tutors
            </h1>
          </div>
          <p className="text-muted-foreground font-exo text-lg max-w-2xl mx-auto">
            Celebrating our dedicated tutors who have made significant contributions to student success
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Tutor Cards */}
        <div className="space-y-8">
          {pastTutors.map((tutor) => (
            <Card key={tutor.id} className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                {/* Image and Basic Info */}
                <div className="lg:w-1/3 p-6 bg-blue-50 border-r border-blue-200">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-300 shadow-lg">
                      {tutor.image_url ? (
                        <img
                          src={tutor.image_url}
                          alt={tutor.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                          <GraduationCap className="h-16 w-16 text-blue-600" />
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold font-orbitron text-blue-600 mb-2">
                      {tutor.name}
                    </h2>
                    <p className="text-blue-700 font-rajdhani font-semibold text-lg mb-1">{tutor.position}</p>
                    <p className="text-green-600 font-medium mb-4">{tutor.achievements}</p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                        <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-blue-600">Graduated</p>
                        <p className="text-xs text-muted-foreground">{tutor.graduation_year}</p>
                      </div>
                      <div className="text-center bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                        <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-blue-600">Experience</p>
                        <p className="text-xs text-muted-foreground">{tutor.years_experience} years</p>
                      </div>
                    </div>

                    {/* Website Button */}
                    <Button 
                      onClick={() => window.open(tutor.website, '_blank', 'noopener,noreferrer')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Mathematics Website
                    </Button>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="lg:w-2/3 p-6">
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="text-xl font-bold font-rajdhani text-blue-600 mb-3 flex items-center">
                        <Star className="h-5 w-5 mr-2" />
                        About
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {tutor.bio}
                      </p>
                    </div>

                    {/* Subjects */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h3 className="text-lg font-bold font-rajdhani text-blue-600 mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Subjects Taught
                      </h3>
                      <div className="space-y-2">
                        {tutor.subjects.map((subject, idx) => (
                          <div key={idx} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                            <span className="font-medium">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <h3 className="text-lg font-bold font-rajdhani text-blue-600 mb-3 flex items-center">
                          <Calculator className="h-5 w-5 mr-2" />
                          Specialties & Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tutor.specialties.map((specialty, idx) => (
                            <span key={idx} className="text-sm bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <h3 className="text-lg font-bold font-rajdhani text-blue-600 mb-3 flex items-center">
                          <Star className="h-5 w-5 mr-2" />
                          Teaching Strengths
                        </h3>
                        <div className="space-y-2">
                          {tutor.strengths.map((strength, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                              <span className="text-sm font-medium">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Calculus Topics */}
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                      <h3 className="text-lg font-bold font-rajdhani text-indigo-600 mb-3">
                        Calculus Topics Covered
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tutor.calculus_topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center bg-white rounded-lg p-2 shadow-sm">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for Future Tutors */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-yellow-700 mb-2">More Tutors Coming Soon</h3>
            <p className="text-yellow-600">
              We're documenting more of our amazing past tutors. Check back later for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PastTutors;