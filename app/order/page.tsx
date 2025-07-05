'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Star, 
  Clock, 
  Leaf, 
  Flame,
  MapPin,
  Send,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import TableSelectionDialog from '@/components/TableSelectionDialog';
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

const Order: React.FC = () => {
  const { user } = useAuth();
  const { 
    currentOrder, 
    tableNumber, 
    setTableNumber, 
    addToOrder, 
    removeFromOrder, 
    updateQuantity, 
    submitOrder, 
    clearOrder, 
    getOrderTotal 
  } = useOrder();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showTableDialog, setShowTableDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

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

  const handleAddToOrder = (dish: Dish) => {
    addToOrder({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      category: dish.category
    });
    toast.success(`Added ${dish.name} to your order`);
  };

  const handleTableSelect = (selectedTableNumber: string) => {
    setTableNumber(selectedTableNumber);
    toast.success(`Table ${selectedTableNumber} selected`);
  };

  const handleSubmitOrder = async () => {
    if (!tableNumber) {
      toast.error('Please select your table first');
      setShowTableDialog(true);
      return;
    }

    if (currentOrder.length === 0) {
      toast.error('Your order is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const newOrderId = await submitOrder(user.name, user.email, specialRequests);
      setOrderId(newOrderId);
      setOrderSubmitted(true);
      toast.success('Order submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Your order #{orderId} has been sent to the kitchen. Our waitress will bring your delicious food soon!
          </p>
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="font-medium">Table Number: {tableNumber}</p>
            <p className="text-sm text-muted-foreground">Total: ${getOrderTotal().toFixed(2)}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => {
              setOrderSubmitted(false);
              setOrderId('');
              setSpecialRequests('');
            }}>
              Order More
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Order Food</h1>
          <p className="text-lg text-muted-foreground">
            Select your favorite dishes and place your order
          </p>
        </div>

        {/* Table Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Table Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <Label htmlFor="table">Selected Table</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="table"
                    type="text"
                    placeholder="No table selected"
                    value={tableNumber}
                    readOnly
                    className="cursor-pointer"
                    onClick={() => setShowTableDialog(true)}
                  />
                  <Button 
                    variant="outline"
                    onClick={() => setShowTableDialog(true)}
                    className="whitespace-nowrap"
                  >
                    {tableNumber ? 'Change Table' : 'Select Table'}
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Click "Select Table" to choose from our visual table layout.</p>
                <p>You can see all available tables in different dining areas.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-3">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-sm">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                              onClick={() => handleAddToOrder(dish)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add to Order
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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Order ({currentOrder.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentOrder.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Your order is empty. Add some delicious items!
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {currentOrder.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground">${item.price}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500 hover:text-red-700"
                              onClick={() => removeFromOrder(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${getOrderTotal().toFixed(2)}</span>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="special-requests">Special Requests</Label>
                        <Textarea
                          id="special-requests"
                          placeholder="Any dietary restrictions or special instructions..."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                        onClick={handleSubmitOrder}
                        disabled={isSubmitting || !tableNumber}
                      >
                        {isSubmitting ? (
                          <>
                            <Send className="mr-2 h-4 w-4 animate-pulse" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Order
                          </>
                        )}
                      </Button>

                      {!tableNumber && (
                        <Alert>
                          <MapPin className="h-4 w-4" />
                          <AlertDescription>
                            Please select your table before submitting your order.
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={clearOrder}
                      >
                        Clear Order
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Table Selection Dialog */}
        <TableSelectionDialog
          open={showTableDialog}
          onOpenChange={setShowTableDialog}
          onTableSelect={handleTableSelect}
          selectedTable={tableNumber}
        />
      </div>
    </div>
  );
};

export default Order;