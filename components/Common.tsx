import React, { useEffect, useRef, useState } from 'react';
import { Lock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion, animate } from 'framer-motion';

export const DemoBadge = () => (
  <div className="fixed top-4 right-20 z-50 bg-neutral-900/90 border border-[#FFD700]/30 text-[#FFD700] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md select-none pointer-events-none shadow-[0_0_15px_rgba(255,215,0,0.2)]">
    Demo Preview
  </div>
);

export const DemoTooltip = ({ children, text = "Available in full version", disabled = true }: { children?: React.ReactNode, text?: string, disabled?: boolean }) => {
  if (!disabled) return <>{children}</>;
  
  return (
    <div className="group relative inline-block w-full">
      <div className="opacity-50 pointer-events-none">{children}</div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 border border-neutral-700 transform translate-y-2 group-hover:translate-y-0 flex items-center">
        <Lock size={12} className="mr-1.5 text-[#FFD700]" />
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-800" />
      </div>
    </div>
  );
};

export const SidebarItem = ({ icon: Icon, label, active = false, onClick, isDemo = false }: any) => (
  <DemoTooltip disabled={isDemo} text="Available in full version">
    <motion.button
      onClick={isDemo ? undefined : onClick}
      animate={{
        backgroundColor: active ? '#FFD700' : 'transparent',
        color: active ? '#000000' : '#9ca3af',
      }}
      whileHover={!isDemo ? { 
        scale: 1.02, 
        backgroundColor: active ? '#FFD700' : 'rgba(255, 255, 255, 0.05)',
        color: active ? '#000000' : '#ffffff',
      } : {}}
      whileTap={!isDemo ? { scale: 0.98 } : {}}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${isDemo ? 'cursor-not-allowed' : ''}`}
    >
      <Icon size={20} className={active ? 'stroke-2' : 'stroke-1.5'} />
      <span className={active ? 'font-bold italic tracking-wide uppercase' : ''}>{label}</span>
      {active && (
        <motion.div 
          layoutId="activeIndicator"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-black"
        />
      )}
    </motion.button>
  </DemoTooltip>
);

export const CountUp = ({ value, className }: { value: string, className?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  const hasDigits = /\d/.test(value);
  const isMoney = value.includes('$');
  const isMillion = value.includes('M');
  const isK = value.includes('k'); 
  const isPercent = value.includes('%');
  
  let numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  
  useEffect(() => {
    if (!hasDigits) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, numericValue, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => {
        let formatted = v.toLocaleString(undefined, { 
          minimumFractionDigits: value.includes('.') ? 1 : 0,
          maximumFractionDigits: value.includes('.') ? 2 : 0 
        });
        
        let prefix = isMoney ? '$' : '';
        let suffix = '';
        if (isMillion) suffix = 'M';
        if (isK) suffix = 'k'; 
        if (isPercent) suffix = '%';

        node.textContent = prefix + formatted + suffix;
      }
    });

    return () => controls.stop();
  }, [numericValue, isMoney, isMillion, isK, isPercent, value, hasDigits]);

  if (!hasDigits) {
    return <span className={className}>{value}</span>;
  }

  return <span ref={nodeRef} className={className}>{value}</span>;
};

export const itemVariants = {
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

export const MetricCard = ({ title, value, change, icon: Icon, color, index }: any) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ 
      scale: 1.02, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderColor: 'rgba(255, 215, 0, 0.2)'
    }}
    className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl transition-colors group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={64} className={color} />
    </div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
        <Icon size={24} />
      </div>
      {title === "Pipeline Value" || title === "Total Revenue" ? (
        <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          <TrendingUp size={12} className="mr-1" />
          Trending
        </span>
      ) : null}
    </div>
    <div className="relative z-10">
      <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-3xl font-black italic text-white tracking-tight mb-2 font-sans">
        <CountUp value={value} />
      </div>
      <p className="text-sm font-medium text-neutral-500 flex items-center">
        {change.includes('+') ? (
           <span className="text-emerald-400 mr-2 flex items-center"><ArrowUpRight size={14} className="mr-1"/>{change.split(' ')[0]}</span>
        ) : (
           <span className="text-neutral-300 mr-2">{change.split(' ')[0]}</span>
        )}
        <span className="text-neutral-600">{change.split(' ').slice(1).join(' ')}</span>
      </p>
    </div>
  </motion.div>
);

export const TypingEffect = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, 10); 
    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
};