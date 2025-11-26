import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Map as MapIcon, Clock3, ListTodo } from 'lucide-react';
import { eventSchedule, logisticsTasks } from '../constants';

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

const SiteMap = () => {
  return (
    <div className="relative w-full h-full bg-[#1a1a1a] rounded-xl overflow-hidden border border-neutral-800 p-8">
       {/* Map Background / Grid */}
       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
       
       {/* Zones */}
       <div className="absolute top-10 left-10 text-neutral-500 font-bold uppercase tracking-widest">Entrance</div>
       
       {/* Main Court */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[70%] border-2 border-neutral-700 rounded-lg flex items-center justify-center">
          <div className="text-neutral-600 font-black text-4xl opacity-20 uppercase">Main Court</div>
       </div>

       {/* Sponsor Zones (Draggable-ish) */}
       <motion.div drag dragMomentum={false} className="absolute top-20 right-20 bg-blue-900/80 border border-blue-500 p-4 rounded-lg cursor-grab active:cursor-grabbing w-40 text-center z-20">
          <div className="text-xs text-blue-300 font-bold uppercase mb-1">Activation</div>
          <div className="font-bold text-white">Red Bull Zone</div>
       </motion.div>

       <motion.div drag dragMomentum={false} className="absolute bottom-20 right-40 bg-red-900/80 border border-red-500 p-4 rounded-lg cursor-grab active:cursor-grabbing w-40 text-center z-20">
          <div className="text-xs text-red-300 font-bold uppercase mb-1">Retail</div>
          <div className="font-bold text-white">Foot Locker</div>
       </motion.div>

       <motion.div drag dragMomentum={false} className="absolute bottom-20 left-20 bg-neutral-800/80 border border-neutral-600 p-4 rounded-lg cursor-grab active:cursor-grabbing w-40 text-center z-20">
          <div className="text-xs text-neutral-400 font-bold uppercase mb-1">Services</div>
          <div className="font-bold text-white">Medical Tent</div>
       </motion.div>
    </div>
  );
};

const RunOfShow = () => (
  <div className="space-y-4">
    {eventSchedule.map((event, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-center p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
      >
        <div className="w-24 font-mono text-[#FFD700] font-bold">{event.time}</div>
        <div className="flex-1">
          <div className="font-bold text-white">{event.title}</div>
          <div className="text-xs text-neutral-500 uppercase tracking-wider">{event.category}</div>
        </div>
        {event.sponsor && (
           <span className="px-3 py-1 rounded-full bg-neutral-800 text-white text-xs font-bold border border-neutral-700">
             {event.sponsor}
           </span>
        )}
      </motion.div>
    ))}
  </div>
);

const LogisticsList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     {logisticsTasks.map((task) => (
       <div key={task.id} className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl flex justify-between items-center">
          <div>
             <div className="font-bold text-white">{task.title}</div>
             <div className="text-xs text-neutral-500">Assigned to: {task.assignee}</div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold 
            ${task.status === 'Complete' ? 'bg-emerald-500/20 text-emerald-400' : 
              task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 
              'bg-neutral-700 text-neutral-400'}`}>
            {task.status}
          </div>
       </div>
     ))}
  </div>
);

export const EventsView = () => {
  const [activeTab, setActiveTab] = useState<'Map' | 'Schedule' | 'Logistics'>('Map');

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 animate-in fade-in duration-500"
    >
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
          <div>
             <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-1">Event Operations</h2>
             <div className="flex items-center text-sm text-neutral-400">
                <CalendarDays size={14} className="mr-2"/>
                <span className="text-[#FFD700] font-bold mr-2">Jan 18 Qualifier</span>
                <span className="text-neutral-600">•</span>
                <span className="ml-2">Melbourne</span>
             </div>
          </div>
          <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800">
             {[
               { id: 'Map', icon: MapIcon, label: 'Site Map' },
               { id: 'Schedule', icon: Clock3, label: 'Run of Show' },
               { id: 'Logistics', icon: ListTodo, label: 'Logistics' }
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`px-4 py-2 rounded-md text-sm font-bold flex items-center transition-all ${
                   activeTab === tab.id 
                     ? 'bg-[#FFD700] text-black shadow-sm' 
                     : 'text-neutral-400 hover:text-white'
                 }`}
               >
                 <tab.icon size={14} className="mr-2" />
                 {tab.label}
               </button>
             ))}
          </div>
       </div>

       {/* Main Content Area */}
       <div className="h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'Map' && (
              <motion.div 
                key="map"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <SiteMap />
              </motion.div>
            )}
            {activeTab === 'Schedule' && (
              <motion.div 
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <RunOfShow />
              </motion.div>
            )}
            {activeTab === 'Logistics' && (
              <motion.div 
                key="logistics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <LogisticsList />
              </motion.div>
            )}
          </AnimatePresence>
       </div>
    </motion.div>
  );
};