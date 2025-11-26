import { Sponsor, InventoryItem, EventItem, Task } from './types';
import { Mail, MessageSquare, Star, TrendingUp } from 'lucide-react';

export const inventoryItems: InventoryItem[] = [
  { id: 'p1', category: 'Physical', name: 'Court Naming Rights', price: 150000 },
  { id: 'p2', category: 'Physical', name: 'Jersey Patch (Front)', price: 80000 },
  { id: 'p3', category: 'Physical', name: 'Jersey Patch (Shoulder)', price: 40000 },
  { id: 'p4', category: 'Physical', name: 'Courtside Decals', price: 25000 },
  { id: 'd1', category: 'Digital', name: 'Presenting Partner (Livestream)', price: 60000 },
  { id: 'd2', category: 'Digital', name: 'Social Media Takeover', price: 15000 },
  { id: 'd3', category: 'Digital', name: 'Email Blast Feature', price: 5000 },
  { id: 'e1', category: 'Experiential', name: 'VIP Booth Activation', price: 30000 },
  { id: 'e2', category: 'Experiential', name: 'Product Sampling', price: 12000 },
  { id: 'e3', category: 'Experiential', name: 'Halftime Show Sponsor', price: 20000 },
];

export const tiers = {
  'Naming': ['p1', 'p2', 'd1', 'e1'],
  'Gold': ['p2', 'd2', 'e1'],
  'Silver': ['p4', 'd2', 'e2'],
};

export const presentationHistory = [
  { version: 'v1.0', date: 'Jan 12, 2026', sentBy: 'Sarah Lee', views: 14, clicks: 5, time: '4m 20s', status: 'Viewed' },
  { version: 'v2.0', date: 'Jan 15, 2026', sentBy: 'Sarah Lee', views: 8, clicks: 2, time: '2m 10s', status: 'Viewed' },
  { version: 'Final', date: 'Jan 18, 2026', sentBy: 'Sarah Lee', views: 22, clicks: 12, time: '8m 45s', status: 'Hot' },
];

export const revenueData = [
  { name: 'Jan', revenue: 45000 }, { name: 'Feb', revenue: 52000 }, { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 }, { name: 'May', revenue: 55000 }, { name: 'Jun', revenue: 67000 },
  { name: 'Jul', revenue: 72000 }, { name: 'Aug', revenue: 84000 }, { name: 'Sep', revenue: 79000 },
  { name: 'Oct', revenue: 88000 }, { name: 'Nov', revenue: 94000 }, { name: 'Dec', revenue: 112000 },
];

export const activityFeed = [
  { id: 1, title: "Nike partnership renewed", amount: "$250k", time: "2h ago", type: "success", initials: "NK" },
  { id: 2, title: "Maybelline pitch deck sent", amount: "Pending", time: "5h ago", type: "pending", initials: "MB" },
  { id: 3, title: "New lead: ASICS (footwear)", amount: "Qualifying", time: "1d ago", type: "info", initials: "AS" },
  { id: 4, title: "GYG activation completed", amount: "4.8★ rating", time: "1d ago", type: "success", initials: "GY" },
  { id: 5, title: "New contacts captured", amount: "427 added", time: "Jan 18", type: "info", initials: "SJ" }
];

export const analyticsMetrics = [
  { label: "Total Responses", value: "847", sub: "23% of 3,670 attendees", icon: MessageSquare, color: "text-blue-400" },
  { label: "Avg Event Rating", value: "4.6", sub: "out of 5.0 Stars", icon: Star, color: "text-[#FFD700]" },
  { label: "Email Capture Rate", value: "76%", sub: "644 new contacts", icon: Mail, color: "text-emerald-400" },
  { label: "Top Sponsor", value: "Maybelline", sub: "324 interactions (4.8★)", icon: TrendingUp, color: "text-pink-400" },
];

export const responsesOverTime = [
  { time: '10am', count: 45 }, { time: '11am', count: 82 }, { time: '12pm', count: 156 },
  { time: '1pm', count: 210 }, { time: '2pm', count: 345 }, { time: '3pm', count: 380 },
  { time: '4pm', count: 310 }, { time: '5pm', count: 180 }, { time: '6pm', count: 95 },
];

