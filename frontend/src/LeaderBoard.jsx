import { FaTrophy, FaMedal, FaFutbol } from 'react-icons/fa';

export default function Leaderboard({ scores, currentUser }) {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const getIcon = (index) => {
    if (index === 0) return <FaTrophy className="text-[var(--color-primary)] mr-1 text-base" title="1st" />;
    if (index === 1) return <FaMedal className="text-[var(--color-secondary)] mr-1 text-base" title="2nd" />;
    if (index === 2) return <FaFutbol className="text-[var(--color-accent)] mr-1 text-base" title="3rd" />;
    return null;
  };
  return (
    <section className="w-full max-w-md mb-4 leaderboard-scoreboard">
      <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2 text-center flex items-center justify-center gap-2 tracking-wide uppercase">
        <FaFutbol className="inline-block mr-1 text-[var(--color-primary)]" />Leaderboard
      </h2>
      <div className="space-y-1">
        {sortedScores.map((player, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-base ${currentUser === player.name ? 'bg-[var(--color-primary)]/20 border border-[var(--color-primary)] text-[var(--color-primary)]' : 'bg-transparent text-[var(--color-text)]'} ${index < 3 ? 'ring-1 ring-[var(--color-primary)]/40' : ''}`}
          >
            <span className="flex items-center">{getIcon(index)}{index + 1}. {player.name}</span>
            <span className="font-bold text-[var(--color-text)]">{player.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
