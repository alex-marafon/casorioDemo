import type { FloralStyle } from "@/lib/floral";

const CORNER_SIZE =
  "h-40 w-40 text-[var(--color-accent)] opacity-[0.48] sm:h-52 sm:w-52 md:h-64 md:w-64";

function CornerSvg({ style, className }: { style: FloralStyle; className?: string }) {
  switch (style) {
    case "roses":
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden>
          <path
            d="M8 120C8 120 20 95 45 88C70 81 95 95 110 75C125 55 118 28 140 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M35 105C42 98 52 96 58 88M72 92C78 84 88 82 94 74M98 68C104 60 112 58 118 50"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="118" cy="48" r="9" fill="currentColor" opacity="0.35" />
          <circle cx="108" cy="42" r="6" fill="currentColor" opacity="0.25" />
          <circle cx="128" cy="40" r="5" fill="currentColor" opacity="0.2" />
          <path d="M52 118C48 108 54 98 64 94C74 90 84 96 88 106" fill="currentColor" opacity="0.15" />
          <ellipse cx="132" cy="18" rx="14" ry="10" fill="currentColor" opacity="0.2" />
          <ellipse cx="122" cy="14" rx="10" ry="8" fill="currentColor" opacity="0.15" />
        </svg>
      );
    case "olive":
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden>
          <path
            d="M10 130C25 110 40 100 55 85C70 70 85 55 100 40C115 25 130 15 145 8"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <ellipse cx="48" cy="98" rx="5" ry="8" fill="currentColor" opacity="0.35" transform="rotate(-25 48 98)" />
          <ellipse cx="68" cy="78" rx="4" ry="7" fill="currentColor" opacity="0.3" transform="rotate(-15 68 78)" />
          <ellipse cx="88" cy="58" rx="5" ry="8" fill="currentColor" opacity="0.35" transform="rotate(-20 88 58)" />
          <ellipse cx="108" cy="38" rx="4" ry="7" fill="currentColor" opacity="0.3" transform="rotate(-10 108 38)" />
          <ellipse cx="128" cy="22" rx="5" ry="8" fill="currentColor" opacity="0.35" transform="rotate(-18 128 22)" />
          <path
            d="M30 115C38 108 48 104 56 96M50 125C58 118 66 112 74 104"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
          />
        </svg>
      );
    case "eucalyptus":
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden>
          <path
            d="M12 125C30 105 50 95 70 80C90 65 105 48 125 30C135 20 142 12 148 6"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <ellipse cx="42" cy="102" rx="12" ry="5" fill="currentColor" opacity="0.22" transform="rotate(-35 42 102)" />
          <ellipse cx="62" cy="82" rx="14" ry="5" fill="currentColor" opacity="0.2" transform="rotate(-28 62 82)" />
          <ellipse cx="82" cy="62" rx="13" ry="5" fill="currentColor" opacity="0.22" transform="rotate(-32 82 62)" />
          <ellipse cx="102" cy="44" rx="11" ry="4" fill="currentColor" opacity="0.18" transform="rotate(-25 102 44)" />
          <ellipse cx="122" cy="28" rx="12" ry="5" fill="currentColor" opacity="0.2" transform="rotate(-30 122 28)" />
          <circle cx="135" cy="18" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="55" cy="115" r="2.5" fill="currentColor" opacity="0.2" />
        </svg>
      );
    case "peonies":
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden>
          <path
            d="M6 128C18 108 38 98 58 88C78 78 98 68 118 52C132 40 138 24 148 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="112" cy="58" r="14" fill="currentColor" opacity="0.22" />
          <circle cx="102" cy="52" r="9" fill="currentColor" opacity="0.18" />
          <circle cx="122" cy="50" r="8" fill="currentColor" opacity="0.15" />
          <circle cx="132" cy="28" r="12" fill="currentColor" opacity="0.2" />
          <circle cx="125" cy="22" r="7" fill="currentColor" opacity="0.14" />
          <path
            d="M48 118C44 106 52 96 62 92C72 88 82 94 86 104"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.45"
          />
        </svg>
      );
    case "wildflowers":
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden>
          <path
            d="M8 125C22 110 40 100 55 88C70 76 85 62 105 48C120 38 135 22 150 8"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <circle cx="95" cy="72" r="4" fill="currentColor" opacity="0.35" />
          <circle cx="78" cy="88" r="3" fill="currentColor" opacity="0.3" />
          <circle cx="118" cy="55" r="3.5" fill="currentColor" opacity="0.32" />
          <circle cx="135" cy="38" r="4" fill="currentColor" opacity="0.28" />
          <circle cx="142" cy="18" r="3" fill="currentColor" opacity="0.35" />
          <path d="M92 72L95 62M118 55L121 46M78 88L74 80" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
        </svg>
      );
    case "ivy":
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden>
          <path
            d="M10 135C25 120 35 105 50 92C65 79 80 66 95 52C110 38 125 24 140 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M35 115C42 108 50 102 58 94M55 128C62 121 70 114 78 106M72 98C80 90 88 84 96 76"
            stroke="currentColor"
            strokeWidth="0.9"
            opacity="0.55"
          />
          <path
            d="M48 108C52 100 58 96 66 94C74 92 80 98 82 106C84 114 78 122 70 124C62 126 54 120 52 112"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M108 42C112 34 118 30 126 30C134 30 140 36 142 44C144 52 138 60 130 62C122 64 114 58 112 50"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M128 22C132 14 138 10 146 10C154 10 158 18 156 26"
            fill="currentColor"
            opacity="0.15"
          />
        </svg>
      );
  }
}

