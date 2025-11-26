import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Briefcase, Mail, History, Eye, Copy, Check } from 'lucide-react';
import { Sponsor } from '../types';
import { inventoryItems, tiers, presentationHistory } from '../constants';

interface CompanyProfileModalProps {
  sponsor: Sponsor;
  onClose: () => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({ sponsor, onClose }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Presentations' | 'Deal Calculator'>('Overview');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setSelectedTier(null); 
  };

  const applyTier = (tierName: string) => {
    // @ts-ignore
    setSelectedItems(tiers[tierName]);
    setSelectedTier(tierName);
  };

  const totalDealValue = selectedItems.reduce((sum, id) => {
    const item = inventoryItems.find(i => i.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-[#0A0A0A] border border-neutral-800 w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-start bg-neutral-900/50">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-inner ${sponsor.color}`}>
              {sponsor.initials}
            </div>
            <div>
              <h2 className="text-3xl font-black italic text-white tracking-tight mb-1">{sponsor.name}</h2>
              <div className="flex items-center space-x-3 text-sm">
                <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 uppercase font-bold text-xs">
                  {sponsor.category}
                </span>
                <span className="text-neutral-500 flex items-center">
                  <Users size={14} className="mr-1" /> Owned by {sponsor.owner.name}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-800 px-6 bg-neutral-900/30">
          {['Overview', 'Presentations', 'Deal Calculator'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wide relative transition-colors ${
                activeTab === tab ? 'text-[#FFD700]' : 'text-neutral-500 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="modalTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#050505]">
          <AnimatePresence mode="wait">
            {activeTab === 'Overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Briefcase size={20} className="mr-2 text-[#FFD700]" /> Company Profile
                    </h3>
                    <p className="text-neutral-400 leading-relaxed mb-4">
                      {sponsor.name} is a leading global brand in the {sponsor.category} sector, known for innovative products and strong youth culture appeal. They have recently shifted focus towards experiential marketing and direct-to-consumer engagement strategies.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-xs text-neutral-500 uppercase font-bold mb-1">Headquarters</div>
                        <div className="text-white">Melbourne, Australia</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 uppercase font-bold mb-1">Annual Revenue</div>
                        <div className="text-white">$4.2B (Global)</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 uppercase font-bold mb-1">Fiscal Year End</div>
                        <div className="text-white">June 30</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 uppercase font-bold mb-1">Key Contact</div>
                        <div className="text-white flex items-center">
                          James Miller <Mail size={12} className="ml-2 text-neutral-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <History size={20} className="mr-2 text-[#FFD700]" /> Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-start space-x-3 pb-4 border-b border-neutral-800 last:border-0 last:pb-0">
                          <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500" />
                          <div>
                            <div className="text-sm text-white font-medium">Meeting with Head of Marketing</div>
                            <div className="text-xs text-neutral-500">2 days ago • Logged by {sponsor.owner.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Deal Status</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neutral-400">Current Stage</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${sponsor.color.split('-')[1]}-500/20 text-${sponsor.color.split('-')[1]}-400 border border-${sponsor.color.split('-')[1]}-500/30`}>
                        {sponsor.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neutral-400">Probability</span>
                      <span className="text-white font-mono">65%</span>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-neutral-400">Est. Value</span>
                      <span className="text-[#FFD700] font-bold font-mono text-lg">${(sponsor.value / 1000).toFixed(0)}k</span>
                    </div>
                    <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-colors">
                      Move to Next Stage
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Presentations' && (
              <motion.div 
                key="presentations"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
                    <div className="text-neutral-400 text-xs font-bold uppercase mb-1">Total Views</div>
                    <div className="text-3xl font-black text-white">44</div>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
                    <div className="text-neutral-400 text-xs font-bold uppercase mb-1">Avg. Time Spent</div>
                    <div className="text-3xl font-black text-white">5m 12s</div>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
                    <div className="text-neutral-400 text-xs font-bold uppercase mb-1">Link Clicks</div>
                    <div className="text-3xl font-black text-[#FFD700]">19</div>
                  </div>
                </div>

                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 text-neutral-500 font-medium text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Version</th>
                        <th className="px-6 py-4">Date Sent</th>
                        <th className="px-6 py-4">Views</th>
                        <th className="px-6 py-4">Clicks</th>
                        <th className="px-6 py-4">Time Spent</th>
                        <th className="px-6 py-4">Heat</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-neutral-300">
                      {presentationHistory.map((row, i) => (
                        <tr key={i} className="hover:bg-neutral-800/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{row.version}</td>
                          <td className="px-6 py-4">{row.date}</td>
                          <td className="px-6 py-4">{row.views}</td>
                          <td className="px-6 py-4">{row.clicks}</td>
                          <td className="px-6 py-4">{row.time}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              row.status === 'Hot' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-neutral-800 text-neutral-400'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-neutral-400 hover:text-white mr-3"><Eye size={16}/></button>
                            <button className="text-neutral-400 hover:text-white"><Copy size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'Deal Calculator' && (
              <motion.div 
                key="calculator"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex flex-col lg:flex-row gap-8 h-full"
              >
                <div className="flex-1 space-y-6">
                  {/* Tiers */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.keys(tiers).map(tier => (
                      <button
                        key={tier}
                        onClick={() => applyTier(tier)}
                        className={`p-4 rounded-xl border transition-all text-center ${
                          selectedTier === tier 
                            ? 'bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700]' 
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800'
                        }`}
                      >
                        <div className="text-sm font-bold uppercase tracking-wider">{tier} Package</div>
                      </button>
                    ))}
                  </div>

                  {/* Inventory List */}
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden">
                    <div className="p-4 bg-neutral-900 border-b border-neutral-800 font-bold text-white text-sm uppercase tracking-wider">
                      Inventory Selector
                    </div>
                    <div className="divide-y divide-neutral-800">
                      {['Physical', 'Digital', 'Experiential'].map(cat => (
                        <div key={cat}>
                          <div className="px-4 py-2 bg-neutral-900/80 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                            {cat} Assets
                          </div>
                          {inventoryItems.filter(i => i.category === cat).map(item => (
                            <div 
                              key={item.id}
                              onClick={() => toggleItem(item.id)}
                              className="px-4 py-3 flex items-center justify-between hover:bg-neutral-800/50 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${
                                  selectedItems.includes(item.id) 
                                    ? 'bg-[#FFD700] border-[#FFD700] text-black' 
                                    : 'border-neutral-600'
                                }`}>
                                  {selectedItems.includes(item.id) && <Check size={14} strokeWidth={3} />}
                                </div>
                                <span className={selectedItems.includes(item.id) ? 'text-white font-medium' : 'text-neutral-400'}>
                                  {item.name}
                                </span>
                              </div>
                              <span className="font-mono text-neutral-500 text-sm">${(item.price / 1000).toFixed(0)}k</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary Panel */}
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sticky top-0">
                    <h3 className="text-lg font-bold text-white mb-6">Package Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      {selectedItems.length === 0 ? (
                        <div className="text-neutral-500 text-sm italic">No items selected</div>
                      ) : (
                        selectedItems.map(id => {
                          const item = inventoryItems.find(i => i.id === id);
                          return item ? (
                            <div key={id} className="flex justify-between text-sm">
                              <span className="text-neutral-300">{item.name}</span>
                              <span className="text-neutral-500 font-mono">${(item.price / 1000).toFixed(0)}k</span>
                            </div>
                          ) : null;
                        })
                      )}
                    </div>

                    <div className="pt-4 border-t border-neutral-800">
                      <div className="flex justify-between items-end mb-6">
                        <span className="text-neutral-400 text-sm font-bold uppercase">Total Value</span>
                        <span className="text-3xl font-black text-[#FFD700] tracking-tight">
                          ${(totalDealValue / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-black font-bold py-3 rounded-lg transition-colors mb-3 shadow-lg shadow-[#FFD700]/10">
                        Update Deal Value
                      </button>
                      <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-lg transition-colors border border-neutral-700">
                        Generate Contract
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};