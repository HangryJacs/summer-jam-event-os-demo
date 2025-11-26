import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Calendar, Eye, Edit, FileText } from 'lucide-react';
import { Sponsor } from '../types';

interface SponsorCardProps {
  sponsor: Sponsor;
  isOverlay?: boolean;
  onClick?: () => void;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, isOverlay = false, onClick }) => {
  return (
    <motion.div 
      layout
      onClick={onClick}
      whileHover={!isOverlay ? { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)" } : {}}
      className={`bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-sm transition-all relative select-none
        ${isOverlay ? 'shadow-2xl border-[#FFD700] scale-105 cursor-grabbing z-50' : 'hover:border-[#FFD700]/30 cursor-grab active:cursor-grabbing group'}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-inner ${sponsor.color}`}>
          {sponsor.initials}
        </div>
        {!isOverlay && (
          <div className="flex items-center space-x-2">
             <img src={sponsor.owner.avatar} alt={sponsor.owner.name} className="w-6 h-6 rounded-full border border-neutral-800" title={`Owner: ${sponsor.owner.name}`} />
             <button className="text-neutral-600 hover:text-white transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        )}
      </div>
      
      <h4 className="text-white font-bold text-base mb-1">{sponsor.name}</h4>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide bg-neutral-800 text-neutral-400 border border-neutral-700">
          {sponsor.category}
        </span>
      </div>

      <div className="flex items-end justify-between mt-2 pt-3 border-t border-neutral-800/50">
        <div>
          <p className="text-xs text-neutral-500 mb-0.5">Value</p>
          <p className="text-[#FFD700] font-bold font-mono">${(sponsor.value / 1000).toFixed(0)}k</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-500 mb-0.5">Last Contact</p>
          <div className="flex items-center text-xs text-neutral-300">
            <Calendar size={10} className="mr-1" />
            {sponsor.lastContact}
          </div>
        </div>
      </div>

      {/* Quick Actions (Hover) */}
      {!isOverlay && (
        <div className="hidden group-hover:flex absolute bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-neutral-800 rounded-b-xl py-2 justify-around animate-in slide-in-from-bottom-2 duration-200">
          <button className="text-neutral-400 hover:text-[#FFD700]" title="View"><Eye size={14}/></button>
          <button className="text-neutral-400 hover:text-[#FFD700]" title="Edit"><Edit size={14}/></button>
          <button className="text-neutral-400 hover:text-[#FFD700]" title="Create Pitch"><FileText size={14}/></button>
        </div>
      )}
    </motion.div>
  );
};