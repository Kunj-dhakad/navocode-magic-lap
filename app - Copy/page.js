import Link from 'next/link';
import { magicItems } from '../lib/magic';

export default function Home() {
  return (
    <main className="homeShell">
      <div className="noise" />
      <nav className="topbar">
        <div className="brand"><span className="brandMark">N</span>NAVOCODE</div>
        <div className="pill">10 MICRO INTERACTIONS</div>
      </nav>

      <section className="hero">
        <p className="eyebrow">FRONTEND / MOTION / UI MAGIC</p>
        <h1>Code that makes people <span>stop scrolling.</span></h1>
        <p className="heroCopy">Ten tiny Next.js experiments made for short demos, reels and portfolio clips. No UI library. Just React, CSS and playful interaction.</p>
        <div className="heroBadges">
          <span>Next.js</span><span>React</span><span>Pure CSS</span><span>Mobile friendly</span>
        </div>
      </section>

      <section className="gridSection">
        <div className="sectionTitle"><span>THE COLLECTION</span><span>01—10</span></div>
        <div className="magicGrid">
          {magicItems.map((item) => (
            <Link className={`magicCard accent-${item.accent}`} href={`/magic/${item.slug}`} key={item.slug}>
              <div className="cardTop"><span>{item.no}</span><span className="miniDot" /></div>
              <div>
                <p className="cardKicker">{item.kicker}</p>
                <h2>{item.title}</h2>
                <p>{item.blurb}</p>
              </div>
              <div className="cardFoot">OPEN EXPERIMENT <span>↗</span></div>
            </Link>
          ))}
        </div>
      </section>

      <footer>Built for <strong>@navocode</strong> • Every experiment is reel-ready.</footer>
    </main>
  );
}
