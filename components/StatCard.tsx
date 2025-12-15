import React from 'react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtext, 
  iconColorClass, 
  valueColorClass 
}) => {
  return (
    <div className="bg-card-bg rounded-xl shadow-sm p-6 flex flex-col items-start border border-neutral-medium-gray h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className={`material-symbols-outlined ${iconColorClass}`}>
          {icon}
        </span>
        <h3 className="text-lg font-semibold text-text-dark">{title}</h3>
      </div>
      <p className={`text-5xl font-bold mb-2 ${valueColorClass}`}>{value}</p>
      <p className="text-text-light text-sm">{subtext}</p>
    </div>
  );
};

export default StatCard;
