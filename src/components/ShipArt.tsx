// Scène animée d'un porte-conteneurs en mer (ciel, nuages, mouettes, fumée, sillage, vagues en 3 plans).
// Les animations sont définies dans globals.css et coupées si l'utilisateur préfère moins de mouvement.
// Quand de vraies photos de l'entreprise seront disponibles, elles pourront remplacer ce composant.

// Rangées de conteneurs : [x, y, largeur, couleur]
const BLUE = "#2450F0";
const DARK = "#1A3BB8";
const GREEN = "#22A04B";
const WHITE = "#F3F6FC";
const SAND = "#F2B544";
const STACKS: [number, number, string][] = [
  // niveau 1 (pont)
  [96, 200, DARK], [136, 200, BLUE], [176, 200, GREEN], [216, 200, SAND], [256, 200, BLUE], [296, 200, DARK], [336, 200, GREEN], [376, 200, BLUE],
  // niveau 2
  [116, 178, BLUE], [156, 178, SAND], [196, 178, DARK], [236, 178, BLUE], [276, 178, GREEN], [316, 178, BLUE], [356, 178, DARK],
  // niveau 3
  [156, 156, GREEN], [196, 156, BLUE], [236, 156, DARK], [276, 156, SAND], [316, 156, BLUE],
  // niveau 4
  [196, 134, DARK], [236, 134, GREEN], [276, 134, BLUE],
];

