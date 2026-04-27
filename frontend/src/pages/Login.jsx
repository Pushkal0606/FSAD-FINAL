import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BGPattern } from '../components/BGPattern';

export const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password, role);
    if (result.success) {
      navigate(`/${role}/dashboard`);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const getRoleLabel = () => {
    const labels = {
      student: '01 / STUDENT',
      teacher: '02 / TEACHER',
      admin: '03 / ADMIN',
      administrator: '04 / ADMINISTRATOR',
    };
    return labels[role] || role;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden z-0">
      <BGPattern variant="interactive-dots" fill="#4c1d95" size={35} className="" />
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-black border border-[#333] p-8 z-10 rounded-sm">
        <div className="mb-6">
          <div className="font-mono text-xs text-gray-400 tracking-widest uppercase font-bold mb-4">
            {getRoleLabel()}
          </div>
          <h1 className="font-mono text-3xl font-bold text-white">Sign In</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-red-500 bg-red-100 text-red-700 font-mono text-xs whitespace-pre-wrap">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#f0f4ff] border border-gray-300 shadow-inner px-3 py-2 text-black font-mono text-sm focus:border-[#a855f7] focus:outline-none transition-colors rounded-sm"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-mono text-xs tracking-widest uppercase text-gray-400 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#f0f4ff] border border-gray-300 shadow-inner px-3 py-2 text-black font-mono text-sm focus:border-[#a855f7] focus:outline-none transition-colors rounded-sm"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#a855f7] border border-[#a855f7] text-white font-mono text-sm tracking-widest uppercase py-2 hover:bg-purple-700 transition-all disabled:opacity-50 mb-3 rounded-sm"
        >
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>



        <div className="mt-6 text-center space-y-4">
          <div>
            <span className="font-mono text-xs text-gray-400">Need an account? </span>
            <Link to={`/register/${role}`} className="font-mono text-xs text-[#a855f7] hover:text-black transition-colors">
              Sign up
            </Link>
          </div>
          <Link to="/" className="font-mono text-xs text-[#a855f7] hover:text-black transition-colors block">
            ← Back to role select
          </Link>
        </div>
      </form>
    </div>
  );
};
