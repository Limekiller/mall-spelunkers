// This is the site menu/map
// Both the button in the corner and the screen that pops up when it's active

import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react'

import Search from './Search/Search';
import styles from './MallMap.module.scss'

export default function MallMap() {

    const [posts, setposts] = useState({})
    const [active, setactive] = useState(false)
    const [starCoords, setstarCoords] = useState({right: '0rem', top: '0rem'})
    const [searchVal, setsearchVal] = useState('')

    const router = useRouter()
    const postsRef = useRef({})
    postsRef.current = posts
    
    // We have a dictionary of coordinates, mapping rooms in the mall map to pages on the site
    // That way, the star graphic on the map matches the page we're on
    const starLocations = {
        '/': {right: '-30rem', top: '12rem'},
        '/page/about': {right: '-33.5rem', top: '42.5rem'},
        '/page/contact': {right: '-42.5rem', top: '42.5rem'},
        '1': {right: '-33rem', top: '26rem'},
        '2': {right: '-35rem', top: '30.5rem'},
        '3': {right: '-35rem', top: '34.5rem'},
        '4': {right: '-35rem', top: '37.5rem'},
        '5': {right: '-37.6rem', top: '17rem'},
        '6': {right: '-41.3rem', top: '20.5rem'},
        '7': {right: '-43.3rem', top: '26.5rem'},
        '8': {right: '-43.6rem', top: '30.7rem'},
        '9': {right: '-43.6rem', top: '34.6rem'},
        '10': {right: '-43.6rem', top: '38.6rem'}
    }

    /**
     * Move the star graphic to the correct place on the map
     */
    const updateStar = () => {
        if (postsRef.current.posts) {
            // If it's not one of the anchor pages, iterate through the posts until we find what page it is
            if (!['/', '/page/about', '/page/contact'].includes(window.location.pathname)) {
                postsRef.current.posts.items.forEach((post, index) => {
                    if (decodeURI(window.location.pathname.split('/').slice(-1)) === post.fields.slug) {
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
            setTimeout(() => setactive(false), 400)
            updateStar()
        })
    }, [])

    return <div className={`${styles.MallMap}`}>
        <button className={`${styles.mapIcon} secondary-color`} onClick={() => setactive(!active)}>
            {active ? 'Close' : 'View'} Map
            <svg
                width="752pt"
                height="752pt"
                version="1.1"
                viewBox="0 0 752 752"
                xmlns="http://www.w3.org/2000/svg">
                <defs><style>{`.mapStroke{stroke:#fff0;fill:#ffffff !important;stroke-opacity:1;stroke-width:50;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers stroke fill}`}</style></defs>
                <g>
                    <path className='mapStroke' d="m283.92 244.45-102.61-26.047c-3.8711-0.78125-7.8867 0.23438-10.922 2.7656-3.0977 2.4414-4.8945 6.1797-4.8672 10.129v263.1c-0.011719 6.2539 4.3945 11.648 10.527 12.891l107.87 26.574z"/>
                    <path className='mapStroke' d="m441.78 218.14c-0.88281 0.023437-1.7617 0.10938-2.6328 0.26172h-0.13281l-128.79 25.785v289.68c0.88281-0.023437 1.7617-0.11328 2.6289-0.26562h0.13281l128.79-25.781z" id="path4"/>
                    <path className='mapStroke' d="m575.96 244.71-107.87-26.574v289.41l102.61 26.047c0.87109 0.15234 1.75 0.24219 2.6328 0.26562 7.2266-0.09375 13.062-5.9297 13.152-13.156v-263.1c0.015625-6.2539-4.3906-11.652-10.523-12.891z"/>
                </g>
            </svg>
        </button>
        <Search setMapActive={setactive} mapActive={active} setSearchVal={setsearchVal} />

        <div className={`${styles.mapContainer} ${active ? styles.active : ''}`}>
            <div className={styles.menuText}>
                <h2>Mall Map</h2>
                <span className={styles.youAreHereText}><img src='/images/star.svg' /> = You are here</span>

                <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '2.5rem', paddingBottom: '20rem'}}>
                    <div 
                        style={{
                            height: 'fit-content', 
                            position: 'sticky', 
                            top: '15rem',
                            display: searchVal ? 'none' : 'block'
                        }}
                    >
                        <h3>Anchor Pages</h3>
                        <Link href='/'><a><h4 className={`${styles.home} ${styles.store}`} id='homeLink'>Home</h4></a></Link>
                        <Link href='/page/about'><a><h4 className={`${styles.about} ${styles.store}`} id='aboutLink'>About</h4></a></Link>
                        <Link href='/page/contact'><a><h4 className={`${styles.contact} ${styles.store}`} id='contactLink'>Contact</h4></a></Link>

                        <h3 style={{marginTop: '3rem'}}>Recent Posts</h3>
                        <div className={styles.recentPosts}>
                            {posts.posts && posts.posts.items.slice(0, 10).map((post, index) => {
                                // The most recent 10 posts show up on the mall map
                                return <Link key={index} href={`/post/${post.fields.slug}`}>
                                    <a>
                                        <h4 className={`${styles.store} ${styles.post}`} >
                                            <span className={styles.recentIndex}>{index + 1}. </span>{post.fields.title}
                                        </h4>
                                    </a>
                                </Link>
                            })}
                            {posts.posts && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(posts.posts.items.length).map(index => {
                                return <h4 key={index} className={`${styles.store} ${styles.post} ${styles.vacant}`} >
                                    <span className={styles.recentIndex}>{index}. </span>(Vacant)
                                </h4>
                            })}
                        </div>
                    </div>
                    
                    <div 
                        id='allPosts' 
                        style={{
                            padding: searchVal ? '0rem 0rem 2rem 0rem' : '0rem 0rem 2rem 2.5rem', 
                            height: 'fit-content'
                        }}>
                        <h3>All Posts</h3>
                        {posts.posts && posts.posts.items.map((post, index) => {
                            return !searchVal || 
                              post.fields.title.toLowerCase().includes(searchVal.toLowerCase()) || 
                              post.fields.location.toLowerCase().includes(searchVal.toLowerCase()) ? 
                                <Link key={index} href={`/post/${post.fields.slug}`}>
                                    <a id={`recentPost${index +1}`} className='all-post-link'>
                                        <h4 data-location={post.fields.location} className={`${styles.store} ${styles.post}`} >{post.fields.title}</h4>
                                    </a>
                                </Link>
                            : ''
                        })}
                    </div>
                </div>

            </div>

            <div className={styles.svgContainer}>
                <div style={{width: '100%', display: 'flex'}}>
                    <div 
                        className={styles.youAreHere} 
                        style={{right: starCoords.right, top: starCoords.top}}
                    >
                        <img src='/images/star.svg' />
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
                            className="cls-1"
                            d="m 344.47001,390.49002 -67.4395,67.13245 86.5695,88.58755 h 96.17235 v -40.6754 z"
                            id="path1010" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost2`).click()}}
                            className="cls-1"
                            id="rect1184"
                            width="93.5"
                            height="72"
                            x="366"
                            y="546" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost3`).click()}}
                            className="cls-1"
                            id="rect1184-3"
                            width="93.5"
                            height="72"
                            x="366"
                            y="618" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost4`).click()}}
                            className="cls-1"
                            id="rect1184-3-6"
                            width="93.5"
                            height="75"
                            x="366"
                            y="690" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost8`).click()}}
                            className="cls-1"
                            id="rect1184-7"
                            width="89.019691"
                            height="73.300362"
                            x="527.52014"
                            y="545.90125" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost9`).click()}}
                            className="cls-1"
                            id="rect1184-3-5"
                            width="89.29702"
                            height="72.011269"
                            x="527.35858"
                            y="618.0246" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost10`).click()}}
                            className="cls-1"
                            id="rect1184-3-6-3"
                            width="89.178055"
                            height="76.428169"
                            x="527.42236"
                            y="690.59064" />
                        <path
                            onClick={() => {document.querySelector(`#recentPost7`).click()}}
                            id="path1392"
                            className="cls-1"
                            d="m 588.29693,410.57526 -60.87609,59.65053 v 75.80163 h 89.21811 l 0.28722,-108.44243 z" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost5`).click()}}
                            className="cls-1"
                            id="rect1757"
                            width="88.816498"
                            height="98.161682"
                            x="-125.61306"
                            y="-617.54974"
                            transform="rotate(135)"
                            ry="0" />
                        <rect
                            onClick={() => {document.querySelector(`#recentPost6`).click()}}
                            className="cls-1"
                            id="rect1757-5"
                            width="88.794044"
                            height="88.794044"
                            x="-125.61317"
                            y="-706.34381"
                            transform="rotate(135.00001)" />
                        <rect
                            onClick={() => {document.querySelector(`#homeLink`).click()}}
                            className="cls-3"
                            x="75.64"
                            y="175.44"
                            width="492.22"
                            height="265.58"
                            transform="translate(-171.88 283.15) rotate(-45)"
                            id="rect16" />
                        <rect
                            onClick={() => {document.querySelector(`#aboutLink`).click()}}
                            className="cls-5"
                            x="211.69"
                            y="764.57"
                            width="248.08"
                            height="192.13"
                            id="rect20" />
                        <rect
                            onClick={() => {document.querySelector(`#contactLink`).click()}}
                            className="cls-6"
                            x="524.47"
                            y="764.57"
                            width="248.08"
                            height="192.13"
                            id="rect22" />
                        <text
                            className="cls-7"
                            transform="translate(211.69 308.81)"
                            id="text24">Home</text>
                        <text
                            className="cls-7"
                            transform="translate(285.23 872.68)"
                            id="text26">About</text>
                        <text
                            className="cls-7"
                            transform="translate(584.38 877.07)"
                            id="text32"><tspan
                            className="cls-8"
                            id="tspan28">C</tspan><tspan
                            x="15.84"
                            y="0"
                            id="tspan30">ontact</tspan></text>
                        <line
                            className="cls-2"
                            x1="390.04"
                            y1="344.92"
                            x2="456.98"
                            y2="277.98"
                            id="line36" />
                        <text
                            className="cls-7"
                            transform="translate(356.48 497.56)"
                            id="text40">1</text>
                        <text
                            className="cls-7"
                            transform="translate(402.77 599.04)"
                            id="text42">2</text>
                        <text
                            className="cls-7"
                            transform="translate(403.35 671.83)"
                            id="text44">3</text>
                        <text
                            className="cls-7"
                            transform="translate(403.05 744.61)"
                            id="text46">4</text>
                        <text
                            className="cls-7"
                            transform="translate(444.26 356.48)"
                            id="text48">5</text>
                        <text
                            className="cls-7"
                            transform="translate(512.84 424.64)"
                            id="text50">6</text>
                        <text
                            className="cls-7"
                            id="text52"
                            transform="translate(564.16 510.92)">7</text>
                        <text
                            className="cls-7"
                            transform="translate(562.01 599.04)"
                            id="text54">8</text>
                        <text
                            className="cls-7"
                            transform="translate(562.2 671.83)"
                            id="text56">9</text>
                        <text
                            className="cls-7"
                            transform="translate(555.12 744.61)"
                            id="text58">10</text>
                        <path
                            className="cls-1"
                            d="m 458.66961,803.54051 h 65.80346"
                            id="path5722" 
                        />
                    </svg>
                </div>      
            </div>

        </div>
    </div>
}
