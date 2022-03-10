import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react'

import styles from './MallMap.module.scss'

export default function MallMap() {

    const [posts, setposts] = useState({})
    const [active, setactive] = useState(false)
    const [starCoords, setstarCoords] = useState({right: '0rem', top: '0rem'})

    const router = useRouter()
    const postsRef = useRef({})
    postsRef.current = posts
    
    const starLocations = {
        '/': {right: '15rem', top: '13rem'},
        '1': {right: '12rem', top: '29rem'},
        '2': {right: '10.75rem', top: '34rem'},
        '3': {right: '10.75rem', top: '38rem'},
        '4': {right: '10.75rem', top: '42rem'}
    }

    const updateStar = () => {
        if (postsRef.current.posts) {
            if (!['/', '/about', '/contact'].includes(window.location.pathname)) {
                postsRef.current.posts.items.forEach((post, index) => {
                    if (decodeURI(window.location.pathname.split('/').slice(-1)) === post.fields.title) {
                        setstarCoords(starLocations[index + 1])
                    }
                })
            } else {
                setstarCoords(starLocations[window.location.pathname])
            }
        }

    }

    useEffect(async () => {
        let result = await fetch('/api/posts')
        result = await result.json()
        setposts(result)
        updateStar()
        
        router.events.on('routeChangeComplete', () => {
            setactive(false)
            updateStar()
        })
    }, [])

    return <div className={`${styles.MallMap}`}>
        <svg 
            className={`${styles.mapIcon} secondary-color`} 
            onClick={() => setactive(!active)}
            width="752pt" 
            height="752pt" 
            version="1.1" 
            viewBox="0 0 752 752" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
            <path d="m283.92 244.45-102.61-26.047c-3.8711-0.78125-7.8867 0.23438-10.922 2.7656-3.0977 2.4414-4.8945 6.1797-4.8672 10.129v263.1c-0.011719 6.2539 4.3945 11.648 10.527 12.891l107.87 26.574z"/>
            <path d="m441.78 218.14c-0.88281 0.023437-1.7617 0.10938-2.6328 0.26172h-0.13281l-128.79 25.785v289.68c0.88281-0.023437 1.7617-0.11328 2.6289-0.26562h0.13281l128.79-25.781z"/>
            <path d="m575.96 244.71-107.87-26.574v289.41l102.61 26.047c0.87109 0.15234 1.75 0.24219 2.6328 0.26562 7.2266-0.09375 13.062-5.9297 13.152-13.156v-263.1c0.015625-6.2539-4.3906-11.652-10.523-12.891z"/>
            </g>
        </svg>

        <div className={`${styles.mapContainer} ${active ? styles.active : ''}`}>
            <div 
                className={styles.youAreHere} 
                style={{right: starCoords.right, top: starCoords.top}}
            >
                <img src='/images/star.svg' />
            </div>

            <div className={styles.menuText}>
                <h2>Mall Map</h2>
                <span className={styles.youAreHereText}><img src='/images/star.svg' /> = You are here</span>

                <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '5rem'}}>
                    <div>
                        <h3>Anchor Pages</h3>
                        <Link href='/'><a><h4 className={`${styles.home} ${styles.store}`} id='homeLink'>Home</h4></a></Link>
                        <h4 className={`${styles.about} ${styles.store}`} id='aboutLink'>About</h4>
                        <h4 className={`${styles.contact} ${styles.store}`} id='contactLink'>Contact</h4>

                        <h3>Recent Posts</h3>
                        <div className={styles.recentPosts}>
                            {posts.posts && posts.posts.items.slice(0, 10).map((post, index) => {
                                return <Link key={index} href={`/post/${post.fields.title}`}>
                                    <a>
                                        <h4 className={`${styles.store} ${styles.post}`} >{index + 1}. {post.fields.title}</h4>
                                    </a>
                                </Link>
                            })}
                            {posts.posts && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(posts.posts.items.length).map(index => {
                                return <h4 key={index} className={`${styles.store} ${styles.post}`} >{index}. (Vacant)</h4>
                            })}
                        </div>
                    </div>
                    <div>
                        <h3>All Posts</h3>
                        {posts.posts && posts.posts.items.map((post, index) => {
                            return <Link key={index} href={`/post/${post.fields.title}`}>
                                <a id={`recentPost${index +1}`}>
                                    <h4 className={`${styles.store} ${styles.post}`} >{post.fields.title}</h4>
                                </a>
                            </Link>
                        })}
                    </div>
                </div>

            </div>

            <svg
                id="mallMap"
                data-name="Layer 1"
                viewBox="0 0 776.55 960.7"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <defs
                    id="defs4">
                    <style
                    id="style2">{`.cls-1{fill:#f0e921;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke:#231f20;stroke-miterlimit:10;stroke-width:8px;}.cls-2{fill:none;}.cls-3{fill:#04d5d5;}.cls-4{fill:#fff;}.cls-5{fill:#ed0a85;}.cls-6{fill:#10b58d;}.cls-7{font-size:52.44px;fill:#231f20;font-family:jaf-bernina-sans-comp;font-weight:700;}.cls-8{letter-spacing:-0.01em;}`}</style>
                </defs>
                <path
                    onClick={() => {document.querySelector(`#recentPost1`).click()}}
                    class="cls-1"
                    d="m 344.47001,390.49002 -67.4395,67.13245 86.5695,88.58755 h 96.17235 v -40.6754 z"
                    id="path1010" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost2`).click()}}
                    class="cls-1"
                    id="rect1184"
                    width="93.5"
                    height="72"
                    x="366"
                    y="546" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost3`).click()}}
                    class="cls-1"
                    id="rect1184-3"
                    width="93.5"
                    height="72"
                    x="366"
                    y="618" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost4`).click()}}
                    class="cls-1"
                    id="rect1184-3-6"
                    width="93.5"
                    height="75"
                    x="366"
                    y="690" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost8`).click()}}
                    class="cls-1"
                    id="rect1184-7"
                    width="89.019691"
                    height="73.300362"
                    x="527.52014"
                    y="545.90125" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost9`).click()}}
                    class="cls-1"
                    id="rect1184-3-5"
                    width="89.29702"
                    height="72.011269"
                    x="527.35858"
                    y="618.0246" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost10`).click()}}
                    class="cls-1"
                    id="rect1184-3-6-3"
                    width="89.178055"
                    height="76.428169"
                    x="527.42236"
                    y="690.59064" />
                <path
                    onClick={() => {document.querySelector(`#recentPost7`).click()}}
                    id="path1392"
                    class="cls-1"
                    d="m 588.29693,410.57526 -60.87609,59.65053 v 75.80163 h 89.21811 l 0.28722,-108.44243 z" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost5`).click()}}
                    class="cls-1"
                    id="rect1757"
                    width="88.816498"
                    height="98.161682"
                    x="-125.61306"
                    y="-617.54974"
                    transform="rotate(135)"
                    ry="0" />
                <rect
                    onClick={() => {document.querySelector(`#recentPost6`).click()}}
                    class="cls-1"
                    id="rect1757-5"
                    width="88.794044"
                    height="88.794044"
                    x="-125.61317"
                    y="-706.34381"
                    transform="rotate(135.00001)" />
                <rect
                    onClick={() => {document.querySelector(`#homeLink`).click()}}
                    class="cls-3"
                    x="75.64"
                    y="175.44"
                    width="492.22"
                    height="265.58"
                    transform="translate(-171.88 283.15) rotate(-45)"
                    id="rect16" />
                <rect
                    class="cls-5"
                    x="211.69"
                    y="764.57"
                    width="248.08"
                    height="192.13"
                    id="rect20" />
                <rect
                    class="cls-6"
                    x="524.47"
                    y="764.57"
                    width="248.08"
                    height="192.13"
                    id="rect22" />
                <text
                    class="cls-7"
                    transform="translate(211.69 308.81)"
                    id="text24">Home</text>
                <text
                    class="cls-7"
                    transform="translate(285.23 872.68)"
                    id="text26">About</text>
                <text
                    class="cls-7"
                    transform="translate(584.38 877.07)"
                    id="text32"><tspan
                    class="cls-8"
                    id="tspan28">C</tspan><tspan
                    x="15.84"
                    y="0"
                    id="tspan30">ontact</tspan></text>
                <line
                    class="cls-2"
                    x1="390.04"
                    y1="344.92"
                    x2="456.98"
                    y2="277.98"
                    id="line36" />
                <text
                    class="cls-7"
                    transform="translate(356.48 497.56)"
                    id="text40">1</text>
                <text
                    class="cls-7"
                    transform="translate(402.77 599.04)"
                    id="text42">2</text>
                <text
                    class="cls-7"
                    transform="translate(403.35 671.83)"
                    id="text44">3</text>
                <text
                    class="cls-7"
                    transform="translate(403.05 744.61)"
                    id="text46">4</text>
                <text
                    class="cls-7"
                    transform="translate(444.26 356.48)"
                    id="text48">5</text>
                <text
                    class="cls-7"
                    transform="translate(512.84 424.64)"
                    id="text50">6</text>
                <text
                    class="cls-7"
                    id="text52"
                    transform="translate(564.16 510.92)">7</text>
                <text
                    class="cls-7"
                    transform="translate(562.01 599.04)"
                    id="text54">8</text>
                <text
                    class="cls-7"
                    transform="translate(562.2 671.83)"
                    id="text56">9</text>
                <text
                    class="cls-7"
                    transform="translate(555.12 744.61)"
                    id="text58">10</text>
                <path
                    class="cls-1"
                    d="m 458.66961,803.54051 h 65.80346"
                    id="path5722" />
            </svg>

        </div>
    </div>
}