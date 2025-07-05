'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { toast } from 'sonner';

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { favorites, removeFromFavorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleRemoveFavorite = (dishId: string, dishName: string) => {
    removeFromFavorites(dishId);
    toast.success(`Removed ${dishName} from favorites`);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Your Favorites
          </h1>
          <p className="text-lg text-muted-foreground">
            All your favorite dishes in one place
          </p>
        </div>

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring our menu and add your favorite dishes to see them here
              </p>
              <Button asChild className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                <a href="/menu">Browse Menu</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-black font-semibold">
                    ${dish.price}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 left-3 bg-white/90 hover:bg-white h-8 w-8"
                    onClick={() => handleRemoveFavorite(dish.id, dish.name)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{dish.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  <CardDescription className="text-base">{dish.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="capitalize">
                      {dish.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>25 min</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      size="sm"
                    >
                      Order Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRemoveFavorite(dish.id, dish.name)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {favorites.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Favorites Summary</CardTitle>
              <CardDescription>
                Your dining preferences at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{favorites.length}</p>
                  <p className="text-sm text-muted-foreground">Total Favorites</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">
                    ${Math.round(favorites.reduce((sum, dish) => sum + dish.price, 0) / favorites.length)}
                  </p>
                  <p className="text-sm text-muted-foreground">Average Price</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">
                    {favorites.filter(dish => dish.category === 'mains').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Main Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">
                    {favorites.filter(dish => dish.category === 'desserts').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Desserts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Favorites;