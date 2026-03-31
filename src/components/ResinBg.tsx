'use client'

// ResinBg — Animated liquid polyaspartic resin background
//
// Technique: screen-blend layered gradient orbs that drift independently.
// On dark (#0C0C0C) surfaces, screen-blend adds light — the orbs create a
// warm, molten pool that evokes freshly-poured resin/coating.
// Overlapping orbs brighten at intersections (exactly like real pooling resin).
//
// Performance contract:
//  • All animations use `transform` only → GPU composited, 0 CPU
//  • No JS, no requestAnimationFrame, no ResizeObserver
//  • Opacity caps at 0.70 to avoid overwhelming content
//  • Long animation cycles (18–41s) = minimal repaint budget
//  • prefers-reduced-motion: all motion disabled
//  • will-change: transform on animated elements only (4 total)

export default function ResinBg() {
  return (
    <>
      <style>{`
        @keyframes rsin-a {
          0%   { transform: translate(0rem,    0rem)   scale(1);    }
          28%  { transform: translate(-5rem,   3.5rem) scale(1.09); }
          60%  { transform: translate(2.5rem, -4.5rem) scale(0.94); }
          100% { transform: translate(-1.5rem, 2rem)   scale(1.04); }
        }
        @keyframes rsin-b {
          0%   { transform: translate(0rem,    0rem)    scale(1.06); }
          38%  { transform: translate(6.5rem, -4rem)   scale(0.91); }
          72%  { transform: translate(-3.5rem, 2.5rem) scale(1.11); }
          100% { transform: translate(1.5rem, -2.5rem) scale(1);    }
        }
        @keyframes rsin-c {
          0%   { transform: translate(0rem,   0rem)   scale(1);    }
          50%  { transform: translate(4rem,   3.5rem) scale(1.14); }
          100% { transform: translate(-2rem,  1.5rem) scale(0.91); }
        }
        @keyframes rsin-d {
          0%   { transform: translate(0rem,    0rem)    scale(1);    }
          100% { transform: translate(-3.5rem, -4.5rem) scale(1.09); }
        }
        @keyframes rsin-sheen {
          0%   { opacity: 0;   transform: translateX(-160%); }
          18%  { opacity: 1;                                  }
          55%  { opacity: 0;                                  }
          100% { opacity: 0;   transform: translateX(200%);  }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-rsin] { animation: none !important; }
        }
      `}</style>

      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">

        {/* ── Screen-blend blob layer ────────────────────────────────────── */}
        {/* screen() formula: out = 1-(1-a)(1-b)                             */}
        {/* On #0C0C0C (≈0.047), a #b91c1c blob at 0.65 opacity adds a warm  */}
        {/* crimson glow. Overlapping blobs merge & brighten — resin pooling. */}
        <div className="absolute inset-0" style={{ mixBlendMode: 'screen' }}>

          {/* 1 — Primary mass, top-right, slow clockwise drift */}
          <div data-rsin
            style={{
              position: 'absolute',
              width: 'clamp(380px, 54vw, 820px)',
              height: 'clamp(380px, 54vw, 820px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 42% 42%, #b91c1c 0%, #7f1d1d 46%, transparent 70%)',
              filter: 'blur(88px)',
              top: '-22%', right: '-16%',
              opacity: 0.68,
              animation: 'rsin-a 23s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* 2 — Deep pool, bottom-left, slow counter */}
          <div data-rsin
            style={{
              position: 'absolute',
              width: 'clamp(340px, 46vw, 700px)',
              height: 'clamp(340px, 46vw, 700px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 56% 56%, #991b1b 0%, #450a0a 52%, transparent 70%)',
              filter: 'blur(78px)',
              bottom: '-18%', left: '-13%',
              opacity: 0.72,
              animation: 'rsin-b 31s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* 3 — Warm amber core, centre — "freshly poured" warmth */}
          {/* Orange-red evokes the wet polyaspartic before it cures */}
          <div data-rsin
            style={{
              position: 'absolute',
              width: 'clamp(220px, 28vw, 460px)',
              height: 'clamp(220px, 28vw, 460px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #c2410c 0%, #9a3412 36%, transparent 65%)',
              filter: 'blur(68px)',
              top: '30%', left: '22%',
              opacity: 0.38,
              animation: 'rsin-c 18s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* 4 — Dark anchor, keeps midfield grounded */}
          <div data-rsin
            style={{
              position: 'absolute',
              width: 'clamp(280px, 38vw, 560px)',
              height: 'clamp(280px, 38vw, 560px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #450a0a 0%, transparent 62%)',
              filter: 'blur(60px)',
              top: '10%', left: '38%',
              opacity: 0.55,
              animation: 'rsin-d 41s ease-in-out infinite alternate',
              willChange: 'transform',
            }}
          />
        </div>

        {/* ── Gloss sheen ────────────────────────────────────────────────── */}
        {/* A single diagonal highlight that sweeps across every ~15s        */}
        {/* Simulates light catching a polished, freshly-coated floor surface */}
        <div data-rsin
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.015) 45%, rgba(255,255,255,0.055) 50%, rgba(255,255,255,0.015) 55%, transparent 100%)',
            animation: 'rsin-sheen 14s ease-in-out infinite',
            animationDelay: '5s',
          }}
        />

      </div>
    </>
  )
}
