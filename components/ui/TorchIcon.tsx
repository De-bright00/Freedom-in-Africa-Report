import type { SVGProps } from 'react'

export function TorchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path d="M16 3.5c.2 4.2-3.8 6.2-3.8 10.1 0 2.2 1.7 3.9 3.8 3.9s3.8-1.7 3.8-3.9c0-1.7-1.1-3.4-1.9-4.5 3.8 2 5.9 5.3 5.9 9.1 0 5.2-3.5 9.1-7.8 9.1s-7.8-3.9-7.8-9.1c0-4.4 2.1-7.1 4.4-9.9.9-1.1 2-2.7 3.4-4.8Z" fill="currentColor" />
      <path d="M11.8 28.2h8.4M13.2 30h5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function TorchMark({ className = '' }: { className?: string }) {
  return <TorchIcon className={className} />
}

export default TorchIcon
