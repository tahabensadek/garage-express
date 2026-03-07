'use client'
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
    .replace(/_PILE$/, '')
    .replace(/_1\.4$/, '')
    .replace(/^(FB?-?\d+[A-Z]?-?\d*_?)/, '')
    .replace(/^[A-Z0-9]+-?\d*_/, '')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}

const chunk = Math.ceil(allFlakes.length / 3)
const rows = [
  allFlakes.slice(0, chunk),
  allFlakes.slice(chunk, chunk * 2),
  allFlakes.slice(chunk * 2),
]
const speeds = ['50s', '65s', '55s']
const directions = [false, true, false]

function FlakeCircle({ file }: { file: string }) {
  const label = toLabel(file)
  return (
    <div className="group relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 cursor-pointer">
      {/* Circle image */}
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_20px_4px_rgba(220,38,38,0.5)] group-hover:scale-125 group-hover:z-20 relative">
        <img
          src={`/flakes/${file}.avif`}
          alt={label}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Inner overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-full">
          <span className="text-white font-black text-[10px] sm:text-xs text-center leading-tight px-2 uppercase tracking-wide">
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ files, reverse = false, duration }: { files: string[], reverse?: boolean, duration: string }) {
  const doubled = [...files, ...files]
  return (
    <div className="overflow-hidden">
      <div
        className={reverse ? 'marquee-reverse' : 'marquee-forward'}
        style={{ animationDuration: duration, display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {doubled.map((file, i) => <FlakeCircle key={i} file={file} />)}
      </div>
    </div>
  )
}

export default function ColorSelector() {
  const { locale } = useTranslations()
  const fr = locale !== 'en'

  return (
    <section className="py-24 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <span className="inline-block text-primary text-sm font-bold tracking-widest uppercase mb-4">
          {fr ? '137 nuances disponibles' : '137 shades available'}
        </span>
        <h2 className="font-display text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-4">
          {fr ? 'Votre garage,' : 'Your garage,'}
          <span className="block text-gradient">{fr ? 'votre signature.' : 'your signature.'}</span>
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          {fr
            ? '137 mélanges exclusifs Torginol. Du plus classique au plus spectaculaire.'
            : '137 exclusive Torginol blends. From the most classic to the most spectacular.'}
        </p>
      </div>

      <div className="space-y-4">
        {rows.map((row, i) => (
          <MarqueeRow key={i} files={row} reverse={directions[i]} duration={speeds[i]} />
        ))}
      </div>

      <div className="text-center mt-16 px-4">
        <p className="text-white/40 text-sm mb-6">
          {fr
            ? "Vous hésitez entre plusieurs nuances ? On vous conseille lors de l'estimé gratuit."
            : "Can't decide between shades? We'll guide you during your free estimate."}
        </p>
        <a
          href="#soumission"
          className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-sm uppercase tracking-wide"
        >
          {fr ? 'Obtenir mon estimé gratuit' : 'Get my free estimate'}
        </a>
      </div>
    </section>
  )
}
