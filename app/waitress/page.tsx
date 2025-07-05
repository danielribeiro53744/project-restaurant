'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  DollarSign, 
  ChefHat,
  MapPin,
  Mail,
  User,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import { toast } from 'sonner';

const WaitressDashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrder();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    // For demo purposes, allow any user to access waitress dashboard
    // In production, you'd check user.role === 'waitress'
  }, [user, router]);

  if (!user) {
    return null;
  }

  const statusOptions = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { id: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length },
    { id: 'served', label: 'Served', count: orders.filter(o => o.status === 'served').length }
  ];

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'served': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'preparing': return <ChefHat className="h-4 w-4" />;
      case 'ready': return <CheckCircle className="h-4 w-4" />;
      case 'served': return <Users className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'served';
      case 'served': return 'completed';
      default: return currentStatus;
    }
  };

  const getNextStatusLabel = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending': return 'Start Preparing';
      case 'preparing': return 'Mark Ready';
      case 'ready': return 'Mark Served';
      case 'served': return 'Complete';
      default: return 'Update';
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Orders refreshed');
    }, 1000);
  };

  const todayStats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
    pendingOrders: orders.filter(o => o.status === 'pending').length
  };

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Waitress Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage customer orders and track kitchen status
            </p>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{todayStats.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">${todayStats.totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">${todayStats.averageOrderValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{todayStats.pendingOrders}</p>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>
              Track and update order status in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
                {statusOptions.map((status) => (
                  <TabsTrigger key={status.id} value={status.id} className="text-sm">
                    {status.label} ({status.count})
                  </TabsTrigger>
                ))}
              </TabsList>

              {statusOptions.map((statusOption) => (
                <TabsContent key={statusOption.id} value={statusOption.id}>
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No orders found</h3>
                      <p className="text-muted-foreground">
                        {selectedStatus === 'all' 
                          ? 'No orders have been placed yet.' 
                          : `No orders with status "${selectedStatus}".`
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredOrders.map((order) => (
                        <Card key={order.id} className="border-l-4 border-l-amber-500">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1 capitalize">{order.status}</span>
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Table {order.tableNumber}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{order.customerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{order.customerEmail}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{order.timestamp.toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Order Items:</h4>
                              <div className="space-y-1">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {order.specialRequests && (
                              <div className="space-y-2">
                                <h4 className="font-medium">Special Requests:</h4>
                                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                                  {order.specialRequests}
                                </p>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t">
                              <span className="font-bold">Total: ${order.total.toFixed(2)}</span>
                              {order.status !== 'completed' && (
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                                  onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status))}
                                >
                                  {getNextStatusLabel(order.status)}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => setSelectedStatus('pending')}
              >
                <AlertCircle className="h-6 w-6" />
                <span>View Pending Orders</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => setSelectedStatus('ready')}
              >
                <CheckCircle className="h-6 w-6" />
                <span>Ready for Pickup</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-6 w-6" />
                <span>Refresh Orders</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaitressDashboard;