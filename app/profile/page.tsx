'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Heart, Clock, Star, ChefHat } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const stats = [
    { label: 'Favorite Dishes', value: favorites.length, icon: Heart },
    { label: 'Orders Placed', value: '12', icon: ChefHat },
    { label: 'Reviews Written', value: '8', icon: Star }
  ];

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-base">{user.email}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  <User className="h-3 w-3 mr-1" />
                  Valued Customer
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Favorites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Recent Favorites
            </CardTitle>
            <CardDescription>
              Your most recently added favorite dishes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No favorites yet</p>
                <p className="text-muted-foreground">
                  Start exploring our menu and add your favorite dishes
                </p>
                <Button asChild className="mt-4">
                  <a href="/menu">Browse Menu</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.slice(0, 5).map((dish) => (
                  <div key={dish.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{dish.name}</h3>
                      <p className="text-sm text-muted-foreground">{dish.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">${dish.price}</Badge>
                        <Badge variant="outline">{dish.category}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Order Again
                    </Button>
                  </div>
                ))}
                {favorites.length > 5 && (
                  <div className="text-center pt-4">
                    <Button asChild variant="outline">
                      <a href="/favorites">View All Favorites</a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your orders and special offers
                </p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dietary Preferences</p>
                <p className="text-sm text-muted-foreground">
                  Set your dietary restrictions and preferences
                </p>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delivery Addresses</p>
                <p className="text-sm text-muted-foreground">
                  Manage your saved delivery addresses
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;