export const ageDistribution = [
  { name: '13-17', value: 18, fill: '#60A5FA' }, { name: '18-24', value: 52, fill: '#FFD700' },
  { name: '25-34', value: 22, fill: '#34D399' }, { name: '35+', value: 8, fill: '#9CA3AF' },
];

export const genderBreakdown = [
  { name: 'Male', value: 58, fill: '#60A5FA' }, { name: 'Female', value: 39, fill: '#F472B6' },
  { name: 'Non-binary', value: 2, fill: '#A78BFA' }, { name: 'Prefer not to say', value: 1, fill: '#4B5563' },
];

export const recentFeedback = [
  { id: 1, name: "Jordan M", age: 22, gender: "Male", location: "Fitzroy", sponsors: "Maybelline + GYG", rating: 5, time: "2:34pm" },
  { id: 2, name: "Sarah K", age: 19, gender: "Female", location: "Brunswick", sponsors: "Nike", rating: 4, time: "2:45pm" },
  { id: 3, name: "Liam P", age: 25, gender: "Male", location: "Richmond", sponsors: "Foot Locker + Jordan", rating: 5, time: "3:01pm" },
  { id: 4, name: "Ava T", age: 18, gender: "Female", location: "St Kilda", sponsors: "Maybelline", rating: 5, time: "3:12pm" },
  { id: 5, name: "Noah L", age: 21, gender: "Non-binary", location: "CBD", sponsors: "GYG + Nike", rating: 4, time: "3:20pm" },
  { id: 6, name: "Ethan R", age: 28, gender: "Male", location: "South Yarra", sponsors: "Jordan", rating: 3, time: "3:35pm" },
  { id: 7, name: "Mia W", age: 23, gender: "Female", location: "Carlton", sponsors: "Maybelline + Foot Locker", rating: 5, time: "3:42pm" },
  { id: 8, name: "Lucas B", age: 20, gender: "Male", location: "Northcote", sponsors: "Nike + GYG", rating: 5, time: "3:55pm" },
  { id: 9, name: "Chloe S", age: 24, gender: "Female", location: "Prahran", sponsors: "Maybelline", rating: 4, time: "4:05pm" },
  { id: 10, name: "Jack D", age: 26, gender: "Male", location: "Collingwood", sponsors: "Foot Locker", rating: 5, time: "4:15pm" },
];

