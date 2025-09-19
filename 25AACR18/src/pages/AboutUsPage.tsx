import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Target, Lightbulb, Cog, Trophy, Mail, MessageSquare } from "lucide-react";


const AboutUsPage = () => {
  const techStack = [
    "React", "TypeScript", "Tailwind CSS", "Node.js", "Supabase", 
    "Google Maps API", "Chart.js", "Progressive Web App"
  ];

  const achievements = [
    { metric: "50,000+", description: "Active Users" },
    { metric: "2M kg", description: "CO₂ Reduced" },
    { metric: "100+", description: "Partner NGOs" },
    { metric: "500+", description: "Events Organized" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">About EcoTrackr</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Empowering individuals and communities to track, reduce, and offset their carbon footprint 
            while building a sustainable future together.
          </p>
        </div>

        {/* Our Mission */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              To democratize environmental action by making carbon tracking accessible, engaging, and rewarding. 
              We believe that small, consistent actions by millions of people can create massive positive change 
              for our planet. Our mission is to bridge the gap between environmental awareness and meaningful action 
              through technology, community, and gamification.
            </p>
          </CardContent>
        </Card>

        {/* Why We Started */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Why We Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">The Problem</h3>
                <p className="text-muted-foreground">
                  Climate change is accelerating, but many people feel overwhelmed and don't know where to start. 
                  Traditional environmental solutions often lack personal relevance and immediate feedback.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Our Solution</h3>
                <p className="text-muted-foreground">
                  We created EcoTrackr to make environmental action personal, measurable, and rewarding. 
                  By gamifying sustainability, we turn climate action into an engaging, social experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Do */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cog className="h-6 w-6 text-primary" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Carbon Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Easy-to-use tools for monitoring your daily carbon footprint across transportation, energy, and lifestyle choices.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Gamification</h3>
                <p className="text-sm text-muted-foreground">
                  Earn eco-points, unlock achievements, and compete with friends to make sustainability fun and engaging.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Community Building</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with like-minded individuals, share success stories, and participate in local environmental initiatives.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about climate science, sustainable practices, and actionable steps through interactive content and quizzes.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Local Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Find eco-friendly businesses, NGOs, and events in your area through our integrated mapping system.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Rewards System</h3>
                <p className="text-sm text-muted-foreground">
                  Redeem earned points for eco-friendly products, services, and experiences from our partner network.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tech Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Built with modern, sustainable technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements So Far */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Achievements So Far
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{achievement.metric}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact & Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Contact & Feedback
            </CardTitle>
            <CardDescription>
              We'd love to hear from you! Share your thoughts, suggestions, or questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>
                    <a href="mailto:hello@ecotrackr.com" className="text-primary hover:underline ml-2">
                      hello@ecotrackr.com
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Support:</span>
                    <a href="mailto:support@ecotrackr.com" className="text-primary hover:underline ml-2">
                      support@ecotrackr.com
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Partnerships:</span>
                    <a href="mailto:partners@ecotrackr.com" className="text-primary hover:underline ml-2">
                      partners@ecotrackr.com
                    </a>
                  </div>
                  <div className="pt-4">
                    <span className="font-medium">Follow Us:</span>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">Twitter</Button>
                      <Button variant="outline" size="sm">LinkedIn</Button>
                      <Button variant="outline" size="sm">Instagram</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                  </div>
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your message..." rows={4} />
                  <Button type="submit" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AboutUsPage;