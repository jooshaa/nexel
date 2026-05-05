import { Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandYoutube, IconBrandTwitter } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          
          {/* Links Sections - Left Side */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Support */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Support</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">User Guide</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">International Warranty</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Safety Notice</a></li>
              </ul>
            </div>

            {/* About Us */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">About Us</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Nexel</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Leadership Team</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">User Agreement</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Integrity & Compliance</a></li>
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div className="space-y-8 col-span-2 md:col-span-1">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Follow Nexel</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <IconBrandFacebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <IconBrandInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <IconBrandYoutube className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <IconBrandTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-white">Subscribe to our newsletter</p>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter email address"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section - Right Side (taking about 1.5/2 parts) */}
          <div className="w-full lg:w-[40%] h-[400px] relative rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=69.27%2C41.31%2C69.28%2C41.32&layer=mapnik&marker=41.315%2C69.275"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(1.2) grayscale(1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
            
            <div className="absolute bottom-6 left-6 bg-[#1a1a1a]/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-xl max-w-[240px]">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="w-4 h-4 text-[#043927]" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Nexel Flagship</h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                г.Ташкент, ул.Матбуотчилар (Сайилгох), A101
              </p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-white hover:underline">
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            <p>© {new Date().getFullYear()} Nexel. All rights reserved.</p>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <div className="flex items-center space-x-2">
            <span>Global / English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
