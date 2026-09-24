import Hero from '../components/Hero'
import AiVisibility from '../components/AiVisibility'
import WhatWeBuild from '../components/WhatWeBuild'
import WhatItBecomes from '../components/WhatItBecomes'
import SelectedProjects from '../components/SelectedProjects'
import ClientsMarquee from '../components/ClientsMarquee'
import Process from '../components/Process'
import ErgonFlyTeaser from '../components/ErgonFlyTeaser'
import FinalCTA from '../components/FinalCTA'
import { useSEO } from '../lib/seo'
import { SITE_URL, ORGANIZATION_ID, webPageSchema } from '../lib/schema'

const CANONICAL = `${SITE_URL}/`

export default function Home() {
  useSEO({
    title: 'Ergon Studio | Sites, Sistemas e Automações sob Medida',
    description:
      'Ergon Studio é um product studio em São Paulo: criamos sites, landing pages, sistemas internos, CRM, aplicativos e automações sob medida para empresas.',
    canonical: CANONICAL,
    ogImage: `${SITE_URL}/favicon.png`,
    jsonLd: [
      webPageSchema({
        id: `${SITE_URL}/#webpage`,
        url: CANONICAL,
        name: 'Ergon Studio | Sites, Sistemas e Automações sob Medida',
        description:
          'Ergon Studio é um product studio em São Paulo: criamos sites, landing pages, sistemas internos, CRM, aplicativos e automações sob medida para empresas.',
        about: [ORGANIZATION_ID],
      }),
    ],
  })

  return (
    <main>
      <Hero />
      <AiVisibility />
      <WhatWeBuild />
      <WhatItBecomes />
      <SelectedProjects />
      <ClientsMarquee />
      <Process />
      <ErgonFlyTeaser />
      <FinalCTA />
    </main>
  )
}
