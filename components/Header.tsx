
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { BookOpen, PlusCircle, Bell, User, LogOut, LayoutDashboard, MessageSquare } from 'lucide-react';

const Header: React.FC<{ onUploadClick: () => void }> = ({ onUploadClick }) => {
  const { user, logout, setView } = useContext(AppContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-slate-800">ExamVault</span>
            </div>
            <nav className="hidden md:flex items-center gap-4">
               <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-slate-600 font-semibold hover:text-primary-600 transition">
                <LayoutDashboard size={20} />
                Dashboard
               </button>
               <button onClick={() => setView('forums')} className="flex items-center gap-2 text-slate-600 font-semibold hover:text-primary-600 transition">
                <MessageSquare size={20} />
                Forums
               </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
                onClick={onUploadClick} 
                className="hidden md:inline-flex items-center gap-2 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition"
            >
              <PlusCircle size={20} />
              Upload Resource
            </button>
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition">
              <Bell size={22} />
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2">
                <img
                  src={user?.avatarUrl}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-slate-200"
                />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2">
                    <div className="px-4 py-2 border-b">
                        <p className="font-bold text-slate-800">{user?.name}</p>
                        <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <button onClick={() => setView('profile')} className="w-full text-left flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100">
                        <User size={16} />
                        Profile
                    </button>
                    <button onClick={logout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50">
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
