import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Sponsor } from '../types';
import { categories, columns } from '../constants';
import { SponsorCard } from '../components/SponsorCard';
import { CompanyProfileModal } from '../components/CompanyProfileModal';
import { CountUp } from '../components/Common';

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

const DragOverlay = ({ item }: { item: Sponsor | null }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (!item) return;

    const handlePointerMove = (e: PointerEvent) => {
      x.set(e.clientX - 150);
      y.set(e.clientY - 60);
      rotate.set(Math.random() * 2 - 1);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [item, x, y, rotate]);

  if (!item) return null;

  return createPortal(
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x,
        y,
        rotate,
        scale: 1.05,
        zIndex: 9999,
        pointerEvents: 'none',
        width: 280,
      }}
    >
      <SponsorCard sponsor={item} isOverlay={true} />
    </motion.div>,
    document.body
  );
};

export const SponsorsView: React.FC<{ sponsors: Sponsor[], setSponsors: React.Dispatch<React.SetStateAction<Sponsor[]>> }> = ({ sponsors, setSponsors }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDragItem, setActiveDragItem] = useState<Sponsor | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent, sponsor: Sponsor) => {
    if (e.button !== 0) return;
    setActiveDragItem(sponsor);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleGlobalPointerUp = (e: PointerEvent) => {
    if (activeDragItem && dragStartRef.current) {
      const dist = Math.hypot(e.clientX - dragStartRef.current.x, e.clientY - dragStartRef.current.y);
      if (dist < 5) {
        setSelectedSponsor(activeDragItem);
      }
    }
    setActiveDragItem(null);
    dragStartRef.current = null;
  };

  const handleGlobalPointerMove = (e: React.PointerEvent) => {
    if (!activeDragItem) return;

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    
    const columnEl = elements.find(el => el.getAttribute('data-column-id'));
    const targetStatus = columnEl?.getAttribute('data-column-id') as Sponsor['status'] | undefined;

    const cardEl = elements.find(el => el.getAttribute('data-sponsor-id'));
    const targetId = cardEl?.getAttribute('data-sponsor-id');

    if (targetStatus && targetStatus !== activeDragItem.status) {
       setSponsors(prev => {
         const newArr = [...prev];
         const itemIndex = newArr.findIndex(s => s.id === activeDragItem.id);
         newArr[itemIndex] = { ...newArr[itemIndex], status: targetStatus };
         return newArr;
       });
    } else if (targetId && targetId !== activeDragItem.id) {
       setSponsors(prev => {
         const newArr = [...prev];
         const oldIndex = newArr.findIndex(s => s.id === activeDragItem.id);
         const newIndex = newArr.findIndex(s => s.id === targetId);
         
         if (newArr[oldIndex].status === newArr[newIndex].status) {
           const [movedItem] = newArr.splice(oldIndex, 1);
           newArr.splice(newIndex, 0, movedItem);
           return newArr;
         }
         return prev;
       });
    }
  };

  useEffect(() => {
    if (activeDragItem) {
      window.addEventListener('pointerup', handleGlobalPointerUp);
      // @ts-ignore
      window.addEventListener('pointermove', handleGlobalPointerMove);
    } else {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      // @ts-ignore
      window.removeEventListener('pointermove', handleGlobalPointerMove);
    }
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      // @ts-ignore
      window.removeEventListener('pointermove', handleGlobalPointerMove);
    };
  }, [activeDragItem]);

  useEffect(() => {
    const body = document.body;
    if (activeDragItem) {
      body.style.userSelect = 'none';
      body.style.webkitUserSelect = 'none';
    } else {
      body.style.userSelect = '';
      body.style.webkitUserSelect = '';
    }
  }, [activeDragItem]);

  const filteredSponsors = useMemo(() => {
    return sponsors.filter(s => {
      const matchesCategory = filterCategory === 'All' || s.category === filterCategory;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [sponsors, filterCategory, searchQuery]);

  const totalValue = filteredSponsors
    .filter(s => ['Prospecting', 'Negotiating', 'Contracted'].includes(s.status))
    .reduce((acc, curr) => acc + curr.value, 0);

  const deliveredValue = filteredSponsors
    .filter(s => s.status === 'Delivered')
    .reduce((acc, curr) => acc + curr.value, 0);

  return (
    <LayoutGroup>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 h-[calc(100vh-140px)] flex flex-col"
      >
        <DragOverlay item={activeDragItem} />
        
        <AnimatePresence>
          {selectedSponsor && (
            <CompanyProfileModal 
              sponsor={selectedSponsor} 
              onClose={() => setSelectedSponsor(null)} 
            />
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants} className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative group w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-[#FFD700]" size={16} />
              <input 
                type="text" 
                placeholder="Search sponsors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-[#FFD700] w-full sm:w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-hide">
              <Filter size={16} className="text-neutral-500 mr-1 flex-shrink-0" />
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    filterCategory === cat 
                      ? 'bg-white text-black' 
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between xl:justify-end gap-4 w-full xl:w-auto">
            <div className="flex flex-col items-end">
              <span className="text-xs text-neutral-500 uppercase tracking-wider">Pipeline Value</span>
              <span className="text-2xl font-black text-[#FFD700] italic">
                <CountUp value={`$${totalValue}`} />
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-neutral-500 uppercase tracking-wider">Delivered Value</span>
              <span className="text-2xl font-black text-emerald-500 italic">
                <CountUp value={`$${deliveredValue}`} />
              </span>
            </div>
            <motion.button 
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="flex items-center space-x-2 bg-[#FFD700] hover:bg-[#E6C200] text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-[0_0_10px_rgba(255,215,0,0.2)]"
            >
              <Plus size={18} />
              <span>Add Sponsor</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="flex-1 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
          <motion.div 
            variants={containerVariants}
            className="flex flex-row min-w-full h-full gap-4 lg:gap-6"
          >
            {columns.map(column => {
              const columnSponsors = filteredSponsors.filter(s => s.status === column.id);
              const columnValue = columnSponsors.reduce((acc, curr) => acc + curr.value, 0);

              return (
                <motion.div 
                  key={column.id}
                  variants={itemVariants}
                  data-column-id={column.id}
                  className="w-[85vw] sm:w-[350px] lg:w-auto lg:flex-1 lg:min-w-[280px] flex-shrink-0 flex flex-col bg-neutral-900/30 rounded-xl border border-neutral-800/50 relative snap-center"
                >
                  <div className={`p-4 border-b-2 ${column.color} bg-neutral-900/80 rounded-t-xl backdrop-blur-sm sticky top-0 z-10`}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-white uppercase tracking-wider text-sm">{column.title}</h3>
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded-full font-mono">
                        {columnSponsors.length}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#FFD700] font-mono">
                      ${(columnValue / 1000).toFixed(0)}k
                    </div>
                  </div>

                  <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
                    <AnimatePresence>
                      {columnSponsors.map(sponsor => (
                         <motion.div
                           layout
                           key={sponsor.id}
                           layoutId={sponsor.id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: activeDragItem?.id === sponsor.id ? 0.3 : 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           onPointerDown={(e) => handlePointerDown(e, sponsor)}
                           data-sponsor-id={sponsor.id}
                           className="touch-none"
                         >
                            <SponsorCard 
                              sponsor={sponsor} 
                            />
                         </motion.div>
                      ))}
                    </AnimatePresence>
                    {columnSponsors.length === 0 && (
                      <div className="h-24 border-2 border-dashed border-neutral-800 rounded-xl flex items-center justify-center">
                        <span className="text-neutral-600 text-xs uppercase tracking-widest">Drop here</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
};