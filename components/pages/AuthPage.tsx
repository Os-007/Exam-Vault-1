
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    } else {
        alert('Please enter both email and password.')
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full text-white mb-4">
                <BookOpen size={32} />
            </div>
          <h1 className="text-4xl font-bold text-slate-800">ExamVault</h1>
          <p className="text-slate-500 mt-2">Your University's Collaborative Study Hub</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-slate-700 mb-6">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="email">
                University Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., your.name@unimy.edu.my"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-300"
            >
              Login
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
                Only @unimy.edu.my emails are allowed.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
