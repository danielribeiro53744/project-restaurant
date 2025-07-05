'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  Users, 
  Award, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  Heart,
  Coffee
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: string;
  awards?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
}

const Staff: React.FC = () => {
  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Marco Rossi',
      position: 'Executive Chef',
      department: 'Kitchen',
      image: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Born in Naples, Marco brings over 20 years of authentic Italian culinary expertise to Bella Vista. His passion for traditional recipes combined with modern techniques creates unforgettable dining experiences.',
      specialties: ['Pasta Making', 'Traditional Sauces', 'Seafood', 'Wine Pairing'],
      experience: '20+ years',
      awards: ['James Beard Nominee 2023', 'Best Italian Chef NYC 2022'],
      contact: {
        email: 'marco@bellavista.com'
      }
    },
    {
      id: '2',
      name: 'Sofia Benedetti',
      position: 'Sous Chef',
      department: 'Kitchen',
      image: 'https://images.pexels.com/photos/4253313/pexels-photo-4253313.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Sofia specializes in Northern Italian cuisine and is our expert in risotto and polenta dishes. Her attention to detail and creative presentations make every plate a work of art.',
      specialties: ['Risotto', 'Polenta', 'Desserts', 'Plating'],
      experience: '12 years',
      awards: ['Rising Star Chef 2021']
    },
    {
      id: '3',
      name: 'Giuseppe Marinelli',
      position: 'Pizza Chef',
      department: 'Kitchen',
      image: 'https://images.pexels.com/photos/4253290/pexels-photo-4253290.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Master of the wood-fired oven, Giuseppe learned his craft in the streets of Naples. His authentic Neapolitan pizzas are made with imported Italian flour and San Marzano tomatoes.',
      specialties: ['Neapolitan Pizza', 'Wood-fired Cooking', 'Dough Making'],
      experience: '15 years',
      awards: ['Best Pizza NYC 2023']
    },
    {
      id: '4',
      name: 'Isabella Romano',
      position: 'Restaurant Manager',
      department: 'Front of House',
      image: 'https://images.pexels.com/photos/4253311/pexels-photo-4253311.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Isabella ensures every guest feels like family. With her warm hospitality and extensive knowledge of Italian wines, she creates the perfect dining atmosphere.',
      specialties: ['Guest Relations', 'Wine Service', 'Staff Training', 'Event Planning'],
      experience: '10 years',
      contact: {
        email: 'isabella@bellavista.com',
        phone: '(555) 123-4567'
      }
    },
    {
      id: '5',
      name: 'Antonio Verdi',
      position: 'Sommelier',
      department: 'Front of House',
      image: 'https://images.pexels.com/photos/4253295/pexels-photo-4253295.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Antonio curates our extensive Italian wine collection and provides expert pairings for every dish. His knowledge of regional Italian wines is unmatched.',
      specialties: ['Wine Pairing', 'Italian Wines', 'Spirits', 'Staff Education'],
      experience: '8 years',
      awards: ['Certified Sommelier Level 3']
    },
    {
      id: '6',
      name: 'Lucia Fontana',
      position: 'Pastry Chef',
      department: 'Kitchen',
      image: 'https://images.pexels.com/photos/4253314/pexels-photo-4253314.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Lucia creates our heavenly desserts using traditional Italian recipes passed down through generations. Her tiramisu and cannoli are legendary.',
      specialties: ['Traditional Desserts', 'Gelato', 'Pastries', 'Chocolate Work'],
      experience: '14 years',
      awards: ['Best Dessert Chef 2022']
    },
    {
      id: '7',
      name: 'Roberto Conti',
      position: 'Head Waiter',
      department: 'Front of House',
      image: 'https://images.pexels.com/photos/4253301/pexels-photo-4253301.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Roberto leads our service team with grace and professionalism. His attention to detail and genuine care for guests creates memorable dining experiences.',
      specialties: ['Fine Dining Service', 'Team Leadership', 'Guest Experience'],
      experience: '16 years'
    },
    {
      id: '8',
      name: 'Elena Bianchi',
      position: 'Prep Cook',
      department: 'Kitchen',
      image: 'https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Elena is the backbone of our kitchen operations, ensuring all ingredients are perfectly prepared. Her dedication and skill support our entire culinary team.',
      specialties: ['Ingredient Prep', 'Sauce Making', 'Kitchen Organization'],
      experience: '6 years'
    }
  ];

  const departments = [
    { id: 'all', label: 'All Staff', icon: Users },
    { id: 'Kitchen', label: 'Kitchen', icon: ChefHat },
    { id: 'Front of House', label: 'Front of House', icon: Coffee }
  ];

  const [selectedDepartment, setSelectedDepartment] = React.useState('all');

  const filteredStaff = selectedDepartment === 'all' 
    ? staffMembers 
    : staffMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Meet Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our passionate team of culinary artists and hospitality professionals work together 
            to bring you an authentic Italian dining experience that feels like home.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 bg-muted/50 p-1 rounded-lg">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant={selectedDepartment === dept.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedDepartment(dept.id)}
                className="flex items-center gap-2"
              >
                <dept.icon className="h-4 w-4" />
                {dept.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm opacity-90">{member.position}</p>
                </div>
                <Badge className="absolute top-4 right-4 bg-white/90 text-black">
                  {member.department}
                </Badge>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {member.bio}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="font-medium">{member.experience} experience</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {member.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {member.awards && member.awards.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-600" />
                        <p className="text-sm font-medium">Awards:</p>
                      </div>
                      <div className="space-y-1">
                        {member.awards.map((award, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Star className="h-3 w-3 text-amber-500" />
                            <span className="text-xs text-muted-foreground">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {member.contact && (
                    <div className="pt-2 border-t space-y-1">
                      {member.contact.email && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{member.contact.email}</span>
                        </div>
                      )}
                      {member.contact.phone && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{member.contact.phone}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Values */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Values</CardTitle>
            <CardDescription className="text-base">
              What drives our team every day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Passion</h3>
                <p className="text-muted-foreground">
                  Every dish is prepared with love and dedication to authentic Italian traditions.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Family</h3>
                <p className="text-muted-foreground">
                  We treat every guest like family and work together as one unified team.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for perfection in every aspect of the dining experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Join Our Team */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join Our Team</CardTitle>
            <CardDescription className="text-base">
              Interested in becoming part of the Bella Vista family?
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our love for Italian cuisine 
              and exceptional hospitality. Whether you're an experienced chef or just starting your 
              culinary journey, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                View Open Positions
              </Button>
              <Button variant="outline">
                Submit Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Staff;