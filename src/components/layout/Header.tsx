import { Link } from 'react-router-dom'
import { routes } from '@/lib/constants'
import { useFinder } from '@/app/providers'
import { cn } from '@/lib/cn'

export function Header({ className }: { className?: string }) {
  const { locale, setLocale } = useFinder()

  return (
    <header
      className={cn(
        'relative z-20 flex items-center justify-between gap-4 px-6 py-5 md:px-10',
        className,
      )}
    >
      <Link to={routes.home} className="group flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-void text-sm font-bold text-mist">
          T
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          Tayseer
        </span>
      </Link>

      <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 ring-1 ring-white/12 backdrop-blur">
        {(['en', 'ar'] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition',
              locale === code
                ? 'bg-lagoon text-mist'
                : 'text-ink/55 hover:bg-white/5 hover:text-ink',
            )}
          >
            {code}
          </button>
        ))}
      </div>
    </header>
  )
}
