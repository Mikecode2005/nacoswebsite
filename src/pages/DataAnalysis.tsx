import { BarChart, Database, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DataAnalysis = () => {
  const offerings = [
    {
      id: 1,
      title: "Big Data Analytics",
      description: "Dive into the world of big data with tools like Hadoop and Spark to process and analyze massive datasets for actionable insights.",
      icon: <Database className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      title: "Machine Learning & AI",
      description: "Learn to build predictive models and intelligent systems using machine learning algorithms and AI techniques with Python and TensorFlow.",
      icon: <BarChart className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      title: "Data Visualization",
      description: "Master the art of presenting data through interactive dashboards and visualizations using tools like Tableau and Power BI.",
      icon: <BarChart className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      title: "Statistical Modeling",
      description: "Apply advanced statistical methods to uncover patterns, test hypotheses, and make data-driven decisions in real-world scenarios.",
      icon: <Database className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BarChart className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-primary">Data Analysis Subdepartment</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock the power of data with our Data Analysis program, designed to equip you with skills in analytics, machine learning, and visualization for a data-driven future.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {offerings.map((offering) => (
            <Card key={offering.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardHeader className="px-6 pt-6">
                <div className="flex items-center space-x-3">
                  {offering.icon}
                  <CardTitle className="text-xl text-primary">{offering.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4">{offering.description}</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Why Choose Our Data Analysis Program?</h3>
              <p className="text-muted-foreground mb-4">
                Our Data Analysis subdepartment provides hands-on experience with industry-standard tools, real-world datasets, and projects to launch your career in data science.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">Explore Courses</Button>
                <Button>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataAnalysis;
