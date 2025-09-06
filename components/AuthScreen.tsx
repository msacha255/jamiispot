import React from 'react';
import { JamiiSpotFullLogo } from '../constants';

interface AuthScreenProps {
  onLogin: () => void;
}

const SocialButton: React.FC<{ children: React.ReactNode; provider: string }> = ({ children, provider }) => (
    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
        {children}
        <span className="font-semibold text-gray-700">{provider}</span>
    </button>
);

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-light-gray flex flex-col justify-center items-center p-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
            <JamiiSpotFullLogo className="w-48 mx-auto" />
            <p className="mt-4 text-gray-500">Connect with friends, share your moments, and explore new communities.</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                <input type="password" id="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
              </div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md">
                Continue with Email
              </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>
          
          <div className="flex gap-4">
              <SocialButton provider="Google">
                  <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.122C34.553 5.166 29.694 3 24 3C10.745 3 0 13.745 0 27s10.745 24 24 24s24-10.745 24-24c0-1.341-.128-2.64-.356-3.917z"></path><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.841-5.841C34.553 5.166 29.694 3 24 3C16.318 3 9.656 6.915 6.306 14.691z"></path><path fill="#4CAF50" d="M24 48c5.694 0 10.553-1.855 14.502-4.998l-5.841-5.841C30.013 39.087 27.202 40 24 40c-5.223 0-9.651-3.657-11.127-8.492l-6.571 4.819C9.656 41.085 16.318 45 24 45z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.447-2.274 4.481-4.249 5.998l5.841 5.841C42.183 36.52 44 32.066 44 27c0-1.341-.128-2.64-.356-3.917z"></path></svg>
              </SocialButton>
              <SocialButton provider="Facebook">
                   <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#1877F2" d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.494v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.324C24 .593 23.407 0 22.676 0z"></path></svg>
              </SocialButton>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); }} className="font-semibold text-primary hover:underline">Sign In</a>
          </p>

        </div>
      </div>
    </div>
  );
};