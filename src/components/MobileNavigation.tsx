import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Plus, History } from 'lucide-react';

export function MobileNavigation() {
  const location = useLocation();
  
  const navItems = [
    { title: 'Dashboard', icon: BarChart3, href: '/' },
    { title: 'Add Record', icon: Plus, href: '/add-record' },
    { title: 'History', icon: History, href: '/history' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}