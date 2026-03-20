'use client'
import { useState } from 'react'
import { X, DownloadSimple } from '@phosphor-icons/react'
import { useTranslations } from '@/hooks/useTranslations'

const allFlakes = [
  'F3080_LANAI_GRAY_PILE','F9202_CARBON_PILE','F9203_FELDSPAR_PILE','F9205_SABLE_PILE',
  'F9303_PUMICE_PILE','F9304_OBSIDIAN_PILE','F9305_GARNET_PILE','F9307_SCHIST_PILE',
  'F9309_BASALT_PILE','F9311_DOLERITE_PILE','F9313_SPILITE_PILE','F9317_METAPELITE_PILE',
  'F9318_ARKOSE_PILE','F9319_TALUS_PILE','F9320_SOAPSTONE_PILE','FB-1005_BIRCH_BARK_PILE',
  'FB-127_CABIN_FEVER_PILE','FB-130_CANNOLI_PILE','FB-310_ORBIT_PILE','FB-320_CROSSBOW_PILE',
  'FB-330_POLAR_PILE','FB-411_DOMINO_PILE','FB-414_GRAVEL_PILE','FB-421_SHORELINE_PILE',
  'FB-424_QUICKSILVER_PILE','FB-427_STONEHENGE_PILE','FB-504_SAFARI_PILE','FB-506_RAPIDS_PILE',
  'FB-507_REED_PILE','FB-508_STINGER_PILE','FB-509_PRAIRIE_PILE','FB-513_COYOTE_PILE',
  'FB-514_NORDIC_GREEN_PILE','FB-516_WOODLAND_PILE','FB-517_OUTBACK_PILE','FB-6001_BLIZZARD_PILE',
  'FB-6002_SYCAMORE_PILE','FB-6003_WEATHERED_GRAY_PILE-2','FB-602_SNOWFALL_PILE','FB-608_SUBMARINE_PILE',
  'FB-609_MORNING_DEW_PILE','FB-612_SWAN_PILE','FB-613_TRAILMIX_PILE','FB-616_WOMBAT_PILE',
  'FB-703_FOG_PILE','FB-704_ARCTIC_PILE','FB-706_MADRAS_PILE','FB-708_STONEWASH_PILE',
  'FB-711_COMET_PILE','FB-712_OASIS_PILE','FB-713_KEYSTONE_PILE','FB-714_MUSHROOM_PILE',
  'FB-715_NIGHTFALL_PILE','FB-716_CREEKBED_PILE','FB-720_STEELCUT_1.4','FB-721_SUMMIT_1.4',
  'FB-722_AVALANCH_1.4','FB-723_BURROW_1.4','FB-724_OSPREY_1.4','FB-725_BRICKYARD_1.4',
  'FB-726_ANVIL_1.4','FB-801_ROCKY_RIDGE_PILE','FB-802_SEA_MIST_PILE','FB-803_SEA_CREST_PILE',
  'FB-806_STONY_CREEK_PILE','FB-807_TIDAL_WAVE_PILE','FB-811_KOALA_PILE','FB-817_COLONIAL_PILE',
  'FB-818_VICTORIAN_PILE','FB-823_DOVETAIL_PILE','FB-901_OPAL_PILE','FB-902_SIBERIAN_PILE',
  'FB-903_SILVER_BELLS_PILE','FB-904_LUNAR_PILE','FB-905_FEATHER_GRAY_PILE','FB-906_MOON_MIST_PILE',
  'FB-907_GALAXY_PILE','FB-908_STARGAZER_PILE','FB-909_TIMBERWOLF_PILE','FB-910_HOUNDSTOOTH_PILE',
  'FB-911_WILD_DOVE_PILE','FB-912_THUNDER_PILE','FB-913_SHADOW_PILE','FB-914_GARGOYLE_PILE',
  'FB-915_RAVEN_PILE','FB-916_GRACIOUS_1.4','FB-917_FULL_MOON_PILE','FB-918_CAPRICORN_PILE',
  'FB-919_WOVEN_PILE','FB-920_SUAVE_PILE','FB-921_WATER_LILY_PILE','FB-922_NIMBUS_PILE',
  'FB-923_JAVA_PILE','FB-924_MOOSE_PILE','FB-925_CAST_IRON_PILE','FB-926_CELESTIAL_PILE',
  'FB-927_JUNIPER_PILE','FB-928_AVIATOR_PILE','FB-929_CURRENT_PILE','FB-930_FROSTBITE_PILE',
  'FB-931_SEDUM_PILE','FB-932_MAGMA_PILE','FB-933_SMOKEY_BLUE_PILE','FB-934_BLACK_ICE_PILE',
  'FB-935_CARDAMOM_PILE','FB-936_MERCURY_PILE','FB-937_SLALOM_PILE','FB-938_SPROUT_PILE',
  'FB-939_CARAWAY_PILE','FB-940_GLACIAL_PILE','FB-941_BRAMBLE_PILE','FB-942_MAGNOLIA_PILE',
  'FB-943_LAPIS_PILE','FB-944_RAINSTORM_PILE','FB-945_KISMET_PILE','FB-946_VOLTAGE_PILE',
  'FB-947_CHICORY_PILE','FB-948_FIG_PILE','FB-951_SAND_DOLLAR_PILE','FB-954_BUFFALO_PILE',
  'FB-959_BAMBI_PILE','FB-966_LOON_PILE','FB-967_CHICKADEE_PILE','FB-968_WAXWING_PILE',
  'FB-969_ROSY_FINCH_PILE','FB-970_WREN_PILE','FB-971_MERINO_PILE','FB-972_SPARROW_PILE',
  'FB-973_ROBIN_PILE','FB-974_QUAIL_PILE','FB-975_WOODPECKER_PILE','FB-976_HERON_PILE',
  'FB-977_THYME_PILE','FB-978_CITRINE_PILE','FB-979_MOREL_PILE','FB-980-DINGO_PILE','FB-981_CHENILLE_PILE',
]

