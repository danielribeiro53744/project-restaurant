'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  ChefHat,
  Coffee,
  Crown,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  Upload,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  position: string;
  department: 'Kitchen' | 'Front of House' | 'Management';
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'absent' | 'late';
  notes?: string;
  breakTime?: number;
  overtimeHours?: number;
}

interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: 'Kitchen' | 'Front of House' | 'Management';
  availability: {
    [key: string]: { available: boolean; preferredStart?: string; preferredEnd?: string };
  };
}

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('all');

  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Marco Rossi',
      position: 'Executive Chef',
      department: 'Kitchen',
      availability: {
        monday: { available: true, preferredStart: '10:00', preferredEnd: '22:00' },
        tuesday: { available: true, preferredStart: '10:00', preferredEnd: '22:00' },
        wednesday: { available: true, preferredStart: '10:00', preferredEnd: '22:00' },
        thursday: { available: true, preferredStart: '10:00', preferredEnd: '22:00' },
        friday: { available: true, preferredStart: '10:00', preferredEnd: '23:00' },
        saturday: { available: true, preferredStart: '10:00', preferredEnd: '23:00' },
        sunday: { available: false }
      }
    },
    {
      id: '2',
      name: 'Sofia Benedetti',
      position: 'Sous Chef',
      department: 'Kitchen',
      availability: {
        monday: { available: true, preferredStart: '11:00', preferredEnd: '21:00' },
        tuesday: { available: true, preferredStart: '11:00', preferredEnd: '21:00' },
        wednesday: { available: false },
        thursday: { available: true, preferredStart: '11:00', preferredEnd: '21:00' },
        friday: { available: true, preferredStart: '11:00', preferredEnd: '22:00' },
        saturday: { available: true, preferredStart: '11:00', preferredEnd: '22:00' },
        sunday: { available: true, preferredStart: '12:00', preferredEnd: '20:00' }
      }
    },
    {
      id: '3',
      name: 'Isabella Romano',
      position: 'Restaurant Manager',
      department: 'Front of House',
      availability: {
        monday: { available: true, preferredStart: '09:00', preferredEnd: '18:00' },
        tuesday: { available: true, preferredStart: '09:00', preferredEnd: '18:00' },
        wednesday: { available: true, preferredStart: '09:00', preferredEnd: '18:00' },
        thursday: { available: true, preferredStart: '09:00', preferredEnd: '18:00' },
        friday: { available: true, preferredStart: '09:00', preferredEnd: '19:00' },
        saturday: { available: true, preferredStart: '10:00', preferredEnd: '20:00' },
        sunday: { available: false }
      }
    },
    {
      id: '4',
      name: 'Roberto Conti',
      position: 'Head Waiter',
      department: 'Front of House',
      availability: {
        monday: { available: true, preferredStart: '16:00', preferredEnd: '23:00' },
        tuesday: { available: true, preferredStart: '16:00', preferredEnd: '23:00' },
        wednesday: { available: true, preferredStart: '16:00', preferredEnd: '23:00' },
        thursday: { available: false },
        friday: { available: true, preferredStart: '16:00', preferredEnd: '24:00' },
        saturday: { available: true, preferredStart: '16:00', preferredEnd: '24:00' },
        sunday: { available: true, preferredStart: '16:00', preferredEnd: '22:00' }
      }
    }
  ];

  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: '1',
      staffId: '1',
      staffName: 'Marco Rossi',
      position: 'Executive Chef',
      department: 'Kitchen',
      date: '2024-01-22',
      startTime: '10:00',
      endTime: '22:00',
      status: 'confirmed',
      breakTime: 60,
      notes: 'Leading dinner service'
    },
    {
      id: '2',
      staffId: '2',
      staffName: 'Sofia Benedetti',
      position: 'Sous Chef',
      department: 'Kitchen',
      date: '2024-01-22',
      startTime: '11:00',
      endTime: '21:00',
      status: 'scheduled',
      breakTime: 30
    },
    {
      id: '3',
      staffId: '3',
      staffName: 'Isabella Romano',
      position: 'Restaurant Manager',
      department: 'Front of House',
      date: '2024-01-22',
      startTime: '09:00',
      endTime: '18:00',
      status: 'confirmed',
      breakTime: 60
    },
    {
      id: '4',
      staffId: '4',
      staffName: 'Roberto Conti',
      position: 'Head Waiter',
      department: 'Front of House',
      date: '2024-01-22',
      startTime: '16:00',
      endTime: '23:00',
      status: 'scheduled',
      breakTime: 30
    }
  ]);

  const [newShift, setNewShift] = useState<Partial<Shift>>({
    staffId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    status: 'scheduled',
    breakTime: 30
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Kitchen': return ChefHat;
      case 'Front of House': return Coffee;
      case 'Management': return Crown;
      default: return Users;
    }
  };

  const calculateHours = (startTime: string, endTime: string, breakTime: number = 0) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.max(0, diffHours - (breakTime / 60));
  };

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const handleAddShift = () => {
    if (!newShift.staffId || !newShift.date || !newShift.startTime || !newShift.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const staff = staffMembers.find(s => s.id === newShift.staffId);
    if (!staff) {
      toast.error('Staff member not found');
      return;
    }

    const shift: Shift = {
      id: Math.random().toString(36).substr(2, 9),
      staffId: newShift.staffId!,
      staffName: staff.name,
      position: staff.position,
      department: staff.department,
      date: newShift.date!,
      startTime: newShift.startTime!,
      endTime: newShift.endTime!,
      status: newShift.status as any,
      breakTime: newShift.breakTime || 30,
      notes: newShift.notes
    };

    setShifts(prev => [...prev, shift]);
    setNewShift({
      staffId: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      status: 'scheduled',
      breakTime: 30
    });
    setIsAddShiftOpen(false);
    toast.success(`Shift scheduled for ${staff.name}`);
  };

  const handleDeleteShift = (id: string) => {
    const shift = shifts.find(s => s.id === id);
    setShifts(prev => prev.filter(s => s.id !== id));
    toast.success(`Shift for ${shift?.staffName} has been removed`);
  };

  const handleUpdateShiftStatus = (id: string, status: Shift['status']) => {
    setShifts(prev => prev.map(shift => 
      shift.id === id ? { ...shift, status } : shift
    ));
    const shift = shifts.find(s => s.id === id);
    toast.success(`${shift?.staffName}'s shift status updated to ${status}`);
  };

  const filteredShifts = shifts.filter(shift => {
    const matchesDepartment = filterDepartment === 'all' || shift.department === filterDepartment;
    return matchesDepartment;
  });

  const weekDays = getWeekDays(selectedWeek);
  const todayShifts = shifts.filter(shift => shift.date === new Date().toISOString().split('T')[0]);
  
  const stats = {
    totalShifts: shifts.length,
    confirmedShifts: shifts.filter(s => s.status === 'confirmed').length,
    totalHours: shifts.reduce((sum, shift) => sum + calculateHours(shift.startTime, shift.endTime, shift.breakTime), 0),
    staffScheduled: new Set(shifts.map(s => s.staffId)).size
  };

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Staff Schedule</h1>
            <p className="text-lg text-muted-foreground">
              Manage staff schedules, shifts, and availability
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Dialog open={isAddShiftOpen} onOpenChange={setIsAddShiftOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shift
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Shift</DialogTitle>
                  <DialogDescription>
                    Create a new shift for a staff member
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff">Staff Member *</Label>
                    <Select value={newShift.staffId} onValueChange={(value) => setNewShift(prev => ({ ...prev, staffId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffMembers.map((staff) => (
                          <SelectItem key={staff.id} value={staff.id}>
                            {staff.name} - {staff.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newShift.date}
                      onChange={(e) => setNewShift(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time *</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={newShift.startTime}
                        onChange={(e) => setNewShift(prev => ({ ...prev, startTime: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time *</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={newShift.endTime}
                        onChange={(e) => setNewShift(prev => ({ ...prev, endTime: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="break-time">Break Time (minutes)</Label>
                    <Input
                      id="break-time"
                      type="number"
                      value={newShift.breakTime}
                      onChange={(e) => setNewShift(prev => ({ ...prev, breakTime: Number(e.target.value) }))}
                      placeholder="30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      value={newShift.notes}
                      onChange={(e) => setNewShift(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setIsAddShiftOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddShift}>
                    Schedule Shift
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.totalShifts}</p>
                <p className="text-sm text-muted-foreground">Total Shifts</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.confirmedShifts}</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.totalHours.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.staffScheduled}</p>
                <p className="text-sm text-muted-foreground">Staff Scheduled</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
        </div>

        {/* Schedule Views */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Kitchen">Kitchen</SelectItem>
                <SelectItem value="Front of House">Front of House</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="daily">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayShifts.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No shifts scheduled for today</h3>
                      <p className="text-muted-foreground">
                        Add shifts to see them here
                      </p>
                    </div>
                  ) : (
                    todayShifts.map((shift) => {
                      const DepartmentIcon = getDepartmentIcon(shift.department);
                      const hours = calculateHours(shift.startTime, shift.endTime, shift.breakTime);
                      
                      return (
                        <Card key={shift.id} className="border-l-4 border-l-amber-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                                  <DepartmentIcon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{shift.staffName}</h3>
                                  <p className="text-sm text-muted-foreground">{shift.position}</p>
                                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                    <span>{shift.startTime} - {shift.endTime}</span>
                                    <span>{hours.toFixed(1)} hours</span>
                                    {shift.breakTime && <span>{shift.breakTime}min break</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge className={getStatusColor(shift.status)}>
                                  {shift.status}
                                </Badge>
                                <Select onValueChange={(value) => handleUpdateShiftStatus(shift.id, value as any)}>
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Update" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="absent">Absent</SelectItem>
                                    <SelectItem value="late">Late</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeleteShift(shift.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {shift.notes && (
                              <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                                <strong>Notes:</strong> {shift.notes}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>
                      Week of {weekDays[0].toLocaleDateString()} - {weekDays[6].toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedWeek(new Date(selectedWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedWeek(new Date())}
                    >
                      Today
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedWeek(new Date(selectedWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {weekDays.map((day, index) => {
                    const dayShifts = filteredShifts.filter(shift => 
                      shift.date === day.toISOString().split('T')[0]
                    );
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="text-center">
                          <h3 className="font-medium">
                            {day.toLocaleDateString('en-US', { weekday: 'short' })}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {day.getDate()}
                          </p>
                        </div>
                        <div className="space-y-2 min-h-[200px]">
                          {dayShifts.map((shift) => {
                            const DepartmentIcon = getDepartmentIcon(shift.department);
                            return (
                              <Card key={shift.id} className="p-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <DepartmentIcon className="h-3 w-3" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{shift.staffName}</p>
                                    <p className="text-muted-foreground">
                                      {shift.startTime}-{shift.endTime}
                                    </p>
                                  </div>
                                </div>
                                <Badge className={`${getStatusColor(shift.status)} text-xs mt-1`}>
                                  {shift.status}
                                </Badge>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>
                  Calendar view with shift summary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      Shifts for {selectedDate.toLocaleDateString()}
                    </h3>
                    {shifts
                      .filter(shift => shift.date === selectedDate.toISOString().split('T')[0])
                      .map((shift) => {
                        const DepartmentIcon = getDepartmentIcon(shift.department);
                        return (
                          <Card key={shift.id} className="p-3">
                            <div className="flex items-center gap-3">
                              <DepartmentIcon className="h-5 w-5 text-amber-600" />
                              <div className="flex-1">
                                <p className="font-medium">{shift.staffName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {shift.startTime} - {shift.endTime}
                                </p>
                              </div>
                              <Badge className={getStatusColor(shift.status)}>
                                {shift.status}
                              </Badge>
                            </div>
                          </Card>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Schedule;