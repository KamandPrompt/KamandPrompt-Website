import React from 'react';
import Card from '../components/card';
import { Terminal } from 'lucide-react';
import { getGsoc, getAssetUrl } from '../api';

const Gsoc = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getGsoc()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load GSoC data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white/50">Loading...</div>;
  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center text-white/50">Error loading data</div>;

  return (
    <div className="relative bg-black min-h-screen">
      {/* Content wrapper */}
      <div className="relative z-10 text-center pt-24 px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 mb-8 text-sm text-white/50 bg-black/50 backdrop-blur-sm">
            <Terminal className="w-4 h-4" />
            $ ./list_gsoc.sh --all
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-6">
            GSOC
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Celebrating our community's contributions to open source software through Google Summer of Code.
          </p>
        </div>

        {/* Map through years data */}
        {data.years.map((yearData) => (
          <div key={yearData.year}>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white text-center pt-10 sm:pt-16">
              {yearData.year}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 justify-items-center">
              {yearData.selections.map((student, index) => (
                <Card
                  key={index}
                  imageUrl={getAssetUrl(student.imageUrl)}
                  name={student.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gsoc;
