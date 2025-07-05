'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Users, 
  Check, 
  X, 
  Armchair, 
  Coffee, 
  Wine, 
  TreePine,
  Utensils,
  Crown
} from 'lucide-react';

interface Table {
  id: string;
  number: string;
  seats: number;
  status: 'available' | 'occupied' | 'reserved';
  position: { x: number; y: number };
  type: 'regular' | 'booth' | 'bar' | 'private';
}

interface Room {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  tables: Table[];
  features: string[];
}

interface TableSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTableSelect: (tableNumber: string) => void;
  selectedTable: string;
}

const TableSelectionDialog: React.FC<TableSelectionDialogProps> = ({
  open,
  onOpenChange,
  onTableSelect,
  selectedTable
}) => {
  const [selectedRoom, setSelectedRoom] = useState('main');
  const [manualEntry, setManualEntry] = useState('');
  const [viewMode, setViewMode] = useState<'visual' | 'manual'>('visual');

  const rooms: Room[] = [
    {
      id: 'main',
      name: 'Main Dining Room',
      description: 'Our spacious main dining area with a warm, welcoming atmosphere',
      icon: Utensils,
      features: ['Open atmosphere', 'Great for families', 'View of kitchen'],
      tables: [
        { id: '1', number: '1', seats: 2, status: 'available', position: { x: 20, y: 30 }, type: 'regular' },
        { id: '2', number: '2', seats: 4, status: 'occupied', position: { x: 60, y: 30 }, type: 'regular' },
        { id: '3', number: '3', seats: 2, status: 'available', position: { x: 20, y: 60 }, type: 'regular' },
        { id: '4', number: '4', seats: 6, status: 'available', position: { x: 60, y: 60 }, type: 'regular' },
        { id: '5', number: '5', seats: 4, status: 'reserved', position: { x: 40, y: 45 }, type: 'regular' },
        { id: '6', number: '6', seats: 2, status: 'available', position: { x: 80, y: 45 }, type: 'regular' },
        { id: '7', number: '7', seats: 8, status: 'available', position: { x: 40, y: 75 }, type: 'regular' },
        { id: '8', number: '8', seats: 4, status: 'available', position: { x: 15, y: 80 }, type: 'regular' },
      ]
    },
    {
      id: 'terrace',
      name: 'Garden Terrace',
      description: 'Beautiful outdoor seating with garden views and fresh air',
      icon: TreePine,
      features: ['Outdoor seating', 'Garden views', 'Pet-friendly'],
      tables: [
        { id: 't1', number: 'T1', seats: 2, status: 'available', position: { x: 25, y: 25 }, type: 'regular' },
        { id: 't2', number: 'T2', seats: 4, status: 'available', position: { x: 65, y: 25 }, type: 'regular' },
        { id: 't3', number: 'T3', seats: 2, status: 'occupied', position: { x: 25, y: 55 }, type: 'regular' },
        { id: 't4', number: 'T4', seats: 6, status: 'available', position: { x: 65, y: 55 }, type: 'regular' },
        { id: 't5', number: 'T5', seats: 4, status: 'available', position: { x: 45, y: 75 }, type: 'regular' },
        { id: 't6', number: 'T6', seats: 2, status: 'available', position: { x: 80, y: 40 }, type: 'regular' },
      ]
    },
    {
      id: 'bar',
      name: 'Wine Bar',
      description: 'Intimate bar area perfect for drinks and light bites',
      icon: Wine,
      features: ['Full bar', 'Wine selection', 'Intimate setting'],
      tables: [
        { id: 'b1', number: 'B1', seats: 2, status: 'available', position: { x: 30, y: 40 }, type: 'bar' },
        { id: 'b2', number: 'B2', seats: 2, status: 'available', position: { x: 50, y: 40 }, type: 'bar' },
        { id: 'b3', number: 'B3', seats: 2, status: 'occupied', position: { x: 70, y: 40 }, type: 'bar' },
        { id: 'b4', number: 'B4', seats: 4, status: 'available', position: { x: 40, y: 65 }, type: 'booth' },
        { id: 'b5', number: 'B5', seats: 4, status: 'available', position: { x: 60, y: 65 }, type: 'booth' },
      ]
    },
    {
      id: 'private',
      name: 'Private Dining',
      description: 'Exclusive private rooms for special occasions and business meetings',
      icon: Crown,
      features: ['Private rooms', 'Exclusive service', 'Special occasions'],
      tables: [
        { id: 'p1', number: 'P1', seats: 8, status: 'available', position: { x: 30, y: 40 }, type: 'private' },
        { id: 'p2', number: 'P2', seats: 12, status: 'reserved', position: { x: 70, y: 40 }, type: 'private' },
        { id: 'p3', number: 'P3', seats: 6, status: 'available', position: { x: 50, y: 70 }, type: 'private' },
      ]
    }
  ];

  const getTableStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500 hover:bg-green-600';
      case 'occupied': return 'bg-red-500 cursor-not-allowed';
      case 'reserved': return 'bg-yellow-500 cursor-not-allowed';
      default: return 'bg-gray-500';
    }
  };

  const getTableStatusText = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'Available';
      case 'occupied': return 'Occupied';
      case 'reserved': return 'Reserved';
      default: return 'Unknown';
    }
  };

  const getTableIcon = (type: Table['type']) => {
    switch (type) {
      case 'booth': return Armchair;
      case 'bar': return Coffee;
      case 'private': return Crown;
      default: return Utensils;
    }
  };

  const handleTableClick = (table: Table) => {
    if (table.status === 'available') {
      onTableSelect(table.number);
      onOpenChange(false);
    }
  };

  const handleManualSubmit = () => {
    if (manualEntry.trim()) {
      onTableSelect(manualEntry.trim());
      onOpenChange(false);
      setManualEntry('');
    }
  };

  const currentRoom = rooms.find(room => room.id === selectedRoom) || rooms[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="h-6 w-6 text-amber-600" />
            Select Your Table
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose your preferred seating area and table, or enter your table number manually
          </DialogDescription>
        </DialogHeader>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'visual' | 'manual')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="visual">Visual Selection</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            {/* Room Selection */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {rooms.map((room) => (
                <Card 
                  key={room.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedRoom === room.id ? 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-950/20' : ''
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <room.icon className="h-4 w-4 text-amber-600" />
                      {room.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground mb-2">{room.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {room.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Room Layout */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <currentRoom.icon className="h-5 w-5 text-amber-600" />
                  {currentRoom.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{currentRoom.description}</p>
              </CardHeader>
              <CardContent>
                {/* Table Layout Visualization */}
                <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-6 mb-6" style={{ height: '400px' }}>
                <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width=&quot;20&quot; height=&quot;20&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cdefs%3E%3Cpattern id=&quot;grid&quot; width=&quot;20&quot; height=&quot;20&quot; patternUnits=&quot;userSpaceOnUse&quot;%3E%3Cpath d=&quot;M 20 0 L 0 0 0 20&quot; fill=&quot;none&quot; stroke=&quot;%23f3f4f6&quot; stroke-width=&quot;1&quot;/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; fill=&quot;url(%23grid)&quot; /%3E%3C/svg%3E&quot;)] opacity-30"></div>                  {currentRoom.tables.map((table) => {
                    const TableIcon = getTableIcon(table.type);
                    const isSelected = selectedTable === table.number;
                    
                    return (
                      <div
                        key={table.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                          table.status === 'available' ? 'hover:shadow-lg' : ''
                        }`}
                        style={{ 
                          left: `${table.position.x}%`, 
                          top: `${table.position.y}%` 
                        }}
                        onClick={() => handleTableClick(table)}
                      >
                        <div className={`
                          relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg
                          ${getTableStatusColor(table.status)}
                          ${isSelected ? 'ring-4 ring-blue-400 scale-125' : ''}
                        `}>
                          <TableIcon className="h-5 w-5" />
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {table.number}
                          </div>
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 shadow">
                            {table.seats}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Reserved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>Seat count</span>
                  </div>
                </div>

                {/* Table List */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Available Tables in {currentRoom.name}</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentRoom.tables
                      .filter(table => table.status === 'available')
                      .map((table) => {
                        const TableIcon = getTableIcon(table.type);
                        const isSelected = selectedTable === table.number;
                        
                        return (
                          <Card 
                            key={table.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20' : ''
                            }`}
                            onClick={() => handleTableClick(table)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <TableIcon className="h-4 w-4 text-amber-600" />
                                  <span className="font-medium">Table {table.number}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{table.seats}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className="mt-1 text-xs capitalize">
                                {table.type}
                              </Badge>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter Table Number Manually</CardTitle>
                <DialogDescription>
                  If you already know your table number, you can enter it directly below
                </DialogDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-table">Table Number</Label>
                  <Input
                    id="manual-table"
                    placeholder="e.g., 5, T3, B2, P1"
                    value={manualEntry}
                    onChange={(e) => setManualEntry(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter any table number from our restaurant (Main: 1-8, Terrace: T1-T6, Bar: B1-B5, Private: P1-P3)
                  </p>
                </div>
                <Button 
                  onClick={handleManualSubmit}
                  disabled={!manualEntry.trim()}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  Confirm Table {manualEntry}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedTable && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">
                Selected: Table {selectedTable}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TableSelectionDialog;