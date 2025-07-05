'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (frontend only for now)
    toast.success('Thank you! Your reservation request has been sent. We\'ll contact you soon to confirm.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      content: '123 Italian Street, Little Italy, NY 10012',
      link: 'https://maps.google.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '(555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@bellavista.com',
      link: 'mailto:info@bellavista.com'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Thu: 11am-10pm, Fri-Sat: 11am-11pm, Sun: 12pm-9pm',
      link: null
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', href: '#' },
    { icon: Instagram, name: 'Instagram', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' }
  ];

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with us for reservations, inquiries, or just to say hello
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Make a Reservation</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you to confirm your reservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="1"
                        max="12"
                        value={formData.guests}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Special Requests</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Any dietary restrictions, special occasions, or other requests..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Reservation Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{info.title}</p>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay updated with our latest news and specials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      asChild
                    >
                      <a href={social.href} aria-label={social.name}>
                        <social.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Interactive map would be<br />integrated here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  Private Events
                </Badge>
                <p className="text-sm text-muted-foreground">
                  We host private parties, corporate events, and special celebrations. 
                  Contact us for custom menus and pricing.
                </p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  Catering
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Bring authentic Italian flavors to your event with our catering services. 
                  Full-service or drop-off options available.
                </p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">
                  Gift Cards
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Perfect for any occasion! Purchase gift cards online or in-person. 
                  Never expire and can be used for dining or catering.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;