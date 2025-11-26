import React from 'react';

export type ViewState = 'Dashboard' | 'Sponsors' | 'Pitches' | 'Analytics' | 'Events' | 'Settings';

export type Sponsor = {
  id: string;
  name: string;
  category: 'Apparel' | 'Food' | 'Beauty' | 'Tech' | 'Beverage' | 'Retail' | 'Telco';
  value: number;
  status: 'Prospecting' | 'Negotiating' | 'Contracted' | 'Delivered';
  lastContact: string;
  initials: string;
  color: string;
  owner: {
    name: string;
    avatar: string;
  };
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  content: string | React.ReactNode;
  timestamp: Date;
  isTyping?: boolean;
};

export type InventoryItem = {
  id: string;
  category: 'Physical' | 'Digital' | 'Experiential';
  name: string;
  price: number;
};

export type EventItem = {
  time: string;
  title: string;
  category: 'Competition' | 'Activation' | 'Logistics';
  sponsor?: string;
};

export type Task = {
  id: string;
  title: string;
  status: 'Pending' | 'In Progress' | 'Complete';
  assignee: string;
};