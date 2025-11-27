import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Plus, Users, Bot, Search, MoreHorizontal, Send, Sparkles, Zap, Eye, ChevronLeft, ChevronRight, History as HistoryIcon, LayoutTemplate, Camera, Ticket, Image as ImageIcon } from 'lucide-react';
import { ChatMessage } from '../types';
import { DemoTooltip } from '../components/Common';

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

const recentChats = [
  { id: 1, name: "ASICS Campaign", date: "Just now", active: true, initials: "AS", color: "bg-blue-600" },
  { id: 2, name: "Red Bull Summer", date: "2 days ago", active: false, initials: "RB", color: "bg-blue-900" },
  { id: 3, name: "Foot Locker 2026", date: "1 week ago", active: false, initials: "FL", color: "bg-red-600" },
  { id: 4, name: "Spotify Audio", date: "2 weeks ago", active: false, initials: "SP", color: "bg-green-500" }
];

export const PitchAgentView = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      content: "I need to pitch ASICS - footwear brand, $80k budget, focusing on sneaker culture",
      timestamp: new Date()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(true);
  const [researchStep, setResearchStep] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Research loading component
  const ResearchLoading = ({ step }: { step: number }) => {
    const researchSteps = [
      { label: "Analyzing brand identity", done: step > 1 },
      { label: "Scanning market positioning", done: step > 2 },
      { label: "Reviewing recent campaigns", done: step > 3 },
      { label: "Compiling insights", done: step > 4 },
    ];
    
    return (
      <div className="space-y-3">
        <p>Great! Let me research ASICS...</p>
        <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50 space-y-2">
          <div className="flex items-center text-[#FFD700] text-sm font-bold mb-3">
            <Loader2 size={16} className="mr-2 animate-spin" /> Researching...
          </div>
          <div className="space-y-2">
            {researchSteps.map((s, i) => (
              <div key={i} className="flex items-center text-sm">
                {s.done ? (
                  <CheckCircle2 size={14} className="text-emerald-500 mr-2" />
                ) : i + 1 === step ? (
                  <Loader2 size={14} className="text-[#FFD700] animate-spin mr-2" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-neutral-700 mr-2" />
                )}
                <span className={s.done ? "text-neutral-300" : i + 1 === step ? "text-white" : "text-neutral-600"}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Research complete component  
  const ResearchComplete = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-3"
    >
      <p>Great! Let me research ASICS...</p>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50 space-y-2"
      >
        <div className="flex items-center text-emerald-400 text-sm font-bold mb-2">
          <CheckCircle2 size={16} className="mr-2" /> Research complete!
        </div>
        <div className="text-sm space-y-1 text-neutral-300">
          <p><span className="text-neutral-500 font-bold uppercase text-xs w-24 inline-block">Founded</span> 1949, Japanese athletic brand</p>
          <p><span className="text-neutral-500 font-bold uppercase text-xs w-24 inline-block">Focus</span> Performance running, streetwear collaborations</p>
          <p><span className="text-neutral-500 font-bold uppercase text-xs w-24 inline-block">Campaign</span> "Sound Mind, Sound Body"</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>I recommend focusing on:</p>
        <ul className="list-disc pl-5 text-sm text-neutral-300 space-y-1">
          <li>Authentic street culture connection</li>
          <li>Performance meets style positioning</li>
          <li>Youth culture credibility</li>
        </ul>
        <p className="font-bold text-[#FFD700]">Ready to develop activation concepts?</p>
      </motion.div>
    </motion.div>
  );

  // Simulated conversation flow
  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const flow = async () => {
      // Step 1: AI Research - show loading state first
      await wait(1000);
      if (cancelled) return;
      
      // Add initial "researching" message
      setMessages(prev => [...prev, {
        id: '2',
        role: 'ai',
        content: <ResearchLoading step={0} />,
        timestamp: new Date()
      }]);

      // Delay before starting research steps animation
      await wait(750);
      if (cancelled) return;

      // Animate through research steps
      for (let i = 1; i <= 4; i++) {
        await wait(700);
        if (cancelled) return;
        setResearchStep(i);
        setMessages(prev => prev.map(msg => 
          msg.id === '2' ? { ...msg, content: <ResearchLoading step={i} /> } : msg
        ));
      }

      // Pause on final step before showing complete
      await wait(1000);
      if (cancelled) return;

      // Show complete research
      await wait(500);
      if (cancelled) return;
      setMessages(prev => prev.map(msg => 
        msg.id === '2' ? { ...msg, content: <ResearchComplete /> } : msg
      ));

      // Step 2: User Response (add slight delay for natural feel)
      await wait(2000);
      if (cancelled) return;
      setMessages(prev => [...prev, {
        id: '3',
        role: 'user',
        content: "Yes, show me 3 activation ideas",
        timestamp: new Date()
      }]);

      // Step 3: AI thinking before concepts
      await wait(800);
      if (cancelled) return;
      
      // Add "thinking" message first
      setMessages(prev => [...prev, {
        id: '4',
        role: 'ai',
        content: (
          <div className="flex items-center gap-2 text-neutral-400">
            <Loader2 size={16} className="animate-spin" />
            <span>Generating activation concepts...</span>
          </div>
        ),
        timestamp: new Date()
      }]);

      // Replace with full concepts after delay
      await wait(2000);
      if (cancelled) return;
      
      const ConceptCard = ({ concept, index }: { concept: any; index: number }) => {
        const [expanded, setExpanded] = React.useState(false);
        
        const details = [
          {
            features: [
              "360° rotating camera platform",
              "AI-powered highlight reel generation",
              "Instant social media sharing",
              "Custom ASICS branded backgrounds",
              "Digital collectible rewards"
            ],
            metrics: {
              reach: "3,500+ participants",
              engagement: "85% social share rate",
              impressions: "250K+ social impressions"
            }
          },
          {
            features: [
              "Limited edition display gallery",
              "AR virtual try-on experience",
              "Meet & greet with designers",
              "Exclusive pre-order access",
              "Custom sneaker personalization station"
            ],
            metrics: {
              reach: "5,000+ interactions",
              engagement: "92% dwell time increase",
              conversions: "45% pre-order rate"
            }
          },
          {
            features: [
              "Professional gait analysis & fitting",
              "Meet professional athletes",
              "VIP-only product drops",
              "Premium refreshments & lounge",
              "Personalized training tips"
            ],
            metrics: {
              reach: "1,200+ VIP guests",
              engagement: "40min average visit time",
              satisfaction: "96% satisfaction rate"
            }
          }
        ];
        
        return (
          <div className="bg-[#151515] rounded-xl border border-neutral-800 overflow-hidden shadow-sm">
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="w-full p-4 hover:bg-[#1a1a1a] transition-all cursor-pointer group text-left"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-white flex items-center text-sm">
                  <span className="p-1.5 bg-neutral-800 rounded-md mr-3">{concept.icon}</span> 
                  {concept.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-neutral-900 text-neutral-400 px-2 py-1 rounded border border-neutral-800">{concept.reach}</span>
                  <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#FFD700]"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed pl-[42px]">{concept.desc}</p>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-[#FFD700] font-bold opacity-0 group-hover:opacity-100 transition-opacity pl-[42px]">
                <Eye size={12} /> Click to {expanded ? 'collapse' : 'expand'} details
              </div>
            </motion.button>
            
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 border-t border-neutral-800 space-y-4">
                    <div>
                      <h5 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-2">Key Features</h5>
                      <ul className="space-y-1.5">
                        {details[index].features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 text-neutral-300 text-xs"
                          >
                            <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-900/50 p-3 rounded-lg border border-neutral-700">
                      <h5 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-2">Expected Metrics</h5>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(details[index].metrics).map(([key, value], i) => (
                          <div key={i} className="text-center">
                            <div className="text-[9px] text-neutral-500 uppercase mb-0.5">{key}</div>
                            <div className="text-white font-bold text-xs">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      };
      
      setMessages(prev => prev.map(msg =>
        msg.id === '4' ? {
          ...msg,
          content: (
            <div className="space-y-4">
              <p>Here are 3 activation concepts tailored for ASICS:</p>
              <div className="grid gap-3">
                {[
                  {
                    icon: <Camera size={18} className="text-white" />,
                    title: "Sneaker Cam 360",
                    desc: "Rotating platform for attendees to show off their sneaker game. AI-generated highlights reel.",
                    reach: "3,500+ participants"
                  },
                  {
                    icon: <ImageIcon size={18} className="text-white" />,
                    title: "Sole Culture Showcase",
                    desc: "Interactive sneaker display featuring limited edition ASICS x Street Culture collab.",
                    reach: "5,000+ interactions"
                  },
                  {
                    icon: <Ticket size={18} className="text-white" />,
                    title: "Run Culture Lounge",
                    desc: "VIP experience zone with custom fitting sessions, athlete meet & greets, and exclusive drops.",
                    reach: "1,200+ VIP guests"
                  }
                ].map((concept, i) => (
                  <ConceptCard key={i} concept={concept} index={i} />
                ))}
              </div>
              <p className="text-sm text-neutral-400">Which concept resonates most?</p>
            </div>
          )
        } : msg
      ));

      // Step 4: User Selection (add more natural pause)
      await wait(2500);
      if (cancelled) return;
      setMessages(prev => [...prev, {
        id: '5',
        role: 'user',
        content: "Love Concept 1 and 3 combined",
        timestamp: new Date()
      }]);

      // Step 5: AI acknowledgment before generation
      await wait(1200);
      if (cancelled) return;
      
      // Add quick acknowledgment
      setMessages(prev => [...prev, {
        id: '6-temp',
        role: 'ai',
        content: "Excellent choice! Combining those creates a powerful experience. Let me build your pitch deck...",
        timestamp: new Date()
      }]);

      // Start generation phase
      await wait(1000);
      if (cancelled) return;
      setIsGenerating(true);
      
      const steps = [
        "Strategic positioning",
        "Audience analysis",
        "Activation details",
        "ROI projections",
        "Investment breakdown"
      ];

      for (let i = 0; i <= steps.length; i++) {
        if (cancelled) return;
        setProgressStep(i);
        await wait(800);
      }

      // Remove temp message and add copy review
      if (cancelled) return;
      setMessages(prev => prev.filter(msg => msg.id !== '6-temp'));
      setIsGenerating(false);
      
      if (cancelled) return;
      
      setMessages(prev => [...prev, {
        id: '6',
        role: 'ai',
        content: (
          <div className="space-y-4">
            <p>I've generated your pitch deck structure. Please review the copy before we proceed:</p>
            
            <div className="bg-[#151515] p-5 rounded-xl border border-neutral-800 space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-neutral-800">
                <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                  <LayoutTemplate size={16} className="text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">Pitch Deck Preview</h4>
                  <p className="text-xs text-neutral-400">ASICS x Summer Jam Partnership Proposal</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Opening Hook</div>
                  <p className="text-neutral-300 leading-relaxed">"Where Performance Meets Culture: ASICS Activates at Summer Jam 2026"</p>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Value Proposition</div>
                  <p className="text-neutral-300 leading-relaxed">Connect with 45,000+ streetwear enthusiasts through authentic sneaker culture experiences that blend performance innovation with style credibility.</p>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Key Activations</div>
                  <ul className="text-neutral-300 leading-relaxed space-y-1">
                    <li>• Sneaker Cam 360 - Interactive showcase platform</li>
                    <li>• Run Culture Lounge - Premium VIP experience zone</li>
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Investment & ROI</div>
                  <p className="text-neutral-300 leading-relaxed">$80,000 investment • 250K+ social impressions • 4,700+ direct engagements</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neutral-800 flex gap-3">
                <DemoTooltip>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 bg-neutral-800 text-neutral-400 font-bold rounded-lg hover:bg-neutral-700 transition-colors opacity-80"
                  >
                    Request Changes
                  </motion.button>
                </DemoTooltip>
              </div>
            </div>
          </div>
        ),
        timestamp: new Date()
      }]);

      // Simulate user approval after delay
      await wait(3500);
      if (cancelled) return;
      
      setMessages(prev => [...prev, {
        id: '7',
        role: 'user',
        content: "Looks great! Approve the copy.",
        timestamp: new Date()
      }]);

      // AI generates pitch deck
      await wait(1500);
      if (cancelled) return;
      
      const PitchDeckLoading = () => {
        const [generationStep, setGenerationStep] = React.useState(0);
        const [isComplete, setIsComplete] = React.useState(false);
        const [showReady, setShowReady] = React.useState(false);
        const stepConfig = [
          { text: "Analyzing brand alignment...", delay: 800 },
          { text: "Structuring narrative flow...", delay: 900 },
          { text: "Optimizing visual hierarchy...", delay: 850 },
          { text: "Finalizing pitch deck...", delay: 1000 }
        ];
        
        React.useEffect(() => {
          let isMounted = true;
          const runSteps = async () => {
            for (let i = 0; i < stepConfig.length; i++) {
              await new Promise(resolve => setTimeout(resolve, stepConfig[i].delay));
              if (!isMounted) return;
              setGenerationStep(i + 1);
            }
            await new Promise(resolve => setTimeout(resolve, 400));
            if (!isMounted) return;
            setIsComplete(true);
            await new Promise(resolve => setTimeout(resolve, 600));
            if (!isMounted) return;
            setShowReady(true);
          };
          
          runSteps();
          return () => {
            isMounted = false;
          };
        }, []);
        
        return (
          <AnimatePresence mode="wait">
            {!showReady ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <p>Generating your pitch deck now...</p>
                
                <motion.div 
                  className="bg-[#151515] p-4 rounded-xl border border-neutral-800 space-y-3"
                  animate={{
                    borderColor: isComplete ? 'rgb(52, 211, 153)' : 'rgb(38, 38, 38)'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                    <AnimatePresence mode="wait">
                      {isComplete ? (
                        <motion.div
                          key="complete-icon"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", duration: 0.5 }}
                        >
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div key="loading-icon" exit={{ scale: 0, opacity: 0 }}>
                          <Loader2 size={16} className="animate-spin text-[#FFD700]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.span 
                      className="text-sm font-bold"
                      animate={{ color: isComplete ? 'rgb(52, 211, 153)' : 'rgb(255, 255, 255)' }}
                      transition={{ duration: 0.3 }}
                    >
                      {isComplete ? 'Pitch Deck Complete!' : 'Building Pitch Deck'}
                    </motion.span>
                  </div>
                  
                  {stepConfig.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: generationStep > i ? 1 : 0.4,
                        x: 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      {generationStep > i ? (
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      ) : generationStep === i + 1 ? (
                        <Loader2 size={14} className="animate-spin text-[#FFD700] shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-700 shrink-0" />
                      )}
                      <span className={`text-sm ${generationStep > i ? "text-neutral-300" : "text-neutral-500"}`}>
                        {step.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <CheckCircle2 size={16} />
                  Perfect! Your pitch deck is ready.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 bg-[#151515] p-4 rounded-xl border border-neutral-800 border-l-4 border-l-[#FFD700]">
                  <div className="col-span-full mb-2">
                    <div className="flex items-center text-white font-bold text-sm mb-1">
                      <CheckCircle2 size={16} className="text-[#FFD700] mr-2"/> Pitch Deck Ready
                    </div>
                  </div>
                  <DemoTooltip>
                    <motion.button 
                      whileHover={buttonHover} 
                      whileTap={buttonTap} 
                      className="w-full bg-[#FFD700] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#E6C200] transition-colors flex items-center justify-center shadow-[0_4px_14px_0_rgba(255,215,0,0.39)] opacity-80"
                    >
                      <Eye size={18} className="mr-2" /> 
                      Preview Web Pitch
                    </motion.button>
                  </DemoTooltip>
                  <DemoTooltip>
                    <motion.button 
                      whileHover={buttonHover} 
                      whileTap={buttonTap} 
                      className="w-full bg-[#262626] text-neutral-300 font-bold py-3 px-4 rounded-lg hover:bg-[#333] transition-colors border border-neutral-700 opacity-80 flex items-center justify-center"
                    >
                      Generate Canva Deck
                    </motion.button>
                  </DemoTooltip>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };
      
      setMessages(prev => [...prev, {
        id: '8',
        role: 'ai',
        content: <PitchDeckLoading />,
        timestamp: new Date()
      }]);
    };

    flow();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-[calc(100vh-180px)] lg:h-[calc(100vh-140px)] space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-black italic text-white uppercase tracking-tight mb-1">AI Pitch Agent</h1>
           <div className="flex items-center text-sm text-neutral-400">
            <Sparkles size={14} className="mr-2 text-[#FFD700]" />
            <span className="font-medium">Powered by Gemini 2.0 Flash</span>
            <span className="mx-2 text-neutral-700">|</span>
            <span className="text-neutral-500">Generative Partnership Suite</span>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Left Sidebar: History - RAIL STYLE */}
        <motion.div 
          variants={itemVariants} 
          animate={{ width: isHistoryCollapsed ? 80 : 280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden lg:flex flex-col bg-neutral-900/30 border border-neutral-800 rounded-2xl relative overflow-visible shrink-0 transition-all"
        >
           {/* Expand/Collapse Handle */}
           <button 
             onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
             className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-neutral-800 border border-neutral-700 rounded-full z-20 flex items-center justify-start pl-1 hover:bg-neutral-700 text-neutral-400 transition-colors"
           >
             {isHistoryCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
           </button>

           <div className="flex-1 flex flex-col p-4 items-center">
              {/* New Pitch Button */}
              <motion.button 
                whileHover={buttonHover} 
                whileTap={buttonTap} 
                className={`
                  ${isHistoryCollapsed ? 'w-12 h-12 rounded-xl' : 'w-full py-3 px-4 rounded-xl'} 
                  bg-[#FFD700] hover:bg-[#E6C200] text-black font-bold transition-all flex items-center justify-center shadow-lg shadow-[#FFD700]/10 mb-6 shrink-0
                `}
              >
                <Plus size={isHistoryCollapsed ? 24 : 18} />
                {!isHistoryCollapsed && <span className="ml-2 text-sm">New Pitch</span>}
              </motion.button>

              {/* History List */}
              <div className="flex-1 w-full space-y-3 overflow-y-auto overflow-x-visible no-scrollbar flex flex-col items-center px-2 py-3">
                {recentChats.map((chat) => (
                  <div key={chat.id} className="group relative w-full flex justify-center">
                     <motion.button
                       layout
                       whileHover={{ scale: 1.05 }}
                       className={`
                         relative flex items-center transition-all
                         ${isHistoryCollapsed 
                           ? 'w-10 h-10 justify-center rounded-full' 
                           : 'w-full p-3 rounded-xl hover:bg-neutral-800/50 justify-start'}
                         ${chat.active ? (isHistoryCollapsed ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-neutral-900' : 'bg-neutral-800 border border-neutral-700') : ''}
                       `}
                     >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner ${chat.color}`}>
                          {chat.initials}
                        </div>
                        
                        {!isHistoryCollapsed && (
                           <motion.div 
                             initial={{ opacity: 0, x: -10 }} 
                             animate={{ opacity: 1, x: 0 }}
                             className="ml-3 text-left overflow-hidden"
                           >
                             <div className="font-bold text-sm text-white truncate">{chat.name}</div>
                             <div className="text-[10px] text-neutral-500">{chat.date}</div>
                           </motion.div>
                        )}

                        {/* Hover Tooltip for Collapsed State */}
                        {isHistoryCollapsed && (
                          <div className="absolute left-full ml-4 px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-neutral-700 shadow-xl">
                            {chat.name}
                            <div className="absolute top-1/2 right-full -mt-1 border-4 border-transparent border-r-neutral-800" />
                          </div>
                        )}
                     </motion.button>
                     {chat.active && isHistoryCollapsed && <div className="absolute -right-1 top-0 w-2.5 h-2.5 bg-[#FFD700] rounded-full border-2 border-neutral-900" />}
                  </div>
                ))}
              </div>
              
              {/* Bot Icon at Bottom */}
              <div className="mt-auto pt-4 border-t border-neutral-800/50 w-full flex justify-center">
                 <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-[#FFD700]/20 text-[#FFD700]">
                    <Bot size={20} />
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Center: Chat Interface */}
        <motion.div variants={itemVariants} className="flex-1 flex flex-col bg-neutral-900/50 rounded-2xl border border-neutral-800 overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 blur-sm opacity-50 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm tracking-wide">ASICS Campaign</h3>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">AI Assistant Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Search size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <MoreHorizontal size={18} />
              </motion.button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-neutral-800">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === 'ai' 
                    ? 'bg-neutral-800 border-[#FFD700]/30 text-[#FFD700]' 
                    : 'bg-neutral-700 border-neutral-600 text-white'
                }`}>
                  {msg.role === 'ai' ? <Bot size={16} /> : <Users size={16} />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] rounded-2xl p-5 ${
                  msg.role === 'ai' 
                    ? 'bg-transparent text-neutral-200' 
                    : 'bg-[#FFD700] text-black font-medium shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                }`}>
                  {typeof msg.content === 'string' ? (
                    <p className="leading-relaxed">{msg.content}</p>
                  ) : (
                    msg.content
                  )}
                </div>
              </motion.div>
            ))}

            {/* Progress Indicators */}
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-[#FFD700]/30 text-[#FFD700] flex items-center justify-center shrink-0">
                  <Loader2 size={16} className="animate-spin" />
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 w-full max-w-md">
                  <h4 className="text-[#FFD700] font-bold mb-4 flex items-center">
                    <Sparkles size={16} className="mr-2" /> Generating Pitch...
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Strategic positioning",
                      "Audience analysis",
                      "Activation details",
                      "ROI projections",
                      "Investment breakdown"
                    ].map((step, i) => (
                      <div key={i} className="flex items-center text-sm">
                        {i < progressStep ? (
                          <CheckCircle2 size={16} className="text-emerald-500 mr-3" />
                        ) : i === progressStep ? (
                          <Loader2 size={16} className="text-[#FFD700] animate-spin mr-3" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-neutral-700 mr-3" />
                        )}
                        <span className={i <= progressStep ? "text-white" : "text-neutral-600"}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-900/80 backdrop-blur-sm">
            <div className="relative mb-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="w-full bg-[#151515] text-white pl-4 pr-12 py-4 rounded-xl border border-neutral-700 focus:outline-none focus:border-[#FFD700] transition-all placeholder-neutral-500 shadow-inner"
              />
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#FFD700] rounded-lg text-black hover:bg-[#E6C200] transition-colors shadow-lg shadow-[#FFD700]/20">
                <Send size={18} />
              </motion.button>
            </div>
             <div className="text-center text-[10px] text-neutral-500 uppercase tracking-widest font-bold opacity-60">
              Demo Mode - AI Responses Simulated
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar: Context & Preview */}
        <motion.div variants={itemVariants} className="hidden lg:flex w-80 flex-col gap-6">
          {/* Sponsor Context */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <div className="flex items-center justify-between mb-4 pl-2">
              <h3 className="font-bold text-white uppercase tracking-wider text-xs text-neutral-400">Sponsor Context</h3>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </div>
            <div className="flex items-center gap-3 mb-6 pl-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg border-2 border-neutral-800">AS</div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">ASICS</div>
                <div className="text-xs text-neutral-400">Footwear & Apparel</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pl-2">
              <div className="bg-[#151515] p-3 rounded-lg border border-neutral-800">
                <div className="text-[10px] text-neutral-500 mb-1 uppercase tracking-wide">Budget</div>
                <div className="font-mono text-[#FFD700] font-bold text-lg">$80k</div>
              </div>
              <div className="bg-[#151515] p-3 rounded-lg border border-neutral-800">
                <div className="text-[10px] text-neutral-500 mb-1 uppercase tracking-wide">Goal</div>
                <div className="text-xs text-white font-bold leading-tight">Sneaker Culture</div>
              </div>
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white uppercase tracking-wider text-xs text-neutral-400 flex items-center">
                <Eye size={14} className="mr-2" /> Live Preview
              </h3>
            </div>
            
            <div className="flex-1 bg-[#F5F5F7] rounded-lg p-4 overflow-hidden relative group border border-neutral-800 shadow-inner">
              
              {/* Mock Document Preview */}
              <div className="space-y-4 opacity-100 scale-[0.85] origin-top transform transition-transform group-hover:scale-[0.9]">
                <div className="h-8 bg-blue-500/80 w-3/4 rounded-md mb-6 shadow-sm"></div>
                <div className="space-y-2.5">
                  <div className="h-3 bg-neutral-300 w-full rounded-full"></div>
                  <div className="h-3 bg-neutral-300 w-5/6 rounded-full"></div>
                  <div className="h-3 bg-neutral-300 w-4/6 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="h-24 bg-white rounded-lg border border-neutral-200 shadow-sm"></div>
                  <div className="h-24 bg-white rounded-lg border border-neutral-200 shadow-sm"></div>
                </div>

                {progressStep > 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-100 mt-4 shadow-sm"
                  >
                    <div className="h-3 bg-blue-200 w-1/2 rounded-full mb-2"></div>
                    <div className="h-2 bg-blue-100 w-full rounded-full"></div>
                  </motion.div>
                )}
              </div>

              {/* Generating Overlay */}
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10"
                >
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full font-bold text-xs flex items-center shadow-2xl border border-white/20"
                  >
                    <Zap size={12} className="mr-2 text-[#FFD700] fill-[#FFD700]" />
                    Building Slide {progressStep + 1}/5
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
};
