import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 text-gray-600">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12">

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">About MindCare</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              MindCare Hospital provides compassionate mental health services with experienced psychiatrists, psychologists, 
              and wellness specialists. We focus on personalized care to support mental well-being for everyone.
            </p>
          </div>

          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Contact Us</h2>
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-[#5faea0] mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 text-sm">
                123 MindCare Street, Wellness City, Health District 560001
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#5faea0]" />
              <a href="tel:+919876543210" className="text-gray-600 hover:text-[#5faea0] transition-colors text-sm">
                +91 98765 43210
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#5faea0]" />
              <a href="mailto:support@mindcare.com" className="text-gray-600 hover:text-[#5faea0] transition-colors text-sm">
                support@mindcare.com
              </a>
            </div>
          </div>

        
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Follow Us</h2>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full text-white hover:bg-blue-500 hover:scale-105 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full text-white hover:bg-blue-800 hover:scale-105 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
 
        <div className="border-t border-gray-200 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 MindCare Hospital. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
            <a href="/privacy" className="hover:text-[#5faea0] transition-colors">Privacy Policy</a>
            <span className="text-gray-300">•</span>
            <a href="/terms" className="hover:text-[#5faea0] transition-colors">Terms of Service</a>
            <span className="text-gray-300">•</span>
            <a href="/cookies" className="hover:text-[#5faea0] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
