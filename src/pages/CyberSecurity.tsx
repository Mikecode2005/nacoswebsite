import { Shield, Lock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CyberSecurity = () => {
  const offerings = [
    {
      id: 1,
      title: "Ethical Hacking & Penetration Testing",
      description: "Master the art of identifying and securing vulnerabilities through hands-on ethical hacking techniques and penetration testing methodologies.",
      icon: <Lock className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      title: "Network Security & Defense",
      description: "Learn to protect networks from cyber threats with advanced firewall configurations, intrusion detection systems, and secure network design.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      title: "Cryptography & Secure Communications",
      description: "Explore encryption techniques and secure communication protocols to safeguard sensitive data and ensure privacy in digital systems.",
      icon: <Lock className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      title: "Incident Response & Forensics",
      description: "Develop skills to investigate cyber incidents, recover compromised systems, and analyze digital evidence for cybersecurity forensics.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-primary">Cybersecurity Subdepartment</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our cutting-edge Cybersecurity program and gain the skills to protect digital systems, combat cyber threats, and secure the future of technology.
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
              <h3 className="text-2xl font-bold text-primary mb-4">Why Choose Our Cybersecurity Program?</h3>
              <p className="text-muted-foreground mb-4">
                Our Cybersecurity subdepartment offers hands-on training, real-world projects, and industry-relevant certifications to prepare you for a career in securing the digital world.
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

export default CyberSecurity;
