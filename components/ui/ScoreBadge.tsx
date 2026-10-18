import { cn } from '@/lib/utils'

interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ScoreBadge({ score, size = 'md', showLabel = false }: ScoreBadgeProps) {
  const tone = score >= 65 ? 'score-high' : score >= 45 ? 'score-mid' : 'score-low'
  const label = score >= 65 ? 'High' : score >= 45 ? 'Moderate' : 'Low'
  const formattedScore = typeof score === 'number' && !isNaN(score) ? score.toFixed(1) : '—'
  return (
    <span className={cn('score-badge', tone, size === 'sm' && 'score-badge-sm', size === 'lg' && 'score-badge-lg')}>
      <span>{formattedScore}</span>
      {showLabel && <span className="text-[0.65em] font-medium opacity-75">{label}</span>}
    </span>
  )
}
