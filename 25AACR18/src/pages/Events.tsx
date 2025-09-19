
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, Users, Award, Star, Check, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  const events = [
    {
      id: 1,
      title: "Community River Cleanup",
      description: "Join us to clean up the riverside and learn about local ecosystems",
      category: "cleanup",
      points: 100,
      location: "Main Street River Bank",
      date: "June 2, 2025",
      time: "9:00 AM - 12:00 PM",
      organizer: "Clean Earth Initiative",
      participants: 24,
      capacity: 50,
      image: "🏞️",
      details: "Help us remove trash and invasive species from our local river ecosystem. Gloves, bags, and tools will be provided. Wear comfortable clothes and bring a reusable water bottle."
    },
    {
      id: 2,
      title: "Sustainable Cooking Workshop",
      description: "Learn to cook delicious meals with locally sourced, seasonal ingredients",
      category: "workshop",
      points: 75,
      location: "Downtown Community Center",
      date: "June 15, 2025",
      time: "6:00 PM - 8:30 PM",
      organizer: "Green Cuisine Collective",
      participants: 18,
      capacity: 20,
      image: "🍳",
      details: "Join Chef Maria for a hands-on cooking class using sustainable ingredients. You'll learn how to reduce food waste, choose eco-friendly ingredients, and create amazing meals with a lower carbon footprint."
    },
    {
      id: 3,
      title: "Urban Tree Planting",
      description: "Help increase the urban tree canopy and improve air quality in our city",
      category: "planting",
      points: 150,
      location: "City Park East",
      date: "June 8, 2025",
      time: "10:00 AM - 2:00 PM",
      organizer: "Future Forest Foundation",
      participants: 35,
      capacity: 100,
      image: "🌳",
      details: "Be part of our initiative to plant 500 native trees across the city. We'll provide training on proper planting techniques, tools, and refreshments. Every participant will receive a certificate of tree stewardship."
    },
    {
      id: 4,
      title: "E-waste Collection Drive",
      description: "Properly dispose of electronic waste and learn about recycling",
      category: "collection",
      points: 50,
      location: "Community College Parking Lot",
      date: "July 3, 2025",
      time: "11:00 AM - 4:00 PM",
      organizer: "TechRecycle Initiative",
      participants: 12,
      capacity: 200,
      image: "🖥️",
      details: "Bring your old electronics for responsible recycling. We accept computers, phones, TVs, and most electronic devices. Data security guaranteed with on-site hard drive destruction available."
    },
    {
      id: 5,
      title: "Solar Energy Workshop",
      description: "Learn how to incorporate solar energy into your home",
      category: "workshop",
      points: 75,
      location: "Eco Science Center",
      date: "May 31, 2025",
      time: "1:00 PM - 4:00 PM",
      organizer: "Renewable Energy Alliance",
      participants: 28,
      capacity: 30,
      image: "☀️",
      details: "This workshop covers solar basics, system types, costs, incentives, and installation considerations. Includes hands-on demonstration with solar panels and Q&A with industry experts."
    },
    {
      id: 6,
      title: "Bike-to-Work Day Rally",
      description: "Join fellow cyclists to celebrate and promote sustainable transportation",
      category: "community",
      points: 50,
      location: "City Hall Plaza",
      date: "June 20, 2025",
      time: "7:30 AM - 9:00 AM",
      organizer: "Urban Mobility Coalition",
      participants: 45,
      capacity: 150,
      image: "🚲",
      details: "Start your day with our community bike ride! Free breakfast provided for participants, bike safety checks, and giveaways. Learn about city cycling infrastructure plans and meet other bike commuters."
    }
  ];

  const pastEvents = [
    {
      id: 101,
      title: "Earth Day Celebration",
      description: "Community festival featuring eco-vendors, workshops, and activities",
      category: "community",
      earned: 75,
      location: "Central Park",
      date: "April 22, 2025",
      image: "🌎",
      attended: true
    },
    {
      id: 102,
      title: "Native Plant Exchange",
      description: "Swap plants and seeds native to our local ecosystem",
      category: "gardening",
      earned: 50,
      location: "Botanical Gardens",
      date: "May 10, 2025",
      image: "🌱",
      attended: true
    },
    {
      id: 103,
      title: "Ocean Conservation Talk",
      description: "Learn about protecting marine ecosystems from leading experts",
      category: "education",
      earned: 0,
      location: "Marine Institute",
      date: "May 12, 2025",
      image: "🐠",
      attended: false
    }
  ];

  const handleRegisterEvent = (eventId: number) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      toast({
        title: "Successfully Registered!",
        description: "Check your email for event details.",
        className: "bg-green-50 border-green-200",
      });
    }
  };

  const handleSaveEvent = (eventId: number) => {
    if (!savedEvents.includes(eventId)) {
      setSavedEvents([...savedEvents, eventId]);
      toast({
        title: "Event Saved",
        description: "Added to your saved events.",
      });
    } else {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
      toast({
        title: "Event Removed",
        description: "Removed from your saved events.",
      });
    }
  };

  const isEventFull = (event: any) => {
    return event.participants >= event.capacity;
  };

  const isEventSaved = (eventId: number) => {
    return savedEvents.includes(eventId);
  };

  const isEventRegistered = (eventId: number) => {
    return registeredEvents.includes(eventId);
  };

  const getEventStatusBadge = (event: any) => {
    if (isEventFull(event)) {
      return <Badge variant="outline" className="text-yellow-600">Full</Badge>;
    }
    
    const spotsLeft = event.capacity - event.participants;
    if (spotsLeft <= 5) {
      return <Badge className="bg-orange-100 text-orange-800">{spotsLeft} spots left</Badge>;
    }
    
    return <Badge className="bg-green-100 text-green-800">Open</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "cleanup":
        return <Badge className="bg-blue-100 text-blue-800">Cleanup</Badge>;
      case "workshop":
        return <Badge className="bg-purple-100 text-purple-800">Workshop</Badge>;
      case "planting":
        return <Badge className="bg-green-100 text-green-800">Planting</Badge>;
      case "collection":
        return <Badge className="bg-orange-100 text-orange-800">Collection</Badge>;
      case "community":
        return <Badge className="bg-yellow-100 text-yellow-800">Community</Badge>;
      case "education":
        return <Badge className="bg-cyan-100 text-cyan-800">Education</Badge>;
      default:
        return <Badge variant="outline">Event</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Calendar className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events & NGO Collabs</h1>
            <p className="text-gray-600">Participate in environmental activities and earn points</p>
          </div>
        </div>

        {/* Event Tabs */}
        <div className="flex space-x-2 border-b">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("upcoming")}
            className={`${
              activeTab === "upcoming" 
                ? "border-b-2 border-green-600 text-green-600" 
                : ""
            } rounded-none`}
          >
            Upcoming Events
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("registered")}
            className={`${
              activeTab === "registered" 
                ? "border-b-2 border-green-600 text-green-600" 
                : ""
            } rounded-none`}
          >
            My Registrations
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("past")}
            className={`${
              activeTab === "past" 
                ? "border-b-2 border-green-600 text-green-600" 
                : ""
            } rounded-none`}
          >
            Past Events
          </Button>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === "upcoming" && events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between">
                  <div className="flex space-x-3 items-start">
                    <div className="text-4xl">{event.image}</div>
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {getCategoryBadge(event.category)}
                        {getEventStatusBadge(event)}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveEvent(event.id);
                    }}
                    className={isEventSaved(event.id) ? "text-yellow-500" : "text-gray-400"}
                  >
                    <Star className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription className="mt-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{event.participants} registered of {event.capacity} spots</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <span>{event.title}</span>
                      </DialogTitle>
                      <DialogDescription>
                        Organized by {event.organizer}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-center">
                        <div className="text-6xl mb-4">{event.image}</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Date & Time</p>
                            <p className="text-sm text-gray-600">{event.date}, {event.time}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-sm text-gray-600">{event.location}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Award className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Points</p>
                            <p className="text-sm text-gray-600">{event.points} eco-points for participating</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Participants</p>
                            <p className="text-sm text-gray-600">{event.participants} registered of {event.capacity} capacity</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">About This Event</h4>
                        <p className="text-sm text-gray-600">{event.details}</p>
                      </div>

                      <div className="flex justify-end space-x-4 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => handleSaveEvent(event.id)}
                        >
                          {isEventSaved(event.id) ? 'Unsave Event' : 'Save Event'}
                        </Button>
                        <Button
                          onClick={() => {
                            handleRegisterEvent(event.id);
                            setSelectedEvent(event);
                          }}
                          disabled={isEventFull(event) || isEventRegistered(event.id)}
                          className={
                            isEventRegistered(event.id)
                              ? "bg-gray-400"
                              : "bg-green-600 hover:bg-green-700"
                          }
                        >
                          {isEventRegistered(event.id) ? 'Registered' : 'Register Now'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() => {
                    handleRegisterEvent(event.id);
                    setSelectedEvent(event);
                  }}
                  disabled={isEventFull(event) || isEventRegistered(event.id)}
                  className={
                    isEventRegistered(event.id)
                      ? "bg-gray-400"
                      : "bg-green-600 hover:bg-green-700"
                  }
                >
                  {isEventRegistered(event.id) ? 'Registered' : 'Register Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}

          {activeTab === "registered" && (
            <>
              {registeredEvents.length > 0 ? (
                events
                  .filter(event => registeredEvents.includes(event.id))
                  .map(event => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between">
                          <div className="flex space-x-3 items-start">
                            <div className="text-4xl">{event.image}</div>
                            <div>
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {getCategoryBadge(event.category)}
                                <Badge className="bg-blue-100 text-blue-800">Registered</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Award className="h-4 w-4 text-green-500" />
                            <span>{event.points} points on completion</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button variant="outline">
                          Add to Calendar
                        </Button>
                        <Button variant="outline" className="text-red-600">
                          Cancel Registration
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No Registrations Yet</h3>
                  <p className="text-gray-500 mb-6">You haven't registered for any upcoming events</p>
                  <Button
                    onClick={() => setActiveTab("upcoming")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Browse Events
                  </Button>
                </div>
              )}
            </>
          )}

          {activeTab === "past" && pastEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between">
                  <div className="flex space-x-3 items-start">
                    <div className="text-4xl">{event.image}</div>
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {getCategoryBadge(event.category)}
                        {event.attended ? (
                          <Badge className="bg-green-100 text-green-800">Attended</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">Missed</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  {event.earned > 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Award className="h-4 w-4 text-green-500" />
                      <span>{event.earned} points earned</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline">
                  View Photos
                </Button>
                {event.attended && (
                  <Button variant="ghost" className="text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    Certificate
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* NGO Partners */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">NGO Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clean Earth Initiative</CardTitle>
                <CardDescription>Environmental conservation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Working to protect natural habitats and reduce pollution through community action.
                </p>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Future Forest Foundation</CardTitle>
                <CardDescription>Reforestation projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Dedicated to planting trees and restoring forests around the world.
                </p>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ocean Guardians</CardTitle>
                <CardDescription>Marine conservation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Protecting marine ecosystems through education, cleanup, and policy advocacy.
                </p>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Registration Success Dialog */}
        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Registration Successful!</span>
                </DialogTitle>
                <DialogDescription>
                  You're all set for {selectedEvent.title}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">{selectedEvent.date}, {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">{selectedEvent.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  We've sent the event details to your email. Remember to check in when you arrive to earn {selectedEvent.points} eco-points!
                </p>
                
                <div className="flex justify-between">
                  <Button variant="outline">
                    Add to Calendar
                  </Button>
                  <Button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Got It
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Events;
