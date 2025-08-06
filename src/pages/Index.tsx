import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Users, Calendar, MapPin, Clock } from "lucide-react";

const Index = () => {
  const featuredClasses = [
    {
      id: 1,
      title: "Contemporary Flow",
      instructor: "Sarah Mitchell",
      level: "Intermediate",
      duration: "60 min",
      rating: 4.9,
      students: 124,
      image: "/placeholder.svg",
      tags: ["Contemporary", "Expressive", "Flexibility"]
    },
    {
      id: 2,
      title: "Ballet Fundamentals",
      instructor: "Elena Rodriguez",
      level: "Beginner",
      duration: "45 min",
      rating: 4.8,
      students: 89,
      image: "/placeholder.svg",
      tags: ["Ballet", "Technique", "Grace"]
    },
    {
      id: 3,
      title: "Jazz Fusion",
      instructor: "Maya Thompson",
      level: "Advanced",
      duration: "75 min",
      rating: 4.9,
      students: 156,
      image: "/placeholder.svg",
      tags: ["Jazz", "Energy", "Performance"]
    }
  ];

  const instructors = [
    {
      name: "Sarah Mitchell",
      specialty: "Contemporary & Modern",
      experience: "12 years",
      image: "/placeholder.svg",
      bio: "Former principal dancer with National Ballet Company"
    },
    {
      name: "Elena Rodriguez",
      specialty: "Classical Ballet",
      experience: "15 years",
      image: "/placeholder.svg",
      bio: "Royal Academy of Dance certified instructor"
    },
    {
      name: "Maya Thompson",
      specialty: "Jazz & Commercial",
      experience: "8 years",
      image: "/placeholder.svg",
      bio: "Choreographer for major music videos and tours"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <h1 className="text-xl font-bold">DanceAcademy</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-foreground hover:text-primary">Classes</a>
              <a href="#" className="text-foreground hover:text-primary">Instructors</a>
              <a href="#" className="text-foreground hover:text-primary">Programs</a>
              <a href="#" className="text-foreground hover:text-primary">About</a>
              <a href="#" className="text-foreground hover:text-primary">Contact</a>
            </nav>
            <Button>Join Now</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Elevate Your Dance Journey</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn from world-class female instructors in a supportive, professional environment. 
            From ballet to contemporary, discover your passion for movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <Play className="mr-2 h-4 w-4" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Classes
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Classes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClasses.map((class_) => (
              <Card key={class_.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={class_.image} 
                    alt={class_.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary">
                      <Play className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{class_.title}</CardTitle>
                      <CardDescription>with {class_.instructor}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{class_.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {class_.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {class_.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {class_.students}
                      </span>
                    </div>
                    <Badge variant="outline">{class_.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Instructors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted overflow-hidden">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{instructor.name}</CardTitle>
                  <CardDescription>{instructor.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{instructor.experience} experience</p>
                  <p className="text-sm">{instructor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Dance Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Dancing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have transformed their lives through dance
          </p>
          <Button size="lg" variant="secondary" className="px-8">
            Start Your Journey Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">D</span>
                </div>
                <h3 className="font-bold">DanceAcademy</h3>
              </div>
              <p className="text-muted-foreground">
                Empowering dancers of all levels through professional instruction and community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Classes</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Ballet</li>
                <li>Contemporary</li>
                <li>Jazz</li>
                <li>Hip Hop</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Beginner Classes</li>
                <li>Advanced Training</li>
                <li>Teacher Certification</li>
                <li>Workshops</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  123 Dance Street, City
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Mon-Fri 9AM-9PM
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DanceAcademy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