export const initialSponsors: Sponsor[] = [
  { id: '1', name: 'ASICS', category: 'Apparel', value: 80000, status: 'Prospecting', lastContact: '2 days ago', initials: 'AS', color: 'bg-blue-600', owner: { name: 'Sarah Lee', avatar: 'https://picsum.photos/150?random=1' } },
  { id: '2', name: 'Gatorade', category: 'Beverage', value: 120000, status: 'Prospecting', lastContact: '1 week ago', initials: 'GA', color: 'bg-orange-500', owner: { name: 'Mike Ross', avatar: 'https://picsum.photos/150?random=2' } },
  { id: '3', name: 'Spotify', category: 'Tech', value: 60000, status: 'Prospecting', lastContact: '3 days ago', initials: 'SP', color: 'bg-green-500', owner: { name: 'Rachel Zane', avatar: 'https://picsum.photos/150?random=3' } },
  { id: '4', name: 'Puma', category: 'Apparel', value: 90000, status: 'Negotiating', lastContact: 'Yesterday', initials: 'PU', color: 'bg-red-600', owner: { name: 'Harvey Specter', avatar: 'https://picsum.photos/150?random=4' } },
  { id: '5', name: 'Red Bull', category: 'Beverage', value: 150000, status: 'Negotiating', lastContact: '4 hours ago', initials: 'RB', color: 'bg-blue-900', owner: { name: 'Donna Paulsen', avatar: 'https://picsum.photos/150?random=5' } },
  { id: '6', name: 'TikTok', category: 'Tech', value: 200000, status: 'Negotiating', lastContact: 'Today', initials: 'TT', color: 'bg-pink-600', owner: { name: 'Louis Litt', avatar: 'https://picsum.photos/150?random=6' } },
  { id: '7', name: 'Boost Mobile', category: 'Telco', value: 75000, status: 'Negotiating', lastContact: '1 week ago', initials: 'BM', color: 'bg-orange-600', owner: { name: 'Katrina Bennett', avatar: 'https://picsum.photos/150?random=7' } },
  { id: '8', name: 'Rebel Sport', category: 'Retail', value: 85000, status: 'Negotiating', lastContact: '2 days ago', initials: 'RS', color: 'bg-yellow-600', owner: { name: 'Alex Williams', avatar: 'https://picsum.photos/150?random=8' } },
  { id: '9', name: 'Nike', category: 'Apparel', value: 250000, status: 'Contracted', lastContact: 'Signed', initials: 'NK', color: 'bg-black border border-white', owner: { name: 'Jessica Pearson', avatar: 'https://picsum.photos/150?random=9' } },
  { id: '10', name: 'Jordan', category: 'Apparel', value: 180000, status: 'Contracted', lastContact: 'Signed', initials: 'JB', color: 'bg-red-700', owner: { name: 'Robert Zane', avatar: 'https://picsum.photos/150?random=10' } },
  { id: '11', name: 'Maybelline', category: 'Beauty', value: 100000, status: 'Contracted', lastContact: 'Processing', initials: 'MB', color: 'bg-pink-400', owner: { name: 'Samantha Wheeler', avatar: 'https://picsum.photos/150?random=11' } },
  { id: '12', name: 'GYG', category: 'Food', value: 100000, status: 'Contracted', lastContact: 'Active', initials: 'GY', color: 'bg-yellow-400 text-black', owner: { name: 'Jeff Malone', avatar: 'https://picsum.photos/150?random=12' } },
  { id: '13', name: 'Foot Locker', category: 'Retail', value: 120000, status: 'Contracted', lastContact: 'Active', initials: 'FL', color: 'bg-red-600', owner: { name: 'Sheila Sazs', avatar: 'https://picsum.photos/150?random=13' } },
  { id: '14', name: 'Under Armour', category: 'Apparel', value: 65000, status: 'Delivered', lastContact: 'Closed', initials: 'UA', color: 'bg-white text-black', owner: { name: 'Harold Gunderson', avatar: 'https://picsum.photos/150?random=14' } },
  { id: '15', name: 'Adidas', category: 'Apparel', value: 110000, status: 'Delivered', lastContact: 'Closed', initials: 'AD', color: 'bg-black border border-white', owner: { name: 'Dana Scott', avatar: 'https://picsum.photos/150?random=15' } },
  { id: '16', name: 'Monster Energy', category: 'Beverage', value: 95000, status: 'Delivered', lastContact: 'Closed', initials: 'ME', color: 'bg-green-600', owner: { name: 'Travis Tanner', avatar: 'https://picsum.photos/150?random=16' } },
];

export const eventSchedule: EventItem[] = [
  { time: "09:00 AM", title: "Gates Open & Registration", category: "Logistics" },
  { time: "10:00 AM", title: "U18 Prelims Start", category: "Competition" },
  { time: "12:00 PM", title: "Red Bull Dunk Contest", category: "Activation", sponsor: "Red Bull" },
  { time: "01:30 PM", title: "Nike 'Run the One' 1v1 Finals", category: "Activation", sponsor: "Nike" },
  { time: "03:00 PM", title: "Men's Open Finals", category: "Competition" },
  { time: "04:30 PM", title: "Awards Ceremony", category: "Logistics" }
];

export const logisticsTasks: Task[] = [
  { id: '1', title: "Confirm PA System Setup", status: "Complete", assignee: "Mike" },
  { id: '2', title: "Foot Locker Booth Bump-in", status: "In Progress", assignee: "Sarah" },
  { id: '3', title: "Judge Refreshments", status: "Pending", assignee: "Coordinator" },
  { id: '4', title: "Security Briefing", status: "Pending", assignee: "Head of Security" }
];

export const columns = [
  { id: 'Prospecting', title: 'Prospecting', color: 'border-blue-500' },
  { id: 'Negotiating', title: 'Negotiating', color: 'border-orange-500' },
  { id: 'Contracted', title: 'Contracted', color: 'border-[#FFD700]' },
  { id: 'Delivered', title: 'Delivered', color: 'border-emerald-500' },
];

export const categories = ['All', 'Apparel', 'Food', 'Beauty', 'Tech', 'Beverage', 'Retail'];