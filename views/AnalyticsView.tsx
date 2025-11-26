import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, MessageSquare, Star, Mail, TrendingUp, Search, Filter, MapPin } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { Sponsor } from '../types';
import { CountUp, DemoTooltip } from '../components/Common';
import { responsesOverTime, ageDistribution, genderBreakdown, recentFeedback } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const buttonTap = { scale: 0.95 };
const buttonHover = { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } };

export const AnalyticsView: React.FC<{ sponsors: Sponsor[] }> = ({ sponsors }) => {
  const topSponsor = useMemo(() => {
    if (!sponsors.length) return { name: 'N/A', value: 0 };
    return sponsors.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  }, [sponsors]);

  const sponsorEngagementData = useMemo(() => {
    return sponsors
      .slice(0, 5) 
      .map(s => ({
        name: s.name,
        interactions: Math.floor(s.value / 500) + Math.floor(Math.random() * 50), 
        fill: s.color.includes('blue') ? '#60A5FA' : 
              s.color.includes('red') ? '#EF4444' : 
              s.color.includes('green') ? '#34D399' : 
              s.color.includes('orange') ? '#F97316' : '#FFD700'
      }))
      .sort((a, b) => b.interactions - a.interactions);
  }, [sponsors]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-black italic text-white uppercase tracking-tight mb-1">Feedback Analytics</h1>
          <div className="flex items-center text-sm text-neutral-400">
            <Calendar size={14} className="mr-2" />
            <span className="text-[#FFD700] font-bold mr-2">Jan 18 Qualifier</span>
            <span className="text-neutral-600">•</span>
            <span className="ml-2">Melbourne</span>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <motion.button 
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="bg-neutral-800 text-white px-4 py-2 rounded-lg border border-neutral-700 flex items-center text-sm font-medium hover:bg-neutral-700 transition-colors whitespace-nowrap"
          >
            <Calendar size={16} className="mr-2" /> Jan 18, 2026
          </motion.button>
          <DemoTooltip>
            <motion.button 
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="bg-[#FFD700] text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center shadow-lg shadow-[#FFD700]/10 hover:bg-[#E6C200] transition-colors opacity-50 cursor-not-allowed"
            >
              <Download size={16} className="mr-2" /> Download Full Report
            </motion.button>
          </DemoTooltip>
        </motion.div>
      </div>

      {/* Overview Metrics */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
           { label: "Total Responses", value: "847", sub: "23% of 3,670 attendees", icon: MessageSquare, color: "text-blue-400" },
           { label: "Avg Event Rating", value: "4.6", sub: "out of 5.0 Stars", icon: Star, color: "text-[#FFD700]" },
           { label: "Email Capture Rate", value: "76%", sub: "644 new contacts", icon: Mail, color: "text-emerald-400" },
           { label: "Top Sponsor", value: topSponsor.name, sub: "Highest Engagement", icon: TrendingUp, color: "text-pink-400" },
        ].map((metric, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.1)' }}
            className="bg-neutral-900/50 border border-neutral-800 p-5 rounded-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">{metric.label}</span>
              <metric.icon size={18} className={metric.color} />
            </div>
            <div className="text-2xl font-black text-white mb-1">
              <CountUp value={metric.value} />
            </div>
            <div className="text-xs text-neutral-500">{metric.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        
        {/* Responses Over Time */}
        <motion.div variants={itemVariants} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wide">Responses Over Time</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responsesOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#FFD700' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#FFD700" 
                  strokeWidth={3} 
                  dot={{ fill: '#0A0A0A', stroke: '#FFD700', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#FFD700' }}
                  isAnimationActive={true}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sponsor Engagement */}
        <motion.div variants={itemVariants} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wide">Sponsor Engagement</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sponsorEngagementData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={12} tickLine={false} axisLine={false} hide />
                <YAxis dataKey="name" type="category" stroke="#fff" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar 
                  dataKey="interactions" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                  animationDuration={1500}
                >
                  {sponsorEngagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Age Distribution */}
        <motion.div variants={itemVariants} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Age Distribution</h3>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gender Breakdown */}
        <motion.div variants={itemVariants} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
          <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Gender Breakdown</h3>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {genderBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Data Table Section */}
      <motion.div variants={itemVariants} className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-white text-lg">Recent Feedback</h3>
          
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-neutral-800 border border-neutral-700 text-white pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none focus:border-[#FFD700] w-40"
              />
            </div>
            <motion.button whileHover={buttonHover} whileTap={buttonTap} className="bg-neutral-800 text-neutral-300 px-3 py-2 rounded-lg border border-neutral-700 text-xs font-medium hover:text-white flex items-center whitespace-nowrap">
              <Filter size={12} className="mr-2" /> Filter by Sponsor
            </motion.button>
            <motion.button whileHover={buttonHover} whileTap={buttonTap} className="bg-neutral-800 text-neutral-300 px-3 py-2 rounded-lg border border-neutral-700 text-xs font-medium hover:text-white flex items-center whitespace-nowrap">
              <Star size={12} className="mr-2" /> Rating: All
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="bg-neutral-900 text-neutral-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Demographics</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Sponsors Visited</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {recentFeedback.map((item, index) => (
                <motion.tr 
                  key={item.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                  <td className="px-6 py-4">{item.age}, {item.gender}</td>
                  <td className="px-6 py-4 flex items-center">
                    <MapPin size={12} className="mr-1 text-neutral-600" /> {item.location}
                  </td>
                  <td className="px-6 py-4 text-neutral-300">{item.sponsors}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-[#FFD700]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#FFD700" className="mr-0.5" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-xs text-neutral-600">{item.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/30 flex justify-center">
          <motion.button whileHover={{ scale: 1.05 }} className="text-xs font-bold text-neutral-500 hover:text-[#FFD700] transition-colors uppercase tracking-widest">View All Responses</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};