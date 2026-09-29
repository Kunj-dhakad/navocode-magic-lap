import Link from 'next/link';
import { magicItems } from '../lib/magic';
import SaasGallery from '../components/SaasGallery';
import StarMagicGallery from '../components/StarMagicGallery';

export default function Home() {
  return (
    <main className="homeShell">
      <div className="noise" />
      <nav className="topbar">
        <div className="brand"><span className="brandMark">N</span>NAVOCODE</div>
        <Link href="#saas-components" className="pill">32 MAGIC TRICKS + 20 SAAS COMPONENTS ↗</Link>
      </nav>

      <StarMagicGallery />

      <section className="hero">
        <p className="eyebrow">NEXT.JS / REACT / INTERACTION MAGIC</p>
        <h1>Code people will <span>rewatch.</span></h1>
        <p className="heroCopy">Thirty-two tiny interactive experiments designed for NavoCode reels: instant visual hooks, surprising payoffs and source-code-worthy interactions. No animation library required.</p>
        <div className="heroBadges">
          <span>32 experiments</span><span>Next.js</span><span>React</span><span>Pure CSS</span><span>Reel friendly</span><span>GitHub ready</span>
        </div>
      </section>

      <SaasGallery />

      <section className="gridSection">
        <div className="sectionTitle"><span>THE MAGIC COLLECTION</span><span>01—30</span></div>
        <div className="magicGrid">
          {magicItems.filter(item => item.slug !== 'starborn' && item.slug !== 'star-ascension').map((item) => (
            <Link className={`magicCard accent-${item.accent}`} href={`/magic/${item.slug}`} key={item.slug}>
              <div className="cardTop"><span>{item.no}</span><span className="cardTag">{item.tag}</span><span className="miniDot" /></div>
              <div>
                <p className="cardKicker">{item.kicker}</p>
                <h2>{item.title}</h2>
                <p>{item.blurb}</p>
              </div>
              <div className="cardFoot">OPEN MAGIC <span>↗</span></div>
            </Link>
          ))}
        </div>
      </section>

      <footer>Built for <strong>@navocode</strong> • Record the interaction, post the reel, drop the GitHub source.</footer>
    </main>
  );
}
