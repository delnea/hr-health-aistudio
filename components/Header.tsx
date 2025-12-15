import React from 'react';
import { USER_AVATAR_URL } from '../constants';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-sidebar-border px-4 lg:px-10 py-4 sticky top-0 bg-background-dark/95 backdrop-blur-sm z-10">
      <div className="flex items-center flex-1 gap-4 mr-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center text-text-dark hover:bg-neutral-light-gray rounded-full p-2 transition-colors"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <label className="flex flex-col w-full max-w-sm h-10">
          <div className="flex w-full flex-1 items-stretch rounded-full h-full border border-neutral-medium-gray bg-white">
            <div className="text-text-light flex border-none items-center justify-center pl-4 rounded-l-full border-r-0">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-text-dark focus:outline-0 border-none bg-transparent focus:border-none h-full placeholder:text-text-light px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal focus:ring-0"
              placeholder="Search requests or employees..."
            />
          </div>
        </label>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button className="flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-neutral-light-gray text-text-light hover:text-primary hover:bg-tertiary-blue transition-colors">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>
        <div className="flex items-center gap-3">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
            style={{ backgroundImage: `url("${USER_AVATAR_URL}")` }}
            aria-label="User Avatar"
          ></div>
          <div className="flex-col hidden md:flex">
            <p className="text-text-dark text-sm font-semibold">Lucia</p>
            <p className="text-text-light text-xs">Coordinator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