function CenterWreath({ style }: { style: FloralStyle }) {
  const sizeClass = "h-20 w-full max-w-lg md:h-28";

  switch (style) {
    case "roses":
      return (
        <svg viewBox="0 0 400 120" fill="none" className={sizeClass} aria-hidden>
          <path d="M20 60C60 35 140 35 200 60C260 85 340 85 380 60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <circle cx="80" cy="52" r="8" fill="currentColor" opacity="0.2" />
          <circle cx="120" cy="44" r="6" fill="currentColor" opacity="0.15" />
          <circle cx="200" cy="40" r="10" fill="currentColor" opacity="0.22" />
          <circle cx="280" cy="44" r="6" fill="currentColor" opacity="0.15" />
          <circle cx="320" cy="52" r="8" fill="currentColor" opacity="0.2" />
        </svg>
      );
    case "olive":
      return (
        <svg viewBox="0 0 400 80" fill="none" className={sizeClass} aria-hidden>
          <path d="M30 40C100 20 300 20 370 40" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          {[80, 140, 200, 260, 320].map((x, i) => (
            <ellipse
              key={x}
              cx={x}
              cy={36 - (i % 2) * 4}
              rx="5"
              ry="9"
              fill="currentColor"
              opacity={0.18 + (i % 3) * 0.04}
              transform={`rotate(${i % 2 === 0 ? -20 : 20} ${x} ${36 - (i % 2) * 4})`}
            />
          ))}
        </svg>
      );
    case "peonies":
      return (
        <svg viewBox="0 0 400 100" fill="none" className={sizeClass} aria-hidden>
          <path d="M25 55C80 30 320 30 375 55" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          {[70, 130, 200, 270, 330].map((x) => (
            <g key={x}>
              <circle cx={x} cy="48" r="10" fill="currentColor" opacity="0.18" />
              <circle cx={x - 6} cy="44" r="6" fill="currentColor" opacity="0.12" />
              <circle cx={x + 6} cy="44" r="6" fill="currentColor" opacity="0.12" />
            </g>
          ))}
        </svg>
      );
    case "wildflowers":
      return (
        <svg viewBox="0 0 400 80" fill="none" className={sizeClass} aria-hidden>
          <path d="M20 42C100 22 300 22 380 42" stroke="currentColor" strokeWidth="0.9" opacity="0.3" />
          {[60, 120, 180, 240, 300, 340].map((x) => (
            <g key={x}>
              <circle cx={x} cy="38" r="3.5" fill="currentColor" opacity="0.28" />
              <path d={`M${x} 38L${x} 30`} stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
            </g>
          ))}
        </svg>
      );
    case "ivy":
      return (
        <svg viewBox="0 0 400 90" fill="none" className={sizeClass} aria-hidden>
          <path d="M15 50C90 28 310 28 385 50" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          {[70, 140, 200, 260, 330].map((x) => (
            <path
              key={x}
              d={`M${x} 46C${x + 8} 38 ${x + 16} 38 ${x + 14} 48C${x + 12} 58 ${x + 4} 56 ${x} 46Z`}
              fill="currentColor"
              opacity="0.16"
            />
          ))}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 80" fill="none" className={sizeClass} aria-hidden>
          <path d="M25 42C110 22 290 22 375 42" stroke="currentColor" strokeWidth="0.9" opacity="0.3" />
          {[70, 130, 200, 270, 330].map((x) => (
            <ellipse
              key={x}
              cx={x}
              cy="38"
              rx="14"
              ry="5"
              fill="currentColor"
              opacity="0.16"
              transform={`rotate(${x < 200 ? -25 : 25} ${x} 38)`}
            />
          ))}
        </svg>
      );
  }
}

/** Cantos fixos em todas as páginas públicas */
export function FloralSiteDecor({ style }: { style: FloralStyle }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <CornerSvg style={style} className={`absolute -left-4 -top-4 ${CORNER_SIZE}`} />
      <CornerSvg style={style} className={`absolute -right-4 -top-4 scale-x-[-1] ${CORNER_SIZE}`} />
      <CornerSvg style={style} className={`absolute -bottom-4 -left-4 scale-y-[-1] ${CORNER_SIZE}`} />
      <CornerSvg style={style} className={`absolute -bottom-4 -right-4 scale-[-1] ${CORNER_SIZE}`} />
    </div>
  );
}

/** Detalhe central só no hero da home */
export function FloralHomeWreath({ style }: { style: FloralStyle }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[16%] z-[1] w-full -translate-x-1/2 text-[var(--color-primary)] opacity-50 md:top-[14%]"
      aria-hidden
    >
      <CenterWreath style={style} />
    </div>
  );
}
