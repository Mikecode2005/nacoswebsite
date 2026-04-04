import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">N</span>
              </div>
              <div>
                <div className="font-bold text-xl">NACOS</div>
                <div className="text-xs opacity-80">JABU CHAPTER</div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Empowering the next generation of tech innovators.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com/nacos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/nacos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/nacos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/in/nacos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
              <li><Link to="/quizzes" className="hover:text-accent">Quizzes</Link></li>
              <li><Link to="/past-questions" className="hover:text-accent">Past Questions</Link></li>
              <li><Link to="/executives" className="hover:text-accent">Executives</Link></li>
              <li><Link to="/events" className="hover:text-accent">Events</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                nacos@jabu.edu.ng
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                +234 813 926 1960
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                JABU Campus
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="hover:text-accent">Learning Resources</Link></li>
              <li><Link to="/gallery" className="hover:text-accent">Gallery</Link></li>
              <li><Link to="/tech-giants" className="hover:text-accent">Alumni Tech Giants</Link></li>
              <li><Link to="/sports" className="hover:text-accent">Sports</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          © 2025 NACOS JABU Chapter. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
