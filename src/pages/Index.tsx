import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award, MapPin, BookOpen, Users, Menu, X, ArrowRight, Globe, Sparkles, ShieldCheck, Zap, Activity, ArrowUpRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"telemetry" | "rewards" | "ecomap" | "community">("telemetry");

  const pillars = [
    {
      id: "telemetry",
      num: "01",
      title: "Carbon Telemetry",
      subtitle: "Precision Footprint Analytics",
      description: "Real-time personal emission telemetry tracking commute, energy, and diet with precision carbon calculations.",
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      cta: "Launch Tracker",
      link: "/tracker",
      stats: "1.2M+ kg CO₂ Logged"
    },
    {
      id: "rewards",
      num: "02",
      title: "Eco-Points Protocol",
      subtitle: "Sustainable Action Rewards",
      description: "Earn digital Eco-Points for verified daily carbon reductions and redeem them for real-world sustainable goods.",
      icon: <Award className="w-6 h-6 text-teal-400" />,
      cta: "Explore Rewards",
      link: "/rewards",
      stats: "450k+ Points Awarded"
    },
    {
      id: "ecomap",
      num: "03",
      title: "Planetary EcoMap",
      subtitle: "Geospatial Green Locator",
      description: "Interactive directory locating nearby zero-waste hubs, solar charging stations, and local recycling partners.",
      icon: <MapPin className="w-6 h-6 text-cyan-400" />,
      cta: "View Map",
      link: "/ecomap",
      stats: "1,200+ Verified Hubs"
    },
    {
      id: "community",
      num: "04",
      title: "NGO & Community Hub",
      subtitle: "Collective Grassroots Impact",
      description: "Connect with environmental NGOs, participate in tree-planting rallies, and organize community cleanups.",
      icon: <Users className="w-6 h-6 text-emerald-300" />,
      cta: "Join Events",
      link: "/events",
      stats: "150+ Global Campaigns"
    }
  ];

  const metrics = [
    { label: "CO₂ Reduced", value: "1.42M kg", change: "+24% this month" },
    { label: "Active Stewards", value: "88,400+", change: "Across 62 countries" },
    { label: "NGO Partners", value: "450+", change: "Verified environmental orgs" },
    { label: "Eco-Points Issued", value: "2.8M+", change: "Redeemed for impact" }
  ];

  const partners = [
    { name: "Clean Earth Foundation", code: "CEF" },
    { name: "Future Forest Alliance", code: "FFA" },
    { name: "Ocean Guardians Intl", code: "OGI" },
    { name: "Zero Waste Global", code: "ZWG" },
    { name: "Renewable Energy Union", code: "REU" }
  ];

  return (
    <div className="min-h-screen bg-[#070B0E] text-white selection:bg-emerald-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Igloo Inc Ambient Background Spotlights & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px]" />
        {/* Fine grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Floating Glass Pill Header Navbar */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-[#070B0E]/70 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/40 p-[2px] flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-all">
              <Leaf className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest font-mono uppercase bg-gradient-to-r from-white via-emerald-100 to-teal-300 bg-clip-text text-transparent">
                ECOTRACK
              </span>
              <span className="text-[9px] font-mono text-emerald-400/80 -mt-1 tracking-wider uppercase">
                Planetary Decarbonization Protocol
              </span>
            </div>
          </Link>

          {/* Nav items */}
          <nav className="hidden md:flex items-center space-x-1 bg-zinc-900/80 border border-emerald-500/20 rounded-full px-5 py-2 backdrop-blur-md">
            <a href="#ecosystem" className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-emerald-400 transition-colors">Ecosystem</a>
            <a href="#telemetry" className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-emerald-400 transition-colors">Telemetry</a>
            <a href="#metrics" className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-emerald-400 transition-colors">Impact</a>
            <a href="#partners" className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-emerald-400 transition-colors">Partners</a>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full text-xs font-mono uppercase tracking-wider">
                Sign In
              </Button>
            </Link>
            <Link to="/tracker">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-bold rounded-full px-6 text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                Launch App
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button 
            className="md:hidden p-2 text-zinc-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-zinc-950 border border-emerald-500/30 rounded-2xl space-y-3 font-mono text-xs">
            <a href="#ecosystem" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-zinc-300 hover:text-emerald-400">Ecosystem</a>
            <a href="#telemetry" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-zinc-300 hover:text-emerald-400">Telemetry</a>
            <a href="#metrics" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-zinc-300 hover:text-emerald-400">Impact</a>
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-zinc-800 text-zinc-300">Sign In</Button>
              </Link>
              <Link to="/tracker" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-emerald-500 text-zinc-950 font-bold">Launch App</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Mission Statement Section (Igloo.inc Style with ECOTRACK name) */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          ECOTRACK // PLANETARY DECARBONIZATION PROTOCOL
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] max-w-5xl mx-auto">
          OUR MISSION IS TO CREATE THE LARGEST{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
            ECOTRACK COMMUNITY
          </span>
          , DRIVING THE CONSUMER SUSTAINABILITY REVOLUTION.
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-sans">
          EcoTrack empowers individuals, NGOs, and enterprises with real-time carbon telemetry, automated rewards, and geospatial eco-infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/tracker">
            <Button className="h-13 px-8 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-bold text-sm uppercase tracking-wider rounded-full shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 flex items-center gap-2">
              <span>Start Footprint Telemetry</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" className="h-13 px-8 border-emerald-500/30 hover:border-emerald-500/60 bg-zinc-900/60 text-white font-mono text-xs uppercase tracking-wider rounded-full backdrop-blur-md">
              Create Steward Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Live Telemetry Metrics Strip */}
      <section id="metrics" className="relative z-10 py-12 border-y border-emerald-500/20 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1 text-center md:text-left border-l border-emerald-500/20 pl-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">{m.label}</div>
              <div className="text-3xl sm:text-4xl font-black font-mono bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-[11px] font-mono text-emerald-400">{m.change}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem Pillars Grid (Igloo Inc Core Flow) */}
      <section id="ecosystem" className="relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase text-emerald-400 tracking-widest mb-2">// ECOSYSTEM COMPONENTS</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              The EcoTrack Infrastructure
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            Four integrated pillars driving personal accountability, gamified sustainability, and grassroots climate action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <Card key={p.id} className="bg-zinc-950/70 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 p-2 text-white group flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-emerald-400/80 tracking-widest">{p.num} // PILLAR</span>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-emerald-500/30 group-hover:border-emerald-400 transition-colors">
                    {p.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold uppercase tracking-wide text-white group-hover:text-emerald-300 transition-colors">
                  {p.title}
                </CardTitle>
                <div className="text-xs font-mono text-emerald-400">{p.subtitle}</div>
                <CardDescription className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  {p.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">{p.stats}</span>
                <Link to={p.link}>
                  <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 p-0">
                    <span>{p.cta}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Feature Showcase Section */}
      <section id="telemetry" className="relative z-10 py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-zinc-950/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// INTERACTIVE PROTOCOL PREVIEW</div>
              <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
                Planetary Impact Control Engine
              </h3>
            </div>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 bg-zinc-900 p-1.5 rounded-full border border-zinc-800 font-mono text-xs">
              {(["telemetry", "rewards", "ecomap", "community"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full uppercase transition-all ${
                    activeTab === tab
                      ? "bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              {activeTab === "telemetry" && (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                    <Activity className="w-3.5 h-3.5" /> PRECISION EMISSION CALCULATOR
                  </div>
                  <h4 className="text-3xl font-bold uppercase tracking-tight text-white">
                    Measure. Minimize. Master.
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Our carbon telemetry engine calculates commute factors, electric grid intensity, and dietary footprints in real-time, giving you instant actionable daily targets.
                  </p>
                  <ul className="space-y-3 font-mono text-xs text-zinc-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Climatiq API emission factor mapping
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24-Hour streak validation & historical trend graphs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct MongoDB Atlas cloud storage backup
                    </li>
                  </ul>
                  <Link to="/tracker">
                    <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider rounded-full px-6 py-5">
                      Open Carbon Tracker
                    </Button>
                  </Link>
                </>
              )}

              {activeTab === "rewards" && (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-mono">
                    <Award className="w-3.5 h-3.5" /> ECO-POINTS REWARD MARKET
                  </div>
                  <h4 className="text-3xl font-bold uppercase tracking-tight text-white">
                    Turn Sustainability into Value.
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Every kg of CO₂ avoided yields Eco-Points. Redeem your accrued points for sustainable lifestyle products, tree planting certificates, and eco-brand vouchers.
                  </p>
                  <ul className="space-y-3 font-mono text-xs text-zinc-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" /> Instant point updates on footprint improvements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" /> Verified sustainable product catalog
                    </li>
                  </ul>
                  <Link to="/rewards">
                    <Button className="bg-teal-400 hover:bg-teal-300 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider rounded-full px-6 py-5">
                      View Eco-Store
                    </Button>
                  </Link>
                </>
              )}

              {activeTab === "ecomap" && (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                    <MapPin className="w-3.5 h-3.5" /> GEOSPATIAL GREEN NETWORK
                  </div>
                  <h4 className="text-3xl font-bold uppercase tracking-tight text-white">
                    Map Your Local Sustainable World.
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Locate recycling centers, community gardens, zero-waste stores, and active NGO headquarters across your city using our interactive Leaflet map.
                  </p>
                  <Link to="/ecomap">
                    <Button className="bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider rounded-full px-6 py-5">
                      Explore EcoMap
                    </Button>
                  </Link>
                </>
              )}

              {activeTab === "community" && (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                    <Users className="w-3.5 h-3.5" /> NGO & EVENT HUB
                  </div>
                  <h4 className="text-3xl font-bold uppercase tracking-tight text-white">
                    Unite for Collective Action.
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Organize, manage, and attend grassroots environmental events. NGO partners can broadcast campaigns, manage volunteers, and track total campaign footprint impact.
                  </p>
                  <Link to="/events">
                    <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider rounded-full px-6 py-5">
                      Join Active Events
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Interactive Preview Mock Container */}
            <div className="lg:col-span-6 bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 font-mono text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  protocol://ecotrack.app/dashboard
                </span>
                <span>STATUS: ACTIVE</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Daily Telemetry Status</span>
                    <span className="text-emerald-400 font-bold">14.2 kg CO₂e</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-3/4 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500">Commute Output</div>
                    <div className="text-lg font-bold text-emerald-300">6.3 kg</div>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500">Eco-Points Earned</div>
                    <div className="text-lg font-bold text-teal-300">+120 pts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Partners Grid */}
      <section id="partners" className="relative z-10 py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-mono uppercase text-emerald-400 tracking-widest">// PARTNER ECOSYSTEM</div>
          <h3 className="text-2xl font-bold uppercase tracking-tight text-white">Backed by Leading Sustainability Organizations</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {partners.map((p, idx) => (
            <div key={idx} className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-center backdrop-blur-md hover:border-emerald-500/40 transition-colors">
              <div className="text-xs font-mono font-bold text-emerald-400 tracking-widest">{p.code}</div>
              <div className="text-xs text-zinc-300 mt-1 font-medium">{p.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer Banner (Igloo Inc Style) */}
      <section className="relative z-10 py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-950/80 via-zinc-950 to-teal-950/80 border border-emerald-500/40 rounded-3xl p-10 text-center space-y-6 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white max-w-3xl mx-auto">
            Ready to Join the EcoTrack Sustainability Revolution?
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto font-sans">
            Start tracking your daily footprint, earn rewards, and contribute to global decarbonization today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/30">
                Create Account Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="h-12 px-8 border-zinc-700 text-zinc-300 hover:text-white rounded-full font-mono text-xs uppercase tracking-wider">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-emerald-500/20 text-center font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300 font-bold">ECOTRACK PROTOCOL</span>
          </div>
          <div>© 2026 EcoTrack Inc. All rights reserved. Planetary Decarbonization System.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
