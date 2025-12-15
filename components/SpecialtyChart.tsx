import React from 'react';
import { SpecialtyStat } from '../types';

interface SpecialtyChartProps {
  stats: SpecialtyStat[];
}

const SpecialtyChart: React.FC<SpecialtyChartProps> = ({ stats }) => {
  return (
    <div className="bg-card-bg rounded-xl shadow-sm p-6 border border-neutral-medium-gray h-full">
      <h3 className="text-xl font-semibold text-text-dark mb-4">Request Volume by Specialty</h3>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-text-dark">{stat.name}</p>
              <p className="text-sm text-text-light">{stat.count} requests</p>
            </div>
            <div className="w-full bg-tertiary-blue h-3 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-sm transition-all duration-500 ease-out" 
                style={{ width: `${stat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyChart;
