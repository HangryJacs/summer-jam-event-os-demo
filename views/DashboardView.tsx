import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, BarChart3, FileText, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { Sponsor } from '../types';
import { MetricCard, DemoTooltip, CountUp } from '../components/Common';
import { revenueData, activityFeed } from '../constants';

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

export const DashboardView: React.FC<{ hoveredBarIndex: any, setHoveredBarIndex: any, sponsors: Sponsor[] }> = ({ hoveredBarIndex, setHoveredBarIndex, sponsors }) => {
  
  const calculatedMetrics = useMemo(() => {
    const pipelineValue = sponsors
      .filter(s => ['Prospecting', 'Negotiating', 'Contracted'].includes(s.status))
      .reduce((sum, s) => sum + s.value, 0);
    
    const negotiatingCount = sponsors.filter(s => s.status === 'Negotiating').length;

    const activeSponsors = sponsors.filter(s => s.status === 'Contracted');
    const activeCount = activeSponsors.length;
    const activeNames = activeSponsors.slice(0, 3).map(s => s.name).join(', ');

    const totalRevenue = sponsors
      .filter(s => s.status === 'Contracted' || s.status === 'Delivered')
      .reduce((sum, s) => sum + s.value, 0);

    const formatMoney = (amount: number) => {
      if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
      return `$${(amount / 1000).toFixed(0)}k`;
    };

    return [
      {
        title: "Total Revenue",
        value: formatMoney(totalRevenue),
        change: "+18% YoY",
        icon: DollarSign,
        color: "text-[#FFD700]",
        trend: "up"
      },
      {
        title: "Active Sponsors",
        value: String(activeCount),
        change: `${activeNames}${activeSponsors.length > 3 ? ', etc.' : ''}`,
        icon: Users,
        color: "text-orange-500",
        trend: "neutral"
      },
      {
        title: "Pipeline Value",
        value: formatMoney(pipelineValue),
        change: `${negotiatingCount} in negotiation`,
        icon: BarChart3,
        color: "text-teal-400",
        trend: "up"
      },
      {
        title: "Database Contacts",
        value: "8,247",
        change: "+124% growth",
        icon: FileText,
        color: "text-white",
        trend: "up"
      }
    ];
  }, [sponsors]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2 uppercase">
            The Heat Is On
          </h1>
          <p className="text-neutral-400 text-lg">Manage partnerships with AI-powered intelligence.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex space-x-3">
          <DemoTooltip>
            <motion.button 
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors border border-neutral-700 opacity-50 cursor-not-allowed"
            >
              Export Report
            </motion.button>
          </DemoTooltip>
          <motion.button 
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="bg-[#FFD700] hover:bg-[#E6C200] text-black px-5 py-2.5 rounded-lg font-bold text-sm transition-colors italic uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.3)] whitespace-nowrap"
          >
            Create Pitch
          </motion.button>
        </motion.div>
      </div>

      {/* Metrics Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {calculatedMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} index={index} />
        ))}
      </motion.div>

      {/* Main Chart & Feed Section */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white italic tracking-wide uppercase">Revenue Trend</h3>
              <p className="text-sm text-neutral-500">Monthly breakdown (2025-2026)</p>
            </div>
            <div className="flex space-x-2">
               <div className="flex items-center text-xs text-neutral-400 bg-neutral-800/50 px-3 py-1.5 rounded-lg border border-neutral-700">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-2"></div>
                  Actual
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0A0A0A] border border-neutral-700 p-4 rounded-lg shadow-xl">
                          <p className="text-neutral-400 text-sm mb-1">{label}</p>
                          <p className="text-[#FFD700] font-bold text-lg">${payload[0].value.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Bar 
                  dataKey="revenue" 
                  radius={[4, 4, 0, 0]}
                  onMouseEnter={(_, index) => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {revenueData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={hoveredBarIndex === index ? '#FFD700' : '#525252'} 
                      fillOpacity={1}
                      className="transition-colors duration-200"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div variants={itemVariants} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white italic tracking-wide uppercase">Live Feed</h3>
            <Activity size={20} className="text-[#FFD700]" />
          </div>
          <div className="space-y-6">
            {activityFeed.map((item, i) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-start space-x-4 group"
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border
                  ${item.type === 'success' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 
                    item.type === 'pending' ? 'bg-orange-500/10 border-orange-500 text-orange-500' :
                    'bg-blue-500/10 border-blue-500 text-blue-500'}
                `}>
                  {item.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-[#FFD700] transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs font-semibold ${
                      item.type === 'success' ? 'text-emerald-400' : 
                      item.type === 'pending' ? 'text-neutral-400' : 'text-blue-400'
                    }`}>
                      {item.amount}
                    </span>
                    <span className="text-xs text-neutral-600">{item.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button 
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="w-full mt-6 py-3 rounded-lg border border-neutral-800 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
          >
            View All Activity
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};