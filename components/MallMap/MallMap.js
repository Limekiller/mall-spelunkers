import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

import styles from './MallMap.module.scss'

export default function MallMap() {

    const [posts, setposts] = useState({})
    const [active, setactive] = useState(false)
    const router = useRouter();

    useEffect(async () => {
      let result = await fetch('/api/posts')
      result = await result.json()
      setposts(result)
      router.events.on('routeChangeComplete', () => setactive(false))
    }, [])

    return <div className={`${styles.MallMap}`}>
        <img className={styles.mapIcon} src='/images/map.svg' onClick={() => setactive(!active)} />
        <div className={`${styles.mapContainer} ${active ? styles.active : ''}`}>
            <div className={styles.menuText}>
                <h2>Mall Map</h2>

                <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '5rem'}}>
                    <div>
                        <h3>Anchor Pages</h3>
                        <h4 className={`${styles.home} ${styles.store}`}>Home</h4>
                        <h4 className={`${styles.about} ${styles.store}`}>About</h4>
                        <h4 className={`${styles.contact} ${styles.store}`}>Contact</h4>

                        <h3>Recent Posts</h3>
                        <div className={styles.recentPosts}>
                            {posts.posts && posts.posts.items.slice(0, 10).map((post, index) => {
                                return <Link key={index} href={`/post/${post.fields.title}`}>
                                    <a>
                                        <h4 className={`${styles.store} ${styles.post}`} >{post.fields.title}</h4>
                                    </a>
                                </Link>
                            })}
                        </div>
                    </div>
                    <div>
                        <h3>All Posts</h3>
                        {posts.posts && posts.posts.items.map((post, index) => {
                            return <Link key={index} href={`/post/${post.fields.title}`}>
                                <a>
                                    <h4 className={`${styles.store} ${styles.post}`} >{post.fields.title}</h4>
                                </a>
                            </Link>
                        })}
                    </div>
                </div>

            </div>
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 776.55 960.7"><defs>
                <style>{`.cls-1{fill:#f0e921;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke:#231f20;stroke-miterlimit:10;stroke-width:8px;}.cls-2{fill:none;}.cls-3{fill:#04d5d5;}.cls-4{fill:#fff;}.cls-5{fill:#ed0a85;}.cls-6{fill:#10b58d;}.cls-7{font-size:52.44px;fill:#231f20;font-family:jaf-bernina-sans-comp;font-weight:700;}.cls-8{letter-spacing:-0.01em;}`}</style>
                </defs><rect className="cls-1" x="482.48" y="405.18" width="109.84" height="107.51" transform="translate(-215.29 479.77) rotate(-45)"/><polygon className="cls-1" points="620.32 437.41 432.1 250.27 252.3 432.51 363.6 546.21 365.22 764.57 620.32 764.57 620.32 437.41"/><line className="cls-2" x1="363.6" y1="546.21" x2="620.32" y2="546.21"/><line className="cls-2" x1="364.17" y1="619" x2="620.32" y2="619"/><line className="cls-2" x1="364.17" y1="691.78" x2="620.32" y2="691.78"/><rect className="cls-3" x="75.64" y="175.44" width="492.22" height="265.58" transform="translate(-171.88 283.15) rotate(-45)"/><polygon className="cls-4" points="524.47 831.53 459.78 831.53 459.78 505.8 344.47 390.49 390.04 344.92 524.47 476.78 524.47 831.53"/><rect className="cls-5" x="211.69" y="764.57" width="248.08" height="192.13"/><rect className="cls-6" x="524.47" y="764.57" width="248.08" height="192.13"/><text className="cls-7" transform="translate(211.69 308.81)">Home</text><text className="cls-7" transform="translate(285.23 872.68)">About</text><text className="cls-7" transform="translate(584.38 877.07)"><tspan className="cls-8">C</tspan><tspan x="15.84" y="0">ontact</tspan></text><line className="cls-2" x1="521.53" y1="476.33" x2="588.46" y2="409.41"/><line className="cls-2" x1="390.04" y1="344.92" x2="456.98" y2="277.98"/><line className="cls-2" x1="454.19" y1="412.55" x2="526.51" y2="340.23"/><text className="cls-7" transform="translate(356.48 497.56)">1</text><text className="cls-7" transform="translate(402.77 599.04)">2</text><text className="cls-7" transform="translate(403.35 671.83)">3</text><text className="cls-7" transform="translate(403.05 744.61)">4</text><text className="cls-7" transform="translate(444.26 356.48)">5</text><text className="cls-7" transform="translate(512.84 424.64)">6</text><text className="cls-7" transform="translate(564.16 510.92)">7</text><text className="cls-7" transform="translate(562.01 599.04)">8</text><text className="cls-7" transform="translate(562.2 671.83)">9</text><text className="cls-7" transform="translate(555.12 744.61)">10</text>
            </svg>
        </div>
    </div>
}
