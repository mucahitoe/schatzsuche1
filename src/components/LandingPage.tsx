import React from 'react';
import { Menu, X, ArrowRight, Play, CheckCircle, LayoutDashboard } from 'lucide-react';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

interface LandingPageProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  showRegister: boolean;
  setShowRegister: (show: boolean) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  showRegister,
  setShowRegister,
  showLogin,
  setShowLogin,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Innovate</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
                <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 text-white/90 hover:text-white transition-colors flex items-center"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard Login
                </button>
                <button 
                  onClick={() => setShowRegister(true)}
                  className="px-6 py-2 bg-white text-purple-900 rounded-full font-semibold hover:bg-purple-100 transition-colors"
                >
                  Register Now
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-white/70 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg border-b border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#about" className="block px-3 py-2 text-white/70 hover:text-white transition-colors">About</a>
              <button 
                onClick={() => setShowLogin(true)}
                className="w-full text-left px-3 py-2 text-white/70 hover:text-white transition-colors flex items-center"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard Login
              </button>
              <button 
                onClick={() => setShowRegister(true)}
                className="w-full text-left px-3 py-2 text-white/70 hover:text-white transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Ideas Into Reality
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Unleash your creativity with our powerful platform. Build, innovate, and scale your projects with ease.
            </p>
            <button 
              onClick={() => setShowRegister(true)}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              Get Started <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-white/70">Experience the difference with our cutting-edge solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Lightning Fast', description: 'Optimized for speed and performance' },
              { title: 'Highly Secure', description: 'Enterprise-grade security built-in' },
              { title: 'Always Available', description: '99.9% uptime guaranteed' }
            ].map((feature, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl">
                <CheckCircle className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden glass-effect">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                <Play className="w-12 h-12 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-white/70">&copy; 2024 Innovate. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default LandingPage;