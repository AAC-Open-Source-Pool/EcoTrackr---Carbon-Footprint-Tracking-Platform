import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award, MapPin, BookOpen, Users, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Track Carbon Footprint",
      description: "Monitor your daily activities and calculate your environmental impact with precision."
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Redeem Eco-Points",
      description: "Earn points for sustainable actions and redeem them for eco-friendly rewards."
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: "Discover Eco-Friendly Shops & NGOs",
      description: "Find nearby sustainable businesses and environmental organizations."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Learn with Quizzes & Tips",
      description: "Expand your environmental knowledge with interactive content and daily tips."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Environmental Advocate",
      content: "EcoTrackr helped me reduce my carbon footprint by 40% in just 3 months. The point system makes sustainability fun!",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Student",
      content: "Love how easy it is to track my daily eco-actions. The rewards keep me motivated to make better choices.",
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Working Professional",
      content: "The EcoMap feature helped me discover amazing local sustainable businesses I never knew existed.",
      avatar: "EJ"
    },
    {
      name: "David Park",
      role: "Climate Enthusiast",
      content: "The quizzes are educational and the community events connect me with like-minded people. Highly recommend!",
      avatar: "DP"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Parallax effect for background video
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (videoWrapRef.current) {
        videoWrapRef.current.style.transform = `translateY(${y * 0.2}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen hero-neo relative">
      {/* Video Background with parallax */}
      <div ref={videoWrapRef} className="fixed inset-0 -z-10 overflow-hidden will-change-transform">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/eco-bg-poster.jpg"
        >
          {/* Prefer local mobile source on small screens */}
          <source src="/videos/eco-bg-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
          {/* Local desktop fallback if provided */}
          <source src="/videos/eco-bg.mp4" type="video/mp4" media="(min-width: 641px)" />
          {/* Remote fallbacks */}
          <source src="https://cdn.coverr.co/videos/coverr-green-leaves-1577/1080p.mp4" type="video/mp4" media="(min-width: 1024px)" />
          <source src="https://cdn.coverr.co/videos/coverr-green-leaves-1577/720p.mp4" type="video/mp4" media="(max-width: 1023px)" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-emerald-950/70" />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">EcoTrackr</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-green-600 hover:bg-green-700">
                  Sign Up
                </Button>
              </Link>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-green-600">About</a>
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-green-600">Features</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-green-600">Contact</a>
              <div className="flex space-x-2 px-3 py-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-green-600 text-green-600">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 eco-float relative">
        <span className="spark"/>
        <span className="spark"/>
        <span className="spark"/>
        <div className="eco-bubble">🌿</div>
        <div className="eco-bubble">🌎</div>
        <div className="eco-bubble">🌊</div>
        <div className="eco-bubble">🌱</div>
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
            🌱 Join the Sustainable Revolution
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold neon-title mb-6">
            Track. Act. Earn.
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-green-200 mb-8">
            EcoTrackr – Your Sustainable Living Companion
          </h2>
          <p className="text-xl text-green-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your daily habits into meaningful climate action. Track your carbon footprint, 
            earn rewards for sustainable choices, and connect with a community committed to preserving our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="glass-btn text-lg px-8 py-4 hover-scale">
                Join Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="bg-white text-green-700 border-white hover:bg-white/90 hover:text-green-800 text-lg px-8 py-4 shadow">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* About EcoTrackr */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About EcoTrackr</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Climate change is one of the greatest challenges of our time. Every action matters, and EcoTrackr 
              empowers individuals to make a measurable difference. Our mission is to make sustainable living 
              accessible, rewarding, and impactful for everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Individual Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Every small action contributes to a larger movement for environmental change.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Community Power</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Together, we can create a sustainable future through collective action.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Rewarding Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Making sustainable choices should be rewarding and enjoyable.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features (glass theme) */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-50 mb-6">Core Features</h2>
            <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto">
              Discover the tools that make sustainable living simple, engaging, and rewarding.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/10"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100/70 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-emerald-50">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-emerald-100/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of eco-conscious individuals making a difference.</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-green-600 font-bold text-xl">
                    {testimonials[currentTestimonial].avatar}
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-green-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </CardContent>
            </Card>
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-green-500" />
                <span className="text-2xl font-bold">EcoTrackr</span>
              </div>
              <p className="text-gray-400">
                Making sustainable living accessible and rewarding for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-green-500 transition-colors">About</a></li>
                <li><a href="#features" className="hover:text-green-500 transition-colors">Features</a></li>
                <li><Link to="/dashboard" className="hover:text-green-500 transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@ecotrackr.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Hyderabad, India</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoTrackr. All rights reserved. Built for a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
