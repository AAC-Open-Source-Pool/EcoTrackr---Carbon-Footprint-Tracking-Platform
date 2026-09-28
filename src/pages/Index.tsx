import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award, MapPin, BookOpen, Users, Menu, X, ChevronLeft, ChevronRight, ArrowRight, Globe, Sparkles, ShieldCheck } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-emerald-400" />,
      title: "Track Carbon Footprint",
      description: "Monitor daily activities and calculate your exact environmental impact with real-time analytics."
    },
    {
      icon: <Award className="h-6 w-6 text-emerald-400" />,
      title: "Redeem Eco-Points",
      description: "Earn points for verified sustainable actions and redeem them for genuine eco-friendly rewards."
    },
    {
      icon: <MapPin className="h-6 w-6 text-emerald-400" />,
      title: "Eco-Friendly Map",
      description: "Locate nearby sustainable businesses, recycling hubs, and active environmental NGOs."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-emerald-400" />,
      title: "Interactive Quizzes",
      description: "Expand your environmental literacy with gamified quizzes, guides, and daily sustainability tips."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Environmental Advocate",
      content: "EcoTrackr helped me reduce my carbon footprint by 40% in just 3 months. The point system makes sustainability engaging and rewarding!",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Community Organizer",
      content: "Love how effortless it is to track my daily actions. The rewards keep our entire team motivated to make better choices.",
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Sustainability Researcher",
      content: "The EcoMap feature helped me discover amazing local sustainable businesses I never knew existed in my area.",
      avatar: "EJ"
    },
    {
      name: "David Park",
      role: "Climate Tech Specialist",
      content: "The quizzes are educational and community events connect me with like-minded change makers. Highly recommended!",
      avatar: "DP"
    }
  ];

  const partners = [
    { name: "Clean Earth", icon: "🌱" },
    { name: "Future Forest", icon: "🌲" },
    { name: "Ocean Guardians", icon: "🌊" },
    { name: "Zero Waste Co", icon: "♻️" },
    { name: "Renewable Alliance", icon: "⚡" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Parallax background handler
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (videoWrapRef.current) {
        videoWrapRef.current.style.transform = `translateY(${y * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#06140e] text-white selection:bg-emerald-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Background Video with Parallax & Asymmetric Scrim */}
      <div ref={videoWrapRef} className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden pointer-events-none will-change-transform">
        <video
          className="w-full h-full object-cover opacity-60 scale-105 transition-all duration-1000"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/eco-bg-poster.jpg"
        >
          <source src="/videos/eco-bg-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
          <source src="/videos/eco-bg.mp4" type="video/mp4" media="(min-width: 641px)" />
          <source src="https://cdn.coverr.co/videos/coverr-green-leaves-1577/1080p.mp4" type="video/mp4" media="(min-width: 1024px)" />
          <source src="https://cdn.coverr.co/videos/coverr-green-leaves-1577/720p.mp4" type="video/mp4" media="(max-width: 1023px)" />
        </video>
        {/* Layered Emerald Deep Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030d09]/95 via-[#061710]/80 to-[#020b07]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06140e] via-transparent to-[#030d09]/70" />
      </div>

      {/* Floating Hairline Accent Grid */}
      <div className="fixed inset-0 pointer-events-none -z-5 flex justify-between px-[15%] opacity-15">
        <div className="w-[1px] bg-emerald-400/30" />
        <div className="w-[1px] bg-emerald-400/20" />
        <div className="w-[1px] bg-emerald-400/30" />
      </div>

      {/* Glass Navigation Capsule */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-md bg-[#06140e]/60 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-[#06140e] rounded-full flex items-center justify-center">
                <Leaf className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-emerald-400">
              EcoTrackr
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-lg">
            <a href="#about" className="px-4 py-1.5 text-sm font-medium text-emerald-100/80 hover:text-white hover:bg-white/10 rounded-full transition-all">About</a>
            <a href="#features" className="px-4 py-1.5 text-sm font-medium text-emerald-100/80 hover:text-white hover:bg-white/10 rounded-full transition-all">Features</a>
            <a href="#impact" className="px-4 py-1.5 text-sm font-medium text-emerald-100/80 hover:text-white hover:bg-white/10 rounded-full transition-all">Impact</a>
            <a href="#contact" className="px-4 py-1.5 text-sm font-medium text-emerald-100/80 hover:text-white hover:bg-white/10 rounded-full transition-all">Contact</a>
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-emerald-200 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold rounded-full px-6 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-emerald-200 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Sheet */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#0a2017]/95 border border-white/10 rounded-2xl backdrop-blur-xl space-y-3">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-emerald-200 hover:text-white rounded-lg hover:bg-white/5">About</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-emerald-200 hover:text-white rounded-lg hover:bg-white/5">Features</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-emerald-200 hover:text-white rounded-lg hover:bg-white/5">Contact</a>
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/20">Sign In</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-emerald-500 text-black font-semibold">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-8 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          {/* Note Badge */}
          <div className="inline-flex items-center space-x-2 border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-300 backdrop-blur-md">
            <Globe className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>Global Action Hub • Empowering Sustainable Living</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Technology <br />
            Crafted for <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">Planet Earth</span> <br />
            Not <span className="font-serif italic font-normal text-emerald-300">Pollution</span>
          </h1>

          {/* Lede Subtitle */}
          <p className="text-lg sm:text-xl text-emerald-100/75 max-w-xl leading-relaxed font-normal">
            Transform your daily habits into measurable climate action. Track your carbon footprint, 
            earn genuine rewards, and join a community preserving our future.
          </p>

          {/* CTA & Proof Row */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Link to="/signup">
              <Button className="group bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-black font-bold text-base px-7 py-6 rounded-full shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 flex items-center space-x-3">
                <span>Get Started Free</span>
                <span className="h-8 w-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4 text-black" />
                </span>
              </Button>
            </Link>

            {/* Proof Face Pile */}
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 border-2 border-[#06140e] flex items-center justify-center text-xs font-bold text-black">SC</div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-300 border-2 border-[#06140e] flex items-center justify-center text-xs font-bold text-black">MR</div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-green-400 to-emerald-300 border-2 border-[#06140e] flex items-center justify-center text-xs font-bold text-black">EJ</div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-[#06140e] flex items-center justify-center text-xs font-bold text-black">+</div>
              </div>
              <div className="text-xs text-emerald-200/80">
                <strong className="block text-white font-semibold">650+ Active Members</strong>
                Live Tracking Enabled
              </div>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="grid sm:grid-cols-2 gap-4 pt-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
              <span className="absolute top-3 right-4 text-xs font-mono text-emerald-400/60">*</span>
              <div className="text-3xl font-extrabold text-white tracking-tight">150k+</div>
              <div className="text-xs text-emerald-200/70 mt-1 font-medium">Tons CO₂ Emissions Saved</div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-teal-950/20 border border-emerald-500/20 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
              <span className="absolute top-3 right-4 text-xs font-mono text-emerald-400/60">*</span>
              <div className="text-3xl font-extrabold text-emerald-300 tracking-tight">98%</div>
              <div className="text-xs text-emerald-200/70 mt-1 font-medium">Verified User Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Ghost Analytics Panel (Right Column on Large Viewports) */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-end justify-between border-b border-white/10 pb-6">
              <div className="flex items-end space-x-2.5 h-20">
                <span className="w-3 bg-emerald-500/40 rounded-t h-[40%]" />
                <span className="w-3 bg-emerald-500/60 rounded-t h-[65%]" />
                <span className="w-3 bg-emerald-400/80 rounded-t h-[50%]" />
                <span className="w-3 bg-emerald-400 rounded-t h-[85%]" />
                <span className="w-3 bg-teal-300 rounded-t h-[100%]" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-emerald-300 tracking-tight block">+42%</span>
                <span className="text-xs text-emerald-200/70">Efficiency Gain</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <span>Real-Time Impact Metrics</span>
              </h3>
              <p className="text-xs text-emerald-100/70 mt-2 leading-relaxed">
                Our algorithmic engine measures personal action milestones, converting everyday sustainable habits into clear carbon reduction indices.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-emerald-200/60 border-t border-white/5">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified Data Engine</span>
              </span>
              <span>Updated Live</span>
            </div>
          </div>
        </div>
      </section>

      {/* About EcoTrackr Section */}
      <section id="about" className="py-24 px-4 sm:px-8 border-t border-white/5 bg-[#040f0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1">
              About Our Mission
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Empowering Collective Climate Action
            </h2>
            <p className="text-base sm:text-lg text-emerald-100/75 leading-relaxed">
              Climate change demands immediate personal engagement. EcoTrackr equips individuals and organizations 
              with intelligent tools to measure, reduce, and eliminate environmental footprints.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:border-emerald-500/40 transition-all">
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Leaf className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl text-white">Personal Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-emerald-100/75 leading-relaxed">
                Small, consistent choices aggregate into substantial carbon footprint reductions over time.
              </CardContent>
            </Card>

            <Card className="bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:border-emerald-500/40 transition-all">
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4 text-teal-400">
                  <Users className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl text-white">Community Power</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-emerald-100/75 leading-relaxed">
                Connect with eco-conscious peers, participate in local cleanup events, and amplify global awareness.
              </CardContent>
            </Card>

            <Card className="bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:border-emerald-500/40 transition-all">
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  <Award className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl text-white">Rewarding Journey</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-emerald-100/75 leading-relaxed">
                Earn eco-points for every logged sustainable habit and redeem them for genuine eco products and rewards.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1">
            Platform Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Designed for Seamless Sustainability
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/75">
            Discover our comprehensive suite of tools built to guide your eco-friendly lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5"
            >
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-white font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-xs text-emerald-100/75 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section id="impact" className="py-24 px-4 sm:px-8 bg-[#040f0a]/90 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1">
              Member Stories
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Trusted by Climate Champions
            </h2>
          </div>

          <div className="relative p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl">
            <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 text-black font-extrabold text-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              {testimonials[currentTestimonial].avatar}
            </div>
            <p className="text-lg sm:text-xl text-emerald-100 italic leading-relaxed mb-6 font-serif">
              "{testimonials[currentTestimonial].content}"
            </p>
            <div>
              <h4 className="font-bold text-white text-base">{testimonials[currentTestimonial].name}</h4>
              <p className="text-xs text-emerald-400 font-medium">{testimonials[currentTestimonial].role}</p>
            </div>

            {/* Slider Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentTestimonial ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Band with Watermark & Partner Icons */}
      <footer id="contact" className="border-t border-white/10 bg-[#020906] pt-16 pb-12 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Links & Information */}
          <div className="grid md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Leaf className="h-7 w-7 text-emerald-400" />
                <span className="text-2xl font-bold tracking-tight text-white">EcoTrackr</span>
              </div>
              <p className="text-xs text-emerald-100/70 leading-relaxed">
                Transforming everyday choices into measurable climate impact. Built for a cleaner, sustainable tomorrow.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-xs text-emerald-200/70">
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Mission</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Platform Features</a></li>
                <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">User Dashboard</Link></li>
                <li><Link to="/events" className="hover:text-emerald-400 transition-colors">Eco Events</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Support & Contact</h4>
              <ul className="space-y-2.5 text-xs text-emerald-200/70">
                <li>support@ecotrackr.com</li>
                <li>Hyderabad, Telangana, India</li>
                <li>Live Support Available 24/7</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Join Revolution</h4>
              <p className="text-xs text-emerald-200/70 mb-4">Start tracking your carbon footprint today.</p>
              <Link to="/signup">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-full">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Bottom Bar with Low-Opacity Watermark & Partners */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            <div className="text-4xl sm:text-6xl font-extrabold text-white/5 tracking-tighter select-none">
              ECOTRACKR
            </div>

            {/* Partners List */}
            <div className="flex items-center space-x-6">
              <span className="text-xs text-emerald-200/50 font-medium">Our NGO Partners:</span>
              <div className="flex flex-wrap gap-4 items-center">
                {partners.map((partner, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-xs text-emerald-100/80 font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <span>{partner.icon}</span>
                    <span>{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-emerald-200/40">
            &copy; {new Date().getFullYear()} EcoTrackr. All rights reserved. Built for a sustainable future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
