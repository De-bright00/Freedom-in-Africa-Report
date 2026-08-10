import { cn } from '@/lib/utils'

interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ScoreBadge({ score, size = 'md', showLabel = false }: ScoreBadgeProps) {
  const tone = score >= 60 ? 'score-high' : score >= 40 ? 'score-mid' : 'score-low'
  const label = score >= 60 ? 'Free' : score >= 40 ? 'Partly free' : 'Not free'
  return <span className={cn('score-badge', tone, size === 'sm' && 'score-badge-sm', size === 'lg' && 'score-badge-lg')}><span>{score}</span>{showLabel && <span className="text-[0.65em] font-medium opacity-75">{label}</span>}</span>
}
