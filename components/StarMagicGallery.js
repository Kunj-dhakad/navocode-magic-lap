import Link from 'next/link';

export default function StarMagicGallery() {
  return (
    <section id="star-magic" className="starCollection" aria-labelledby="star-collection-title">
      <div className="starCollectionHeading">
        <div>
          <p className="starCollectionEyebrow"><span>NEW COLLECTION</span> 51 — 70</p>
          <h2 id="star-collection-title">Small sparks.<br /><em>Big magic.</em></h2>
          <p>A new collection of little wonders.<br />Start with Starborn. More magic is on the way.</p>
        </div>
        <div className="starCollectionCount"><strong>02 <span>/ 20</span></strong><span><i /> TWO LIVE. MORE TO COME.</span></div>
      </div>

      <div className="starCollectionBar"><span>THE NEXT CHAPTER</span><span>2 LIVE <b>·</b> 18 COMING SOON</span></div>
      <div className="starCollectionGrid">
        <Link className="starCollectionCard starCollectionLive" href="/magic/starborn">
          <div className="starCollectionCardTop"><span>51</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt" aria-hidden="true">
            <div className="starCollectionOrbit" />
            <svg viewBox="0 0 240 200" fill="none">
              <path className="starCollectionStarFill" d="M120 22 138 76 195 76 149 110 166 164 120 131 74 164 91 110 45 76 102 76Z" />
              <path className="starCollectionStarLine" d="M120 22 166 164 45 76 195 76 74 164 120 22" pathLength="1" />
              <circle cx="120" cy="22" r="3" />
              <path className="starCollectionSpark" d="M120 86Q122 100 136 102Q122 104 120 118Q118 104 104 102Q118 100 120 86Z" />
            </svg>
          </div>
          <div className="starCollectionCardCopy"><p>ONE DOT. INFINITE WONDER.</p><h3>Starborn</h3><span>A single spark draws a luminous star, one line at a time.</span></div>
          <div className="starCollectionCardFoot"><span>OPEN MAGIC</span><span aria-hidden="true">↗</span></div>
        </Link>

        <Link className="starCollectionCard starCollectionLive" href="/magic/star-ascension">
          <div className="starCollectionCardTop"><span>52</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt" aria-hidden="true"><div className="starCollectionOrbit" /><svg viewBox="0 0 240 200" fill="none">{Array.from({ length: 15 }, (_, i) => <path key={i} d="M0 -76 18 -25 72 -24 29 10 45 61 0 33 -45 61 -29 10 -72 -24 -18 -25Z" transform={`translate(120 ${114 - i * 1.4}) rotate(${i * 2}) scale(${.22 + i * .057})`} stroke={`hsl(${240 + i * 4} 95% 80%)`} strokeWidth="1" />)}</svg></div>
          <div className="starCollectionCardCopy"><p>30 STARS. ONE SPECTACULAR ASCENT.</p><h3>Star Ascension</h3><span>One after another, thirty stars rise into a luminous spiral.</span></div>
          <div className="starCollectionCardFoot"><span>OPEN MAGIC</span><span aria-hidden="true">↗</span></div>
        </Link>

        {Array.from({ length: 18 }, (_, index) => (
          <article className="starCollectionCard starCollectionSoon" key={index} aria-label={`Experiment ${index + 53}: Coming soon`}>
            <div className="starCollectionCardTop"><span>{index + 53}</span><span className="starCollectionBadge">COMING SOON</span></div>
            <div className={`starCollectionMystery starCollectionMystery-${index % 3}`} aria-hidden="true"><i /><i /><span>✦</span></div>
            <div className="starCollectionCardCopy"><p>A LITTLE MYSTERY FOR NOW</p><h3>Coming soon</h3><span>Another little wonder is on its way.</span></div>
            <div className="starCollectionCardFoot"><span>STAY CURIOUS</span><svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true"><rect x="2" y="7" width="10" height="8" rx="2" stroke="currentColor" /><path d="M4 7V4a3 3 0 0 1 6 0v3" stroke="currentColor" /><circle cx="7" cy="11" r="1" fill="currentColor" /></svg></div>
          </article>
        ))}
      </div>
    </section>
  );
}
