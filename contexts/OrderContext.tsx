'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  specialInstructions?: string;
}

interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  timestamp: Date;
  specialRequests?: string;
}

interface OrderContextType {
  currentOrder: OrderItem[];
  orders: Order[];
  tableNumber: string;
  addToOrder: (item: Omit<OrderItem, 'quantity'>, quantity?: number) => void;
  removeFromOrder: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setTableNumber: (table: string) => void;
  submitOrder: (customerName: string, customerEmail: string, specialRequests?: string) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  clearOrder: () => void;
  getOrderTotal: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tableNumber, setTableNumber] = useState<string>('');

  useEffect(() => {
    // Load current order from localStorage
    const storedOrder = localStorage.getItem('current-order');
    if (storedOrder) {
      setCurrentOrder(JSON.parse(storedOrder));
    }

    const storedTable = localStorage.getItem('table-number');
    if (storedTable) {
      setTableNumber(storedTable);
    }

    // Load orders from localStorage
    const storedOrders = localStorage.getItem('restaurant-orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders).map((order: any) => ({
        ...order,
        timestamp: new Date(order.timestamp)
      })));
    }
  }, []);

  useEffect(() => {
    // Save current order to localStorage
    localStorage.setItem('current-order', JSON.stringify(currentOrder));
  }, [currentOrder]);

  useEffect(() => {
    // Save table number to localStorage
    localStorage.setItem('table-number', tableNumber);
  }, [tableNumber]);

  useEffect(() => {
    // Save orders to localStorage
    localStorage.setItem('restaurant-orders', JSON.stringify(orders));
  }, [orders]);

  const addToOrder = (item: Omit<OrderItem, 'quantity'>, quantity: number = 1) => {
    setCurrentOrder(prev => {
      const existingItem = prev.find(orderItem => orderItem.id === item.id);
      if (existingItem) {
        return prev.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + quantity }
            : orderItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromOrder = (itemId: string) => {
    setCurrentOrder(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(itemId);
      return;
    }
    setCurrentOrder(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const submitOrder = async (customerName: string, customerEmail: string, specialRequests?: string): Promise<string> => {
    if (currentOrder.length === 0) {
      throw new Error('Order is empty');
    }

    const orderId = Math.random().toString(36).substr(2, 9);
    const newOrder: Order = {
      id: orderId,
      tableNumber,
      customerName,
      customerEmail,
      items: [...currentOrder],
      total: getOrderTotal(),
      status: 'pending',
      timestamp: new Date(),
      specialRequests
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder([]);
    
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const clearOrder = () => {
    setCurrentOrder([]);
  };

  const getOrderTotal = () => {
    return currentOrder.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <OrderContext.Provider value={{
      currentOrder,
      orders,
      tableNumber,
      addToOrder,
      removeFromOrder,
      updateQuantity,
      setTableNumber,
      submitOrder,
      updateOrderStatus,
      clearOrder,
      getOrderTotal
    }}>
      {children}
    </OrderContext.Provider>
  );
};