export function ShipArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="ship-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE0FF" />
          <stop offset="0.7" stopColor="#EEF4FF" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="ship-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F63E8" />
          <stop offset="1" stopColor="#0A1A3A" />
        </linearGradient>
        <linearGradient id="ship-hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A3BB8" />
          <stop offset="1" stopColor="#0E2470" />
        </linearGradient>
        <radialGradient id="ship-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFE9A8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFE9A8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ciel et soleil */}
      <rect width="640" height="300" fill="url(#ship-sky)" />
      <circle cx="520" cy="96" r="90" fill="url(#ship-sun)" />
      <circle cx="520" cy="96" r="30" fill="#FFE29A" />

      {/* Nuages */}
      <g className="cloud-drift" fill="#fff" opacity="0.9">
        <g transform="translate(60 70)">
          <ellipse cx="0" cy="0" rx="46" ry="12" />
          <ellipse cx="22" cy="-10" rx="26" ry="13" />
          <ellipse cx="-20" cy="-6" rx="20" ry="10" />
        </g>
        <g transform="translate(330 44) scale(0.8)">
          <ellipse cx="0" cy="0" rx="46" ry="12" />
          <ellipse cx="22" cy="-10" rx="26" ry="13" />
          <ellipse cx="-20" cy="-6" rx="20" ry="10" />
        </g>
      </g>

      {/* Mouettes */}
      <g className="gull-fly" fill="none" stroke="#1A2A55" strokeWidth="2" strokeLinecap="round">
        <path d="M150 110q8-9 16 0q8-9 16 0" />
        <path d="M200 92q6-7 12 0q6-7 12 0" />
        <path d="M120 140q5-6 10 0q5-6 10 0" />
      </g>

      {/* Côte lointaine */}
      <path d="M0 292l40-14 36 8 50-20 44 16 60-10 50 14 70-18 60 10 60-12 56 10 114-6v30H0z" fill="#9DB4E6" opacity="0.55" />

      {/* Mer : fond */}
      <rect x="0" y="288" width="640" height="132" fill="url(#ship-sea)" />
      {/* Reflet du soleil */}
      <g opacity="0.35" fill="#FFE9A8" className="sun-glint">
        <rect x="500" y="296" width="40" height="3" />
        <rect x="508" y="304" width="26" height="3" />
        <rect x="494" y="314" width="52" height="3" />
        <rect x="506" y="326" width="30" height="3" />
      </g>

      {/* Vagues lointaines */}
      <g className="wave-drift" style={{ animationDuration: "30s" }}>
        <path
          d="M0 306q40-10 80 0t80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0v120H0z"
          fill="#5B86F2"
          opacity="0.45"
        />
      </g>

      {/* Navire : se balance doucement */}
      <g className="ship-bob">
        {/* Fumée de la cheminée */}
        <g className="smoke" fill="#E6ECF8">
          <circle cx="512" cy="106" r="7" />
          <circle cx="522" cy="94" r="9" />
          <circle cx="536" cy="80" r="11" />
        </g>

        {/* Conteneurs */}
        <g stroke="#0A1A3A" strokeOpacity="0.25" strokeWidth="0.8">
          {STACKS.map(([x, y, fill]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="38" height="20" fill={fill} />
          ))}
        </g>
        {/* Rainures des conteneurs */}
        <g stroke="#fff" strokeOpacity="0.22" strokeWidth="0.8">
          {STACKS.map(([x, y]) => (
            <path key={`g-${x}-${y}`} d={`M${x + 9} ${y + 2}v16M${x + 19} ${y + 2}v16M${x + 29} ${y + 2}v16`} />
          ))}
        </g>

        {/* Mâts de grue */}
        <g stroke="#E9EEFA" strokeWidth="3" strokeLinecap="round">
          <path d="M120 200V150l30-14" />
          <path d="M398 200V158l-26-12" />
        </g>

        {/* Château (passerelle) */}
        <rect x="438" y="150" width="70" height="70" fill={WHITE} />
        <rect x="446" y="132" width="54" height="18" fill={WHITE} />
        <rect x="452" y="138" width="42" height="7" fill="#1A3BB8" />
        <rect x="444" y="160" width="58" height="4" fill="#C4D0EC" />
        <g fill="#6D8FEF">
          <rect x="446" y="172" width="8" height="8" />
          <rect x="460" y="172" width="8" height="8" />
          <rect x="474" y="172" width="8" height="8" />
          <rect x="488" y="172" width="8" height="8" />
          <rect x="446" y="190" width="8" height="8" />
          <rect x="460" y="190" width="8" height="8" />
          <rect x="474" y="190" width="8" height="8" />
          <rect x="488" y="190" width="8" height="8" />
        </g>
        {/* Mât radar et cheminée */}
        <path d="M472 132V108" stroke={WHITE} strokeWidth="3" />
        <circle cx="472" cy="106" r="4" fill="#22A04B" />
        <rect x="502" y="108" width="14" height="42" fill={GREEN} />
        <rect x="502" y="108" width="14" height="6" fill="#0A1A3A" />

        {/* Coque */}
        <path d="M60 220h470l24-6-30 74c-3 8-10 12-18 12H112c-9 0-16-5-20-12z" fill="url(#ship-hull)" />
        <path d="M60 220h494l-6 14H66z" fill="#22A04B" />
        <path d="M70 250h470l-8 16H80z" fill="#0A1A3A" opacity="0.28" />
        <text x="150" y="248" fontSize="22" fontWeight="800" fill="#fff" letterSpacing="3" fontFamily="sans-serif">
          MBSS
        </text>
        {/* Hublots */}
        <g fill="#fff" opacity="0.85">
          <circle cx="330" cy="246" r="3" />
          <circle cx="350" cy="246" r="3" />
          <circle cx="370" cy="246" r="3" />
          <circle cx="390" cy="246" r="3" />
          <circle cx="410" cy="246" r="3" />
        </g>
      </g>

      {/* Sillage et écume à l'étrave */}
      <g className="wake" fill="#fff">
        <ellipse cx="560" cy="298" rx="30" ry="5" opacity="0.75" />
        <ellipse cx="540" cy="302" rx="22" ry="3.5" opacity="0.6" />
        <ellipse cx="88" cy="300" rx="46" ry="4" opacity="0.5" />
        <ellipse cx="50" cy="304" rx="34" ry="3" opacity="0.4" />
      </g>

      {/* Vagues d'avant-plan */}
      <g className="wave-drift" style={{ animationDuration: "16s" }}>
        <path
          d="M0 312q40-14 80 0t80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0v110H0z"
          fill="#fff"
          opacity="0.32"
        />
      </g>
      <g className="wave-drift" style={{ animationDuration: "11s", animationDirection: "reverse" }}>
        <path
          d="M0 340q40-12 80 0t80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0v82H0z"
          fill="#0A1A3A"
          opacity="0.35"
        />
      </g>
      <g className="wave-drift" style={{ animationDuration: "8s" }}>
        <path
          d="M0 372q40-10 80 0t80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0v50H0z"
          fill="#060F26"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}
