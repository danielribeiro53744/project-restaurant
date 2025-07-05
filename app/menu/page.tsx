'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Star, Clock, Leaf, Flame } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { toast } from 'sonner';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  cookTime: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

const Menu: React.FC = () => {
  const { user } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const dishes: Dish[] = [
    // Appetizers
    {
      id: '1',
      name: 'Bruschetta Trio',
      description: 'Three varieties: classic tomato, prosciutto & fig, and ricotta & honey',
      price: 14,
      image: 'https://images.pexels.com/photos/5840228/pexels-photo-5840228.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'appetizers',
      rating: 4.8,
      cookTime: '10 min',
      isVegetarian: true
    },
    {
      id: '2',
      name: 'Antipasto Platter',
      description: 'Selection of Italian meats, cheeses, olives, and marinated vegetables',
      price: 18,
      image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'appetizers',
      rating: 4.9,
      cookTime: '5 min'
    },
    {
      id: '3',
      name: 'Arancini',
      description: 'Crispy risotto balls stuffed with mozzarella and served with marinara',
      price: 12,
      image: 'https://images.pexels.com/photos/6107787/pexels-photo-6107787.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'appetizers',
      rating: 4.7,
      cookTime: '15 min',
      isVegetarian: true
    },

    // Mains
    {
      id: '4',
      name: 'Osso Buco',
      description: 'Slow-braised veal shanks with saffron risotto and gremolata',
      price: 35,
      image: 'https://images.pexels.com/photos/5945658/pexels-photo-5945658.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
      rating: 4.9,
      cookTime: '45 min'
    },
    {
      id: '5',
      name: 'Lobster Ravioli',
      description: 'Handmade pasta filled with lobster in a creamy tomato sauce',
      price: 28,
      image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
      rating: 4.8,
      cookTime: '25 min'
    },
    {
      id: '6',
      name: 'Margherita Pizza',
      description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and basil',
      price: 22,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
      rating: 4.7,
      cookTime: '12 min',
      isVegetarian: true
    },
    {
      id: '7',
      name: 'Chicken Parmigiana',
      description: 'Breaded chicken breast with marinara and mozzarella over pasta',
      price: 24,
      image: 'https://images.pexels.com/photos/6689037/pexels-photo-6689037.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
      rating: 4.6,
      cookTime: '30 min'
    },
    {
      id: '8',
      name: 'Seafood Linguine',
      description: 'Fresh clams, mussels, and shrimp in a white wine garlic sauce',
      price: 26,
      image: 'https://images.pexels.com/photos/3218467/pexels-photo-3218467.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
      rating: 4.8,
      cookTime: '20 min'
    },

    // Desserts
    {
      id: '9',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with mascarpone, espresso, and cocoa',
      price: 12,
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'desserts',
      rating: 4.9,
      cookTime: '15 min',
      isVegetarian: true
    },
    {
      id: '10',
      name: 'Panna Cotta',
      description: 'Silky vanilla custard with fresh berry compote',
      price: 10,
      image: 'https://images.pexels.com/photos/3992121/pexels-photo-3992121.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'desserts',
      rating: 4.7,
      cookTime: '10 min',
      isVegetarian: true
    },
    {
      id: '11',
      name: 'Gelato Trio',
      description: 'Three scoops of artisanal gelato: pistachio, stracciatella, and limoncello',
      price: 9,
      image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'desserts',
      rating: 4.8,
      cookTime: '5 min',
      isVegetarian: true
    },

    // Drinks
    {
      id: '12',
      name: 'Chianti Classico',
      description: 'Full-bodied red wine from Tuscany with notes of cherry and spice',
      price: 45,
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'drinks',
      rating: 4.8,
      cookTime: '0 min'
    },
    {
      id: '13',
      name: 'Limoncello',
      description: 'Traditional Italian lemon liqueur, perfect digestif',
      price: 8,
      image: 'https://images.pexels.com/photos/5946960/pexels-photo-5946960.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'drinks',
      rating: 4.7,
      cookTime: '0 min'
    },
    {
      id: '14',
      name: 'Espresso',
      description: 'Rich, authentic Italian espresso',
      price: 4,
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'drinks',
      rating: 4.9,
      cookTime: '2 min'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'appetizers', label: 'Appetizers' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' }
  ];

  const filteredDishes = selectedCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  const handleFavoriteToggle = (dish: Dish) => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    if (isFavorite(dish.id)) {
      removeFromFavorites(dish.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(dish);
      toast.success('Added to favorites');
    }
  };

  return (
    <div className="container py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover authentic Italian flavors crafted with passion and the finest ingredients
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-sm">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {dish.isVegetarian && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Leaf className="h-3 w-3 mr-1" />
                          Vegetarian
                        </Badge>
                      )}
                      {dish.isSpicy && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          <Flame className="h-3 w-3 mr-1" />
                          Spicy
                        </Badge>
                      )}
                    </div>
                    <Badge className="absolute top-3 right-3 bg-white/90 text-black font-semibold">
                      ${dish.price}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-3 right-3 bg-white/90 hover:bg-white h-8 w-8"
                      onClick={() => handleFavoriteToggle(dish)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isFavorite(dish.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
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
                      <Button size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Menu;