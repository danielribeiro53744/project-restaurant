'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, Phone, ChefHat, Heart, Award } from 'lucide-react';

const Home: React.FC = () => {
  const featuredDishes = [
    {
      id: '1',
      name: 'Truffle Risotto',
      description: 'Creamy arborio rice with black truffle and parmesan',
      price: 28,
      image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      cookTime: '25 min'
    },
    {
      id: '2',
      name: 'Osso Buco',
      description: 'Braised veal shanks with saffron risotto',
      price: 35,
      image: 'https://images.pexels.com/photos/5945658/pexels-photo-5945658.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      cookTime: '45 min'
    },
    {
      id: '3',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with mascarpone and espresso',
      price: 12,
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      cookTime: '15 min'
    }
  ];

  const features = [
    {
      icon: ChefHat,
      title: 'Expert Chefs',
      description: 'Our skilled chefs bring authentic Italian flavors to every dish'
    },
    {
      icon: Heart,
      title: 'Fresh Ingredients',
      description: 'We source the finest, freshest ingredients for exceptional quality'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in Italian cuisine and hospitality'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 container text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Bella Vista
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Experience authentic Italian cuisine in a warm, welcoming atmosphere
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
              <Link href="/menu">View Menu</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Make Reservation</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Little Italy, NY</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Dishes</h2>
            <p className="text-lg text-muted-foreground">
              Discover our chef's most beloved creations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-black">
                    ${dish.price}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{dish.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-muted-foreground">{dish.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-base">{dish.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{dish.cookTime}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose Bella Vista?</h2>
            <p className="text-lg text-muted-foreground">
              Experience the difference that passion and quality make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Experience Bella Vista?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience where every meal is a celebration of authentic Italian cuisine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/menu">Explore Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-amber-600">
              <Link href="/contact">Book a Table</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;