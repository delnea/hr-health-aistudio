import React from 'react';
import { COMPANY_LOGO_URL } from '../constants';

interface SidebarProps {
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, closeMobileMenu }) => {
  const menuItems = [
    { icon: 'grid_view', label: 'Dashboard', active: true },
    { icon: 'medical_information', label: 'Medical Requests', active: false },
    { icon: 'groups', label: 'Employees', active: false },
    { icon: 'calendar_today', label: 'Calendar', active: false },
    { icon: 'bar_chart', label: 'Reports', active: false },
    { icon: 'settings', label: 'Settings', active: false },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-2">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
            style={{ backgroundImage: `url("${COMPANY_LOGO_URL}")` }}
            aria-label="Company Logo"
          ></div>
          <div className="flex flex-col">
            <h1 className="text-text-dark text-base font-bold leading-normal">HR Health</h1>
            <p className="text-text-light text-sm font-normal leading-normal">Command Center</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                item.active 
                  ? 'bg-tertiary-blue text-primary' 
                  : 'text-text-light hover:text-text-dark hover:bg-neutral-light-gray'
              }`}
            >
              <span 
                className={`material-symbols-outlined text-2xl ${item.active ? 'material-symbols-filled' : ''}`}
                style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <p className="text-sm font-bold leading-normal">{item.label}</p>
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <a className="flex items-center gap-3 px-3 py-2 text-text-light hover:text-text-dark hover:bg-neutral-light-gray rounded-lg" href="#">
          <span className="material-symbols-outlined text-2xl">logout</span>
          <p className="text-sm font-medium leading-normal">Logout</p>
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen min-h-full w-64 flex-col border-r border-sidebar-border bg-sidebar-bg p-4 sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg p-4 flex flex-col border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-2">
          <button 
            onClick={closeMobileMenu} 
            className="p-2 text-text-light hover:text-text-dark hover:bg-neutral-light-gray rounded-full transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
