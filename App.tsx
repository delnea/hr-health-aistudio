import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import SpecialtyChart from './components/SpecialtyChart';
import RecentRequestsTable from './components/RecentRequestsTable';
import { SPECIALTY_STATS, RECENT_REQUESTS } from './constants';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background-light font-display">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        closeMobileMenu={() => setIsMobileMenuOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <div className="p-4 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-text-dark text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
              HR Manager's Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 pt-8">
            <div className="w-full">
              <StatCard
                icon="pending_actions"
                title="Pending Requests"
                value="12"
                subtext="Requires immediate attention"
                iconColorClass="text-yellow-500"
                valueColorClass="text-status-pending-text"
              />
            </div>
            
            <div className="w-full">
              <StatCard
                icon="timer"
                title="Avg. Approval Time"
                value="2.3 days"
                subtext="Across all approved requests"
                iconColorClass="text-primary"
                valueColorClass="text-primary"
              />
            </div>
            
            <div className="w-full lg:col-span-2 xl:col-span-2">
              <SpecialtyChart stats={SPECIALTY_STATS} />
            </div>
          </div>
          
          <RecentRequestsTable requests={RECENT_REQUESTS} />
        </div>
      </main>
    </div>
  );
};

export default App;
