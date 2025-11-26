import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, FileText, BarChart3, Activity, MoreHorizontal, Bell, Menu, X } from 'lucide-react';
import { ViewState, Sponsor } from './types';
import { initialSponsors } from './constants';
import { DemoBadge, SidebarItem } from './components/Common';
import { DashboardView } from './views/DashboardView';
import { SponsorsView } from './views/SponsorsView';
import { PitchAgentView } from './views/PitchAgentView';
import { AnalyticsView } from './views/AnalyticsView';
import { EventsView } from './views/EventsView';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewState>('Dashboard');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#FFD700] selection:text-black">
      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FFD700;
        }
      `}</style>
      
      <DemoBadge />
      
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0A0A0A] border-r border-neutral-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
            <div className="w-8 h-8 bg-white text-black rounded-sm flex items-center justify-center font-black italic text-lg border-2 border-[#FFD700]">
              SJ
            </div>
            <span className="font-black italic text-xl tracking-tighter text-white">
              SUMMER<span className="text-[#FFD700]">JAM</span>
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-400">
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-2">
          {['Dashboard', 'Sponsors', 'Pitches', 'Analytics', 'Events', 'Settings'].map((item) => (
            <SidebarItem 
              key={item} 
              icon={
                item === 'Dashboard' ? LayoutDashboard :
                item === 'Sponsors' ? Users :
                item === 'Pitches' ? FileText :
                item === 'Analytics' ? BarChart3 :
                item === 'Events' ? Activity :
                MoreHorizontal
              }
              label={item}
              active={activeTab === item}
              isDemo={item === 'Settings'}
              onClick={() => {
                if (item !== 'Settings') {
                  setActiveTab(item as ViewState);
                  setSidebarOpen(false);
                }
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-neutral-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFD700] to-orange-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                <span className="font-bold text-xs text-white">DE</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Daniel Ella</p>
              <p className="text-xs text-neutral-500">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:ml-64 min-h-screen transition-all duration-300 flex flex-col">
        
        <header className={`sticky top-0 z-30 px-6 py-4 flex items-center justify-between transition-colors duration-200 ${
          scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent'
        }`}>
          <div className="flex items-center lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="text-white mr-4">
              <Menu size={24} />
            </button>
            <span className="font-black italic text-lg">SJ OS</span>
          </div>

          <div className="hidden lg:flex items-center text-neutral-400 text-sm">
            <span className="mr-2">Overview</span> / <span className="mx-2 text-white">{activeTab}</span>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative p-2 text-neutral-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF4C29] rounded-full animate-pulse"></span>
            </motion.button>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-10 max-w-[1600px] w-full mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'Dashboard' && (
              <DashboardView 
                key="dashboard" 
                hoveredBarIndex={hoveredBarIndex} 
                setHoveredBarIndex={setHoveredBarIndex}
                sponsors={sponsors} 
              />
            )}
            {activeTab === 'Sponsors' && (
              <SponsorsView 
                key="sponsors" 
                sponsors={sponsors} 
                setSponsors={setSponsors}
              />
            )}
            {activeTab === 'Pitches' && (
              <PitchAgentView key="pitches" />
            )}
            {activeTab === 'Analytics' && (
              <AnalyticsView key="analytics" sponsors={sponsors} />
            )}
            {activeTab === 'Events' && (
              <EventsView key="events" />
            )}
            {activeTab !== 'Dashboard' && activeTab !== 'Sponsors' && activeTab !== 'Pitches' && activeTab !== 'Analytics' && activeTab !== 'Events' && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center h-[50vh] text-neutral-500"
              >
                <div className="p-4 rounded-full bg-neutral-900 mb-4">
                  <MoreHorizontal size={48} />
                </div>
                <h2 className="text-2xl font-black italic text-white uppercase mb-2">{activeTab}</h2>
                <p>Module under construction for Summer Jam 2026.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}