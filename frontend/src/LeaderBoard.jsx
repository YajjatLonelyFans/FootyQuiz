import { FaTrophy, FaMedal, FaFutbol } from 'react-icons/fa';

export default function Leaderboard({ scores, currentUser }) {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const getIcon = (index) => {
    if (index === 0) return <FaTrophy className="text-[var(--color-primary)] mr-2 text-lg" title="1st" />;
    if (index === 1) return <FaMedal className="text-[var(--color-secondary)] mr-2 text-lg" title="2nd" />;
    if (index === 2) return <FaFutbol className="text-[var(--color-accent)] mr-2 text-lg" title="3rd" />;
    return <span className="w-6 mr-2"></span>;
  };
  
  return (
    <section className="w-full bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-[var(--color-primary)]/30">
      <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4 text-center flex items-center justify-center gap-2 tracking-wide uppercase">
        <FaFutbol className="text-[var(--color-primary)]" />
        Leaderboard
      </h2>
      <div className="space-y-2">
        {sortedScores.length > 0 ? (
          sortedScores.map((player, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium text-base transition-all duration-200 ${
                currentUser === player.name 
                  ? 'bg-[var(--color-primary)]/30 border border-[var(--color-primary)] text-[var(--color-primary)] shadow-lg scale-105' 
                  : 'bg-white/5 text-[var(--color-text)] hover:bg-white/10'
              } ${index < 3 ? 'ring-1 ring-[var(--color-primary)]/40' : ''}`}
            >
              <span className="flex items-center">
                {getIcon(index)}
                <span className="font-semibold">{index + 1}.</span>
                <span className="ml-2 truncate">{player.name}</span>
              </span>
              <span className="font-bold text-[var(--color-primary)] text-lg">{player.score}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <p className="text-lg">No players yet...</p>
          </div>
        )}
      </div>
    </section>
  );
}