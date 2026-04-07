import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BGPattern } from '../components/BGPattern';

export const Register = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        setLoading(true);

        const result = await register(name, email, password, confirmPassword, role);
        if (result.success) {
            navigate(`/login/${role}`);
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
        <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center px-4 py-12 relative overflow-hidden z-0">
            <BGPattern variant="interactive-dots" fill="#D2B48C" size={35} className="" />
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-[#EDE3D2]/80 backdrop-blur-md border border-[#D2B48C] shadow-sm p-8 z-10 rounded-sm">
                <div className="mb-6">
                    <div className="font-mono text-xs text-[#A67B5B] tracking-widest uppercase font-bold mb-4">
                        {getRoleLabel()}
                    </div>
                    <h1 className="font-syne text-3xl font-bold text-[#3E2C23]">Sign Up</h1>
                </div>

                {error && (
                    <div className="mb-4 p-3 border border-red-500 bg-red-100 text-red-700 font-mono text-xs whitespace-pre-wrap">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#F5EFE6]/90 border border-[#D2B48C] shadow-inner px-3 py-2 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-colors rounded-sm"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F5EFE6]/90 border border-[#D2B48C] shadow-inner px-3 py-2 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-colors rounded-sm"
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F5EFE6]/90 border border-[#D2B48C] shadow-inner px-3 py-2 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-colors rounded-sm"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#F5EFE6]/90 border border-[#D2B48C] shadow-inner px-3 py-2 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-colors rounded-sm"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A67B5B] border border-[#A67B5B] text-white font-mono text-sm tracking-widest uppercase py-2 hover:bg-[#6F4E37] hover:border-[#6F4E37] transition-all disabled:opacity-50 mb-3 rounded-sm shadow-sm"
                >
                    {loading ? 'Creating Account...' : 'Create Account →'}
                </button>

                <div className="mt-6 text-center space-y-4">
                    <div>
                        <span className="font-mono text-xs text-[#8B6F5C]">Already have an account? </span>
                        <Link to={`/login/${role}`} className="font-mono text-xs text-[#A67B5B] hover:text-[#6F4E37] transition-colors">
                            Sign In
                        </Link>
                    </div>
                    <Link to="/" className="font-mono text-xs text-[#A67B5B] hover:text-[#6F4E37] transition-colors block">
                        ← Back to role select
                    </Link>
                </div>
            </form>
        </div>
    );
};
