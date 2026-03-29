import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ExternalLink, Loader2 } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

const GITHUB_USERNAMES = ['ishan8351', 'DarkWarrior411', 'shashankmp2004', 'Anandprafull'];

const GithubIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FALLBACK_TEAM = [
  {
    login: 'ishan8351',
    name: 'Ishan',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishan&backgroundColor=1e293b',
    html_url: 'https://github.com/ishan8351',
  },
  {
    login: 'DarkWarrior411',
    name: 'DarkWarrior411',
    avatar_url:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkWarrior411&backgroundColor=1e293b',
    html_url: 'https://github.com/DarkWarrior411',
  },
  {
    login: 'shashankmp2004',
    name: 'Shashank',
    avatar_url:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=shashankmp2004&backgroundColor=1e293b',
    html_url: 'https://github.com/shashankmp2004',
  },
  {
    login: 'Anandprafull',
    name: 'Anand',
    avatar_url:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Anandprafull&backgroundColor=1e293b',
    html_url: 'https://github.com/Anandprafull',
  },
];

export default function Team() {
  const { isDark } = useTheme();
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      const CACHE_KEY = 'regradar_team_cache';
      const CACHE_EXPIRY = 1000 * 60 * 60 * 24;

      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setTeam(data);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          sessionStorage.removeItem(CACHE_KEY);
        }
      }

      const fetchWithRetry = async (url, retries = 2, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
          try {
            const res = await fetch(url);
            if (res.status === 403 || res.status === 429) {
              throw new Error('Rate Limited');
            }
            if (!res.ok) throw new Error('Network Error');
            return await res.json();
          } catch (error) {
            if (i === retries - 1 || error.message === 'Rate Limited') throw error;
            await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
          }
        }
      };

      try {
        const promises = GITHUB_USERNAMES.map((username) =>
          fetchWithRetry(`https://api.github.com/users/${username}`)
        );

        const data = await Promise.all(promises);

        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            data: data,
          })
        );

        setTeam(data);
      } catch (error) {
        console.warn('GitHub API unavailable. Using fallback data.');
        setTeam(FALLBACK_TEAM);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section
      id="team"
      className={`py-32 relative overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}
    >
      {/* Subtle gradient background */}
      <div
        className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900' : 'bg-gradient-to-b from-white via-slate-50 to-white'}`}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-500 text-sm font-mono tracking-wider uppercase mb-4 block">
            The Team
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
          >
            Built by Engineers
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Combining expertise in Cloud Security, Generative AI, and Distributed Systems.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className={`flex justify-center items-center h-40 gap-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <Loader2 className="animate-spin" size={20} />
            <span className="font-mono text-sm">Fetching team data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.login || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div
                  className={`h-full rounded-xl p-6 text-center transition-all duration-300 group border ${
                    isDark
                      ? 'bg-dark-800/50 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative inline-block mb-5">
                    <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={member.avatar_url}
                      alt={member.name || member.login}
                      className={`relative w-20 h-20 rounded-full mx-auto border-2 transition-colors duration-300 object-cover ${
                        isDark
                          ? 'border-slate-700 group-hover:border-slate-600 bg-dark-700'
                          : 'border-slate-200 group-hover:border-slate-300 bg-slate-100'
                      }`}
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 border p-1.5 rounded-full transition-colors duration-300 ${
                        isDark
                          ? 'bg-dark-800 border-slate-700 text-slate-500 group-hover:border-brand-500 group-hover:text-brand-400'
                          : 'bg-white border-slate-200 text-slate-400 group-hover:border-brand-500 group-hover:text-brand-500'
                      }`}
                    >
                      <GithubIcon size={12} />
                    </div>
                  </div>

                  {/* Name */}
                  <h3
                    className={`text-lg font-semibold mb-1 transition-colors ${
                      isDark
                        ? 'text-slate-200 group-hover:text-white'
                        : 'text-slate-800 group-hover:text-slate-900'
                    }`}
                  >
                    {member.name || member.login}
                  </h3>

                  {/* Username */}
                  <div className="text-brand-500 text-xs font-mono mb-6 flex items-center justify-center gap-1.5">
                    <Terminal size={10} />@{member.login}
                  </div>

                  {/* GitHub link */}
                  <a
                    href={member.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border transition-all duration-300 text-sm font-medium ${
                      isDark
                        ? 'bg-dark-700 hover:bg-dark-600 text-slate-400 hover:text-slate-200 border-slate-700 hover:border-slate-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    View Profile
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
