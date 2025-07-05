'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Calendar,
  Clock,
  Star,
  ChefHat,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useOrder();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    // For demo purposes, allow any user to access admin dashboard
    // In production, you'd check user.role === 'admin'
  }, [user, router]);

  if (!user) {
    return null;
  }

  // Generate mock data for comprehensive reporting
  const generateWeeklyData = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => ({
      day,
      revenue: Math.floor(Math.random() * 3000) + 1500,
      orders: Math.floor(Math.random() * 50) + 20,
      customers: Math.floor(Math.random() * 80) + 40,
      avgOrderValue: Math.floor(Math.random() * 30) + 35
    }));
  };

  const generateHourlyData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      hour: `${hour}:00`,
      orders: hour >= 11 && hour <= 22 ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 3),
      revenue: hour >= 11 && hour <= 22 ? Math.floor(Math.random() * 500) + 200 : Math.floor(Math.random() * 100)
    }));
  };

  const generateCategoryData = () => [
    { name: 'Mains', value: 45, revenue: 8500, color: '#f59e0b' },
    { name: 'Appetizers', value: 25, revenue: 3200, color: '#ef4444' },
    { name: 'Desserts', value: 20, revenue: 2100, color: '#8b5cf6' },
    { name: 'Drinks', value: 10, revenue: 1800, color: '#06b6d4' }
  ];

  const weeklyData = generateWeeklyData();
  const hourlyData = generateHourlyData();
  const categoryData = generateCategoryData();

  const currentWeekStats = {
    totalRevenue: weeklyData.reduce((sum, day) => sum + day.revenue, 0),
    totalOrders: weeklyData.reduce((sum, day) => sum + day.orders, 0),
    totalCustomers: weeklyData.reduce((sum, day) => sum + day.customers, 0),
    avgOrderValue: weeklyData.reduce((sum, day) => sum + day.avgOrderValue, 0) / weeklyData.length,
    growthRate: 12.5,
    popularItems: [
      { name: 'Osso Buco', orders: 45, revenue: 1575 },
      { name: 'Margherita Pizza', orders: 38, revenue: 836 },
      { name: 'Lobster Ravioli', orders: 32, revenue: 896 },
      { name: 'Tiramisu', orders: 28, revenue: 336 }
    ],
    peakHours: ['19:00', '20:00', '21:00'],
    customerSatisfaction: 4.8,
    staffPerformance: {
      totalStaff: 12,
      activeToday: 8,
      avgRating: 4.6
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Dashboard data refreshed');
    }, 1500);
  };

  const handleExportReport = () => {
    toast.success('Report exported successfully');
  };

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive analytics and restaurant management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">${currentWeekStats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Weekly Revenue</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+{currentWeekStats.growthRate}%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{currentWeekStats.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-500">+8.2%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{currentWeekStats.totalCustomers}</p>
                <p className="text-sm text-muted-foreground">Unique Customers</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-purple-500">+15.3%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">${currentWeekStats.avgOrderValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-amber-500">{currentWeekStats.customerSatisfaction}/5</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Analysis</TabsTrigger>
            <TabsTrigger value="staff">Staff & Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Revenue Trend</CardTitle>
                  <CardDescription>Daily revenue for the current week</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hourly Performance</CardTitle>
                  <CardDescription>Orders and revenue by hour</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer> */}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Detailed financial analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Food Sales</p>
                    <p className="text-2xl font-bold">${(currentWeekStats.totalRevenue * 0.75).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">75% of total revenue</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Beverage Sales</p>
                    <p className="text-2xl font-bold">${(currentWeekStats.totalRevenue * 0.20).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">20% of total revenue</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Other</p>
                    <p className="text-2xl font-bold">${(currentWeekStats.totalRevenue * 0.05).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">5% of total revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Volume Trends</CardTitle>
                  <CardDescription>Daily order counts</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Current order pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <Badge variant="outline">12 orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Preparing</span>
                      </div>
                      <Badge variant="outline">8 orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Ready</span>
                      </div>
                      <Badge variant="outline">3 orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Served</span>
                      </div>
                      <Badge variant="outline">156 orders</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Busiest times of the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentWeekStats.peakHours.map((hour, index) => (
                    <div key={hour} className="text-center p-4 bg-muted/50 rounded-lg">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                      <p className="text-xl font-bold">{hour}</p>
                      <p className="text-sm text-muted-foreground">Peak Hour #{index + 1}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Sales by menu category</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Items</CardTitle>
                  <CardDescription>Most popular dishes this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentWeekStats.popularItems.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${item.revenue}</p>
                          <p className="text-sm text-muted-foreground">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Menu Optimization Insights</CardTitle>
                <CardDescription>Recommendations for menu improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">High Performers</span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Osso Buco - 45 orders, high profit margin</li>
                      <li>• Tiramisu - Consistent dessert favorite</li>
                      <li>• Margherita Pizza - Quick turnover item</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span className="font-medium">Needs Attention</span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Seafood Linguine - Low orders, consider promotion</li>
                      <li>• Wine pairings - Opportunity to increase beverage sales</li>
                      <li>• Lunch specials - Underperforming time slot</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance</CardTitle>
                  <CardDescription>Team metrics and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Staff</span>
                      <Badge variant="outline">{currentWeekStats.staffPerformance.totalStaff}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Today</span>
                      <Badge variant="outline">{currentWeekStats.staffPerformance.activeToday}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm">{currentWeekStats.staffPerformance.avgRating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Operational Metrics</CardTitle>
                  <CardDescription>Kitchen and service efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Avg Prep Time</span>
                      <Badge variant="outline">18 min</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Table Turnover</span>
                      <Badge variant="outline">2.3x/day</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Customer Wait Time</span>
                      <Badge variant="outline">12 min</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Performance by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <ChefHat className="h-8 w-8 text-amber-600" />
                      <div>
                        <p className="font-medium">Kitchen Staff</p>
                        <p className="text-sm text-muted-foreground">6 active members</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Efficiency</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">Service Staff</p>
                        <p className="text-sm text-muted-foreground">4 active members</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Customer Rating</span>
                        <span>4.8/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Download className="h-6 w-6" />
                <span>Export Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Manage Staff</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <ChefHat className="h-6 w-6" />
                <span>Update Menu</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Schedule</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;