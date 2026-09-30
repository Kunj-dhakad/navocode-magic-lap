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
        <div className="starCollectionCount"><strong>08 <span>/ 20</span></strong><span><i /> EIGHT LIVE. MORE TO COME.</span></div>
      </div>

      <div className="starCollectionBar"><span>THE NEXT CHAPTER</span><span>8 LIVE <b>·</b> 12 COMING SOON</span></div>
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

        <Link className="starCollectionCard starCollectionLive" href="/magic/galaxy-generator">
          <div className="starCollectionCardTop"><span>53</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt starCollectionGalaxy" aria-hidden="true">
            <svg viewBox="0 0 240 200" fill="none">
              <g transform="translate(120 100) rotate(-22) scale(1 .65)">
                {[0, 1, 2, 3].map(arm => <g key={arm}>{Array.from({ length: 90 }, (_, i) => {
                  const radius = 4 + i;
                  const angle = arm * Math.PI / 2 + radius / 19;
                  return <circle key={i} cx={Math.cos(angle) * radius + Math.sin(i * 13) * 4} cy={Math.sin(angle) * radius + Math.cos(i * 17) * 4} r={i % 7 === 0 ? 1.4 : .75} opacity={.35 + i % 5 * .13} />;
                })}</g>)}
                <circle r="16" opacity=".06" /><circle r="9" opacity=".15" /><circle r="4" />
              </g>
            </svg>
          </div>
          <div className="starCollectionCardCopy"><p>ONE CLICK. A WHOLE NEW UNIVERSE.</p><h3>Galaxy Generator</h3><span>Thousands of stars bloom into a spiral galaxy. Click to create your cosmos.</span></div>
          <div className="starCollectionCardFoot"><span>CREATE A GALAXY</span><span aria-hidden="true">↗</span></div>
        </Link>

        <Link className="starCollectionCard starCollectionLive" href="/magic/fireworks-on-click">
          <div className="starCollectionCardTop"><span>54</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt" aria-hidden="true"><svg viewBox="0 0 240 200" fill="none">
            {[[88, 87, 65, 315], [170, 125, 42, 185], [177, 43, 27, 40]].map(([x, y, radius, hue]) => <g key={x + y} transform={`translate(${x} ${y})`}>
              {Array.from({ length: 32 }, (_, i) => {
                const angle = i / 32 * Math.PI * 2;
                const end = radius * (.7 + (i % 4) * .1);
                return <path key={i} d={`M${Math.cos(angle) * end * .45} ${Math.sin(angle) * end * .45} L${Math.cos(angle) * end} ${Math.sin(angle) * end}`} stroke={`hsl(${hue + i % 3 * 20} 100% 78%)`} strokeWidth={i % 3 === 0 ? 1.8 : 1} strokeLinecap="round" opacity={.5 + i % 3 * .2} />;
              })}<circle r="2" />
            </g>)}
          </svg></div>
          <div className="starCollectionCardCopy"><p>EVERY CLICK. A LITTLE CELEBRATION.</p><h3>Fireworks on Click</h3><span>Light up the sky with colorful particle bursts, right where you click.</span></div>
          <div className="starCollectionCardFoot"><span>LIGHT UP THE SKY</span><span aria-hidden="true">↗</span></div>
        </Link>

        <Link className="starCollectionCard starCollectionLive" href="/magic/black-hole-effect">
          <div className="starCollectionCardTop"><span>55</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt" aria-hidden="true"><svg viewBox="0 0 240 200" fill="none">
            {Array.from({ length: 70 }, (_, i) => {
              const angle = i * 2.4;
              const radius = 40 + i % 17 * 3.6;
              return <path key={i} d={`M${120 + Math.cos(angle) * radius} ${100 + Math.sin(angle) * radius * .8} l${-Math.cos(angle - .6) * 7} ${-Math.sin(angle - .6) * 7}`} stroke={i % 3 ? '#93d8fb' : '#ffcd93'} strokeWidth="1" opacity={.25 + i % 4 * .15} />;
            })}
            <g transform="translate(120 100) rotate(-18)"><ellipse rx="66" ry="17" stroke="#ffb967" strokeWidth="3" /><circle r="27" style={{ fill: '#04060d' }} stroke="#ffe1a6" strokeWidth="2" /><path d="M-66 0a66 17 0 0 0 132 0" stroke="#fff0c4" strokeWidth="2" /></g>
          </svg></div>
          <div className="starCollectionCardCopy"><p>A LITTLE PULL. INFINITE GRAVITY.</p><h3>Black Hole Effect</h3><span>Move your cursor and pull nearby stars into a glowing spiral of gravity.</span></div>
          <div className="starCollectionCardFoot"><span>BEND THE STARS</span><span aria-hidden="true">↗</span></div>
        </Link>

        <Link className="starCollectionCard starCollectionLive" href="/magic/magic-cursor-trail">
          <div className="starCollectionCardTop"><span>56</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt" aria-hidden="true"><svg viewBox="0 0 240 200" fill="none">
            <path d="M30 140C85 170 175 120 150 85S80 90 125 110 195 80 207 45" stroke="#b995ff" strokeWidth="9" opacity=".12" />
            <path d="M30 140C85 170 175 120 150 85S80 90 125 110 195 80 207 45" stroke="#a8dfff" strokeWidth="1.5" />
            {[[38, 142, 4], [77, 144, 6], [125, 125, 8], [148, 92, 5], [119, 93, 6], [167, 103, 8], [193, 76, 10], [207, 45, 13]].map(([x, y, r]) => <path key={x} d={`M${x} ${y-r}Q${x+1} ${y-1} ${x+r} ${y}Q${x+1} ${y+1} ${x} ${y+r}Q${x-1} ${y+1} ${x-r} ${y}Q${x-1} ${y-1} ${x} ${y-r}`} fill="#e3cdff" />)}
          </svg></div>
          <div className="starCollectionCardCopy"><p>LEAVE A LITTLE WONDER BEHIND.</p><h3>Magic Cursor Trail</h3><span>Draw glowing stars, soft smoke and neon ribbons with every move.</span></div>
          <div className="starCollectionCardFoot"><span>DRAW WITH LIGHT</span><span aria-hidden="true">↗</span></div>
        </Link>

        <Link className="starCollectionCard starCollectionLive" href="/magic/text-to-particles">
          <div className="starCollectionCardTop"><span>57</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt" aria-hidden="true"><svg viewBox="0 0 240 200" fill="none">
            {['01110/10000/10000/10000/10000/10000/01110', '01110/10001/10001/10001/10001/10001/01110', '11110/10001/10001/10001/10001/10001/11110', '11111/10000/10000/11110/10000/10000/11111'].map((letter, col) => <g key={col}>{letter.split('/').flatMap((row, y) => [...row].map((bit, x) => bit === '1' ? <circle key={`${x}-${y}`} cx={29 + col * 49 + x * 8} cy={72 + y * 9} r="2.4" style={{ fill: `hsl(${185 + col * 30} 100% 82%)` }} /> : null))}</g>)}
            {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={15 + i * 11} cy={i % 2 ? 145 + i % 4 * 5 : 38 + i % 5 * 4} r="1" opacity=".4" />)}
          </svg></div>
          <div className="starCollectionCardCopy"><p>A THOUSAND LIGHTS. YOUR WORDS.</p><h3>Text to Particles</h3><span>Let glowing particles gather into LOVE, CODE, 2027 or your own words.</span></div>
          <div className="starCollectionCardFoot"><span>MAKE WORDS GLOW</span><span aria-hidden="true">↗</span></div>
        </Link>

        <Link className="starCollectionCard starCollectionLive" href="/magic/particle-reveal">
          <div className="starCollectionCardTop"><span>58</span><span className="starCollectionBadge"><i /> LIVE MAGIC</span></div>
          <div className="starCollectionArt" aria-hidden="true"><svg viewBox="0 0 240 200" fill="none">
            <path d="M120 30 181 65V135L120 170 59 135V65Z" stroke="#b7b9ff" strokeWidth="3" strokeDasharray=".1 6" strokeLinecap="round" />
            <path d="M96 129V72L144 129V72" stroke="#aee5ff" strokeWidth="6" strokeDasharray=".1 7" strokeLinecap="round" />
            {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={i % 2 ? 190 + i % 5 * 8 : 15 + i % 4 * 9} cy={30 + i * 4.5} r={i % 3 ? 1 : 1.5} opacity={.2 + i % 4 * .15} />)}
          </svg></div>
          <div className="starCollectionCardCopy"><p>SCATTERED DOTS. A FAMILIAR SHAPE.</p><h3>Particle Face / Logo Reveal</h3><span>A cloud of light comes together as a face, logo or your own image.</span></div>
          <div className="starCollectionCardFoot"><span>REVEAL THE MAGIC</span><span aria-hidden="true">↗</span></div>
        </Link>

        {Array.from({ length: 12 }, (_, index) => (
          <article className="starCollectionCard starCollectionSoon" key={index} aria-label={`Experiment ${index + 59}: Coming soon`}>
            <div className="starCollectionCardTop"><span>{index + 59}</span><span className="starCollectionBadge">COMING SOON</span></div>
            <div className={`starCollectionMystery starCollectionMystery-${index % 3}`} aria-hidden="true"><i /><i /><span>✦</span></div>
            <div className="starCollectionCardCopy"><p>A LITTLE MYSTERY FOR NOW</p><h3>Coming soon</h3><span>Another little wonder is on its way.</span></div>
            <div className="starCollectionCardFoot"><span>STAY CURIOUS</span><svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true"><rect x="2" y="7" width="10" height="8" rx="2" stroke="currentColor" /><path d="M4 7V4a3 3 0 0 1 6 0v3" stroke="currentColor" /><circle cx="7" cy="11" r="1" fill="currentColor" /></svg></div>
          </article>
        ))}
      </div>
    </section>
  );
}
