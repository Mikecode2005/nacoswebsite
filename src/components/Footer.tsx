import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="rounded-full overflow-hidden">
                <img 
                  src="/images/logo.png" 
                  alt="Logo" 
                  className="h-8 w-8"
                />
              </div>
              <div>
                <div className="font-bold text-lg">NACOS</div>
                <div className="text-sm opacity-80">JABU CHAPTER</div>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Nigerian Association of Computer Science Students - Joseph Ayo Babalola University Chapter. 
              Empowering the next generation of tech innovators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#blog" className="text-primary-foreground/80 hover:text-hero-accent transition-colors">Blog</a></li>
              <li><a href="#past-questions" className="text-primary-foreground/80 hover:text-hero-accent transition-colors">Past Questions</a></li>
              <li><a href="#quizzes" className="text-primary-foreground/80 hover:text-hero-accent transition-colors">Quizzes</a></li>
              <li><a href="#resources" className="text-primary-foreground/80 hover:text-hero-accent transition-colors">Learning Resources</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-hero-accent" />
                <span className="text-primary-foreground/80 text-sm">nacos@jabu.edu.ng</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-hero-accent" />
                <span className="text-primary-foreground/80 text-sm">+234 813 926 1960</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-hero-accent" />
                <span className="text-primary-foreground/80 text-sm">+234 805 798 3551</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-hero-accent" />
                <span className="text-primary-foreground/80 text-sm">JABU Campus, Ikeji-Arakeji</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 NACOS JABU Chapter. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm mt-2">
            Made by{" "}
            <Link 
              to="/executive-chairman" 
              className="font-bold text-hero-accent hover:text-hero-accent/80 transition-colors"
            >
              ECM
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;