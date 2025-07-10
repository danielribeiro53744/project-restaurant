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
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  ChefHat,
  Coffee,
  Crown,
  Star,
  Phone,
  Mail,
  Calendar,
  Clock,
  DollarSign,
  Award,
  AlertTriangle,
  CheckCircle,
  UserPlus,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: 'Kitchen' | 'Front of House' | 'Management';
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  schedule: {
    monday: { start: string; end: string; off?: boolean };
    tuesday: { start: string; end: string; off?: boolean };
    wednesday: { start: string; end: string; off?: boolean };
    thursday: { start: string; end: string; off?: boolean };
    friday: { start: string; end: string; off?: boolean };
    saturday: { start: string; end: string; off?: boolean };
    sunday: { start: string; end: string; off?: boolean };
  };
  performance: {
    rating: number;
    reviews: number;
    lastReview: string;
  };
  certifications: string[];
  notes: string;
}

const ManageStaff: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'Marco Rossi',
      email: 'marco@bellavista.com',
      phone: '(555) 123-4567',
      position: 'Executive Chef',
      department: 'Kitchen',
      salary: 75000,
      hireDate: '2020-01-15',
      status: 'active',
      schedule: {
        monday: { start: '10:00', end: '22:00' },
        tuesday: { start: '10:00', end: '22:00' },
        wednesday: { start: '10:00', end: '22:00' },
        thursday: { start: '10:00', end: '22:00' },
        friday: { start: '10:00', end: '23:00' },
        saturday: { start: '10:00', end: '23:00' },
        sunday: { off: true, start: '', end: '' }
      },
      performance: { rating: 4.9, reviews: 24, lastReview: '2024-01-15' },
      certifications: ['ServSafe Manager', 'Culinary Arts Degree'],
      notes: 'Excellent leadership skills and culinary expertise.'
    },
    {
      id: '2',
      name: 'Sofia Benedetti',
      email: 'sofia@bellavista.com',
      phone: '(555) 234-5678',
      position: 'Sous Chef',
      department: 'Kitchen',
      salary: 55000,
      hireDate: '2021-03-10',
      status: 'active',
      schedule: {
        monday: { start: '11:00', end: '21:00' },
        tuesday: { start: '11:00', end: '21:00' },
        wednesday: { off: true, start: '', end: '' },
        thursday: { start: '11:00', end: '21:00' },
        friday: { start: '11:00', end: '22:00' },
        saturday: { start: '11:00', end: '22:00' },
        sunday: { start: '12:00', end: '20:00' }
      },
      performance: { rating: 4.7, reviews: 18, lastReview: '2024-01-10' },
      certifications: ['ServSafe Food Handler', 'Pastry Certification'],
      notes: 'Specializes in Northern Italian cuisine and desserts.'
    },
    {
      id: '3',
      name: 'Isabella Romano',
      email: 'isabella@bellavista.com',
      phone: '(555) 345-6789',
      position: 'Restaurant Manager',
      department: 'Front of House',
      salary: 65000,
      hireDate: '2019-08-20',
      status: 'active',
      schedule: {
        monday: { start: '09:00', end: '18:00' },
        tuesday: { start: '09:00', end: '18:00' },
        wednesday: { start: '09:00', end: '18:00' },
        thursday: { start: '09:00', end: '18:00' },
        friday: { start: '09:00', end: '19:00' },
        saturday: { start: '10:00', end: '20:00' },
        sunday: { off: true, start: '', end: '' }
      },
      performance: { rating: 4.8, reviews: 22, lastReview: '2024-01-05' },
      certifications: ['Wine Service Certification', 'Management Training'],
      notes: 'Excellent customer service and team management skills.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: 'Kitchen',
    salary: 0,
    status: 'active',
    certifications: [],
    notes: ''
  });

  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
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

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.position) {
      toast.error('Please fill in all required fields');
      return;
    }

    const staffMember: StaffMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStaff.name!,
      email: newStaff.email!,
      phone: newStaff.phone || '',
      position: newStaff.position!,
      department: newStaff.department as 'Kitchen' | 'Front of House' | 'Management',
      salary: newStaff.salary || 0,
      hireDate: new Date().toISOString().split('T')[0],
      status: newStaff.status as 'active' | 'inactive' | 'on_leave',
      schedule: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' },
        saturday: { off: true, start: '', end: '' },
        sunday: { off: true, start: '', end: '' }
      },
      performance: { rating: 0, reviews: 0, lastReview: '' },
      certifications: newStaff.certifications || [],
      notes: newStaff.notes || ''
    };

    setStaffMembers(prev => [...prev, staffMember]);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: 'Kitchen',
      salary: 0,
      status: 'active',
      certifications: [],
      notes: ''
    });
    setIsAddDialogOpen(false);
    toast.success(`${staffMember.name} has been added to the team`);
  };

  const handleDeleteStaff = (id: string) => {
    const member = staffMembers.find(m => m.id === id);
    setStaffMembers(prev => prev.filter(m => m.id !== id));
    toast.success(`${member?.name} has been removed from the team`);
  };

  const handleUpdateStatus = (id: string, status: 'active' | 'inactive' | 'on_leave') => {
    setStaffMembers(prev => prev.map(member => 
      member.id === id ? { ...member, status } : member
    ));
    const member = staffMembers.find(m => m.id === id);
    toast.success(`${member?.name}'s status updated to ${status.replace('_', ' ')}`);
  };

  const stats = {
    total: staffMembers.length,
    active: staffMembers.filter(m => m.status === 'active').length,
    kitchen: staffMembers.filter(m => m.department === 'Kitchen').length,
    frontOfHouse: staffMembers.filter(m => m.department === 'Front of House').length,
    avgRating: staffMembers.reduce((sum, m) => sum + m.performance.rating, 0) / staffMembers.length || 0
  };

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Manage Staff</h1>
            <p className="text-lg text-muted-foreground">
              Oversee your team, manage schedules, and track performance
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>
                  Enter the details for the new team member
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={newStaff.position}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="Enter job position"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={newStaff.department} onValueChange={(value) => setNewStaff(prev => ({ ...prev, department: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kitchen">Kitchen</SelectItem>
                      <SelectItem value="Front of House">Front of House</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={newStaff.salary}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, salary: Number(e.target.value) }))}
                    placeholder="Enter annual salary"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newStaff.notes}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes about the staff member"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStaff}>
                  Add Staff Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Staff</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.kitchen}</p>
                <p className="text-sm text-muted-foreground">Kitchen Staff</p>
              </div>
              <ChefHat className="h-8 w-8 text-amber-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.frontOfHouse}</p>
                <p className="text-sm text-muted-foreground">Front of House</p>
              </div>
              <Coffee className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search staff by name, position, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Staff List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStaff.map((member) => {
                const DepartmentIcon = getDepartmentIcon(member.department);
                return (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                            <DepartmentIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{member.position}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${member.salary.toLocaleString()}/year</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Hired: {new Date(member.hireDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Performance</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm">{member.performance.rating}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.performance.reviews} reviews • Last: {member.performance.lastReview ? new Date(member.performance.lastReview).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>

                      {member.certifications.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Certifications</span>
                          <div className="flex flex-wrap gap-1">
                            {member.certifications.slice(0, 2).map((cert, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                            {member.certifications.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{member.certifications.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Select onValueChange={(value) => handleUpdateStatus(member.id, value as any)}>
                          <SelectTrigger className="flex-1">
                            <Settings className="h-4 w-4 mr-1" />
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="on_leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteStaff(member.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredStaff.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No staff members found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageStaff;