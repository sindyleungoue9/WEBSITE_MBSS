// Illustration décorative d'un porte-conteneurs sur la mer (remplace temporairement les photos).
// Quand de vraies photos de l'entreprise seront disponibles, elles remplaceront ce composant.
export function ShipArt({ className = "" }: { className?: string }) {
  const colors = ["#2450F0", "#1A3BB8", "#22A04B", "#17803B", "#F3F6FC"];
  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      aria-label=""
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2450F0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0A1A3A" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors[2]} />
          <stop offset="1" stopColor={colors[3]} />
        </linearGradient>
      </defs>
      <circle cx="470" cy="110" r="70" fill="#2450F0" opacity="0.08" />
      <rect x="0" y="300" width="640" height="120" fill="url(#sea)" />
      {/* Le navire entier se balance doucement (voir .ship-bob dans globals.css) */}
      <g className="ship-bob">
      {/* Conteneurs */}
      <g>
        <rect x="190" y="150" width="60" height="38" fill="#2450F0" />
        <rect x="254" y="150" width="60" height="38" fill="#1A3BB8" />
        <rect x="318" y="150" width="60" height="38" fill="#2450F0" />
        <rect x="222" y="110" width="60" height="38" fill="#1A3BB8" />
        <rect x="286" y="110" width="60" height="38" fill="#2450F0" />
        <rect x="254" y="70" width="60" height="38" fill="#2450F0" />
        <rect x="126" y="190" width="60" height="38" fill="#2450F0" />
        <rect x="190" y="190" width="60" height="38" fill="#22A04B" />
        <rect x="254" y="190" width="60" height="38" fill="#1A3BB8" />
        <rect x="318" y="190" width="60" height="38" fill="#2450F0" />
        <rect x="382" y="190" width="60" height="38" fill="#22A04B" />
      </g>
      {/* Passerelle */}
      <rect x="470" y="150" width="64" height="78" fill="#F3F6FC" />
      <rect x="480" y="162" width="44" height="10" fill="#2450F0" />
      <rect x="500" y="120" width="8" height="30" fill="#F3F6FC" />
      {/* Coque */}
      <path d="M70 228h520l-40 70c-4 8-12 12-20 12H150c-10 0-18-5-22-14z" fill="url(#hull)" />
      <g fill="#ffffff" opacity="0.9">
        <circle cx="170" cy="262" r="7" />
        <circle cx="210" cy="266" r="6" />
        <circle cx="248" cy="268" r="5" />
      </g>
      </g>
      {/* Vagues */}
      <g className="wave-drift" style={{ transformOrigin: "left" }}>
        <path
          d="M0 322q40-18 80 0t80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0v100H0z"
          fill="#ffffff"
          opacity="0.35"
        />
      </g>
      <path d="M0 348q40-14 80 0t80 0 80 0 80 0 80 0 80 0 80 0 80 0v72H0z" fill="#0A1A3A" opacity="0.25" />
    </svg>
  );
}
