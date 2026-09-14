import './fly-tokens.css'
import FlyHero from '../components/fly/FlyHero'
import FlyIntro from '../components/fly/FlyIntro'
import FlySegments from '../components/fly/FlySegments'
import FlyPortfolio from '../components/fly/FlyPortfolio'
import FlyEquipment from '../components/fly/FlyEquipment'
import FlyTestimonials from '../components/fly/FlyTestimonials'
import FlyFaq from '../components/fly/FlyFaq'
import FlyCTA from '../components/fly/FlyCTA'
import { Breadcrumb } from '../components/Breadcrumb'
import { useSEO } from '../lib/seo'
import { SITE_URL, SERVICE_IDS, breadcrumbSchema, webPageSchema, faqPageSchema } from '../lib/schema'
import { flyFaq } from './flyServices'

const CANONICAL = `${SITE_URL}/fly`
const TITLE = 'Filmagem com Drone em São Paulo | Imagens Aéreas 4K — Ergon Fly'
const DESCRIPTION =
  'Filmagem com drone profissional em São Paulo: imagens aéreas 4K, piloto certificado ANAC, entrega em até 3 dias úteis.'

export default function FlyPage() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    jsonLd: [
      // the drone vertical is one Service line of the same Organization,
      // not a second disconnected "Ergon Studio — Fly" entity — real
      // area/service info is now attached to that shared Organization's
      // contactPoint (src/lib/schema.ts) instead of being redeclared here
      webPageSchema({
        id: `${CANONICAL}/#webpage`,
        url: CANONICAL,
        name: TITLE,
        description: DESCRIPTION,
        about: [SERVICE_IDS.drone],
      }),
      breadcrumbSchema([
        { name: 'Ergon', url: `${SITE_URL}/` },
        { name: 'Fly', url: CANONICAL },
      ]),
      // real, commercially-relevant questions already visible verbatim in
      // FlyFaq.tsx's rendered accordion (src/fly/flyServices.ts) — not
      // invented for this markup
      faqPageSchema(flyFaq),
    ],
  })

  return (
    <main className="fly-page">
      <div className="grid-shell pt-8">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Serviços', url: '/servicos' },
            { name: 'Drone & Captação Aérea', url: '/fly' },
          ]}
        />
      </div>
      <FlyHero />
      <FlyIntro />
      <FlySegments />
      <FlyPortfolio />
      <FlyEquipment />
      <FlyTestimonials />
      <FlyFaq />
      <FlyCTA />
    </main>
  )
}
