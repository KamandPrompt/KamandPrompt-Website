import React, { useEffect, useState } from 'react';
import Card from '../components/card.jsx';
import { Terminal } from 'lucide-react';
import { getTeam, getAssetUrl } from '../api';

const Teams = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeam();
        setTeamData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50 font-mono">Loading...</p>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50 font-mono">Failed to load team data</p>
      </div>
    );
  }

  // Order roles for display
  const roleOrder = ['Coordinator', 'Co coordinators', 'Mentor', 'Domain Leads', 'Core Member'];
  const sortedRoles = teamData.roles.sort((a, b) => {
    return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
  });

  return (
    <div className="relative pt-24 min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-mono">
      <div className="relative z-10 text-center w-full max-w-7xl px-4">
        {/* Main Heading */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 mb-8 text-sm text-white/50 bg-black/50 backdrop-blur-sm">
            <Terminal className="w-4 h-4" />
            $ ./list_members.sh --active
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-6">
            THE TEAM
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Meet the passionate individuals driving Kamand Prompt forward.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {sortedRoles.map((roleData) => (
            <div key={roleData.role} className="mb-24 flex flex-col items-center w-full">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-16 uppercase">
                {roleData.role === 'Co coordinators' ? 'CO-COORDINATORS' : roleData.role.toUpperCase()}
              </h2>
              <div className={
                roleData.members.length === 1
                  ? "flex justify-center w-full px-4"
                  : "grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-12 px-2 sm:px-4 max-w-7xl w-full"
              }>
                {roleData.members.map((member, index) => (
                  <Card
                    key={`${member.name}-${index}`}
                    imageUrl={getAssetUrl(member.image, '/team')}
                    name={member.name}
                    role={member.designation}
                    linkedin={member.linkedin}
                    instagram={member.instagram}
                    className={roleData.role === 'Mentor' ? 'max-w-[160px] sm:max-w-[200px]' : ''}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