function toLabel(file: string) {
  return file
    .replace(/_PILE.*$/, '')        // strip _PILE-2, _PILE, etc.
    .replace(/_1\.4$/, '')          // strip _1.4 suffix
    .replace(/^[A-Z]+-\d+-/, '')    // strip prefix like FB-980-
    .replace(/^[A-Z]+[\d-]+_/, '')  // strip prefix like FB-901_ or F9202_
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}

function toCode(file: string) {
  const match = file.match(/^(F[B]?-?\d+[A-Z]?-?\d*|F\d+)/)
  return match ? match[0] : ''
}

const chunk = Math.ceil(allFlakes.length / 3)
const rows = [
  allFlakes.slice(0, chunk),
  allFlakes.slice(chunk, chunk * 2),
  allFlakes.slice(chunk * 2),
]
const speeds = ['50s', '70s', '58s']
const directions = [false, true, false]

function FlakeCircle({ file, onClick, 'aria-hidden': ariaHidden }: { file: string, onClick: () => void, 'aria-hidden'?: boolean }) {
  const label = toLabel(file)
  return (
    <button
      onClick={onClick}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : 0}
      className="group relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 cursor-pointer focus:outline-none"
    >
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_24px_6px_rgba(220,38,38,0.45)] group-hover:scale-110 relative">
        <img
          src={`/flakes/${file}.avif`}
          alt={label}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        {/* Name overlay inside circle */}
        <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white font-black text-[9px] sm:text-[10px] text-center leading-tight px-2 uppercase tracking-wide">
            {label}
          </span>
        </div>
      </div>
    </button>
  )
}

function MarqueeRow({ files, reverse = false, duration, onSelect }: {
  files: string[], reverse?: boolean, duration: string, onSelect: (f: string) => void
}) {
  return (
    <div className="overflow-x-hidden py-6">
      <div
        className={reverse ? 'marquee-reverse' : 'marquee-forward'}
        style={{ animationDuration: duration, display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {files.map((file, i) => (
          <FlakeCircle key={i} file={file} onClick={() => onSelect(file)} />
        ))}
        {/* Duplicate for seamless loop */}
        {files.map((file, i) => (
          <FlakeCircle key={`d-${i}`} file={file} onClick={() => onSelect(file)} aria-hidden />
        ))}
      </div>
    </div>
  )
}

function ColorModal({ file, onClose, fr }: { file: string, onClose: () => void, fr: boolean }) {
  const label = toLabel(file)
  const code = toCode(file)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 bg-[#111] rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X weight="bold" size={16} color="white" />
        </button>

        {/* Image — grand cercle centré */}
        <div className="flex justify-center pt-10 pb-6 px-8 bg-white/5">
          <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_40px_10px_rgba(220,38,38,0.3)]">
            <img
              src={`/flakes/${file}.avif`}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-8 pb-8 text-center">
          {code && (
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{code}</p>
          )}
          <h3 className="font-display text-4xl font-black text-white uppercase mb-2">{label}</h3>
          <p className="text-white/40 text-sm mb-6">
            {fr
              ? 'Flocons polyaspartiques Torginol — résistant, durable, et magnifique pour des décennies.'
              : 'Torginol polyaspartic flakes — resistant, durable, and stunning for decades.'}
          </p>
          <a
            href="#soumission"
            onClick={onClose}
            className="block w-full bg-primary hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm uppercase tracking-wide"
          >
            {fr ? `Je veux ${label}` : `I want ${label}`}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ColorSelector() {
  const { locale } = useTranslations()
  const fr = locale !== 'en'
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <section id="couleurs" className="py-24 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
          <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase mb-4">
            {fr ? '137 nuances disponibles' : '137 shades available'}
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-4">
            {fr ? 'Votre garage,' : 'Your garage,'}
            <span className="block text-gradient">{fr ? 'votre signature.' : 'your signature.'}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-4">
            {fr
              ? 'Cliquez sur une couleur pour la voir en détail.'
              : 'Click on a color to see it up close.'}
          </p>
          <a
            href="https://rlaiiydrgywcdrah.public.blob.vercel-storage.com/guide-couleurs.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white/70 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            <DownloadSimple weight="duotone" size={16} />
            {fr ? 'Télécharger le catalogue complet (PDF)' : 'Download full catalog (PDF)'}
          </a>
        </div>

        <div className="space-y-0">
          {rows.map((row, i) => (
            <MarqueeRow
              key={i}
              files={row}
              reverse={directions[i]}
              duration={speeds[i]}
              onSelect={setSelected}
            />
          ))}
        </div>

        <div className="text-center mt-16 px-4">
          <p className="text-white/40 text-sm mb-6">
            {fr
              ? "Vous hésitez ? On vous conseille lors de l'estimé gratuit."
              : "Can't decide? We'll guide you during your free estimate."}
          </p>
          <a
            href="#soumission"
            className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-sm uppercase tracking-wide"
          >
            {fr ? 'Obtenir mon estimé gratuit' : 'Get my free estimate'}
          </a>
        </div>
      </section>

      {selected && (
        <ColorModal file={selected} onClose={() => setSelected(null)} fr={fr} />
      )}
    </>
  )
}
