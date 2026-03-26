import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ExternalLink, Loader2 } from 'lucide-react';

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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const FALLBACK_TEAM = [
  {
    login: 'ishan8351',
    name: 'Ishan',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishan&backgroundColor=f8fafc',
    html_url: 'https://github.com/ishan8351',
  },
  {
    login: 'DarkWarrior411',
    name: 'DarkWarrior411',
    avatar_url:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkWarrior411&backgroundColor=f8fafc',
    html_url: 'https://github.com/DarkWarrior411',
  },
  {
    login: 'shashankmp2004',
    name: 'Shashank',
    avatar_url:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=shashankmp2004&backgroundColor=f8fafc',
    html_url: 'https://github.com/shashankmp2004',
  },
  {
    login: 'Anandprafull',
    name: 'Anand',
    avatar_url:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Anandprafull&backgroundColor=f8fafc',
    html_url: 'https://github.com/Anandprafull',
  },
];

export default function Team() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const promises = GITHUB_USERNAMES.map((username) =>
          fetch(`https://api.github.com/users/${username}`).then((res) => {
            if (!res.ok) throw new Error('Rate limited or user not found');
            return res.json();
          })
        );

        const data = await Promise.all(promises);
        setTeam(data);
      } catch (error) {
        console.warn('GitHub API limit reached or network error. Using fallback data.');
        setTeam(FALLBACK_TEAM);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 mt-20 relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 uppercase tracking-widest shadow-sm">
          The Architects
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">
          The Builders Behind RegRadar
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Combining expertise in Cloud Security, Generative AI, and Distributed Systems Design.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40 text-blue-600 gap-3">
          <Loader2 className="animate-spin" size={24} />
          <span className="font-mono text-sm animate-pulse font-medium">
            Querying GitHub API...
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {team.map((member, idx) => (
            <motion.div
              key={member.login || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="w-full sm:w-[280px] h-full bg-white border border-slate-200 rounded-3xl p-8 text-center hover:border-blue-300 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-[0_10px_40px_rgba(37,99,235,0.08)] hover:-translate-y-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <img
                    src={member.avatar_url}
                    alt={member.name || member.login}
                    className="relative w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md bg-slate-50 group-hover:border-blue-100 transition-colors duration-500 object-cover"
                  />

                  <div className="absolute -bottom-2 -right-2 bg-white border border-slate-200 text-slate-500 p-2 rounded-full group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <GithubIcon size={14} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-1">
                  {member.name || member.login}
                </h3>

                <div className="text-blue-600 font-semibold text-xs mb-4 flex items-center justify-center gap-1.5">
                  <Terminal size={12} /> @{member.login}
                </div>

                <div className="min-h-[40px] mb-8"></div>

                <a
                  href={member.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-all duration-300 font-bold text-sm shadow-sm"
                >
                  View GitHub <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
