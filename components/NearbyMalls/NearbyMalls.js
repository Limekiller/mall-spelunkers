// The "nearby malls" section at the end of a post

import { useEffect, useState, useContext } from "react"
import Link from "next/link"

import ColorContext from '@/components/ColorContext';
import styles from './NearbyMalls.module.scss'

export default function NearbyMalls(props) {

    const [mallsWithDistance, setmallsWithDistance] = useState([])
    const { colorPair } = useContext(ColorContext)

    useEffect(async () => {
        let posts = await fetch('/api/posts')
        posts = await posts.json()

        // Build an array of malls, including the distance in miles as an object property
        const currMallsCoords = [props.currentMall.fields.coordinates.lat, props.currentMall.fields.coordinates.lon]
        let mallArray = []
        posts.posts.items.forEach((post, index) => {
            const thisMallsCoords = [post.fields.coordinates.lat, post.fields.coordinates.lon]
            const distanceFromCurrMall = getDistanceFromLatLonPair(currMallsCoords[0], thisMallsCoords[0], currMallsCoords[1], thisMallsCoords[1])
            if (distanceFromCurrMall) {
                mallArray.push({
                    ...post.fields,
                    distance: distanceFromCurrMall,
                    imageURL: posts.postImages[index]
                })
            }
        })

        // Sort array by distance and get top 4
        mallArray.sort((a, b) => {
            return parseFloat(a.distance) - parseFloat(b.distance)
        })
        mallArray = mallArray.slice(0, 4)

        setmallsWithDistance(mallArray)
    }, [props.currentMall.fields.title])

    /**
     * Given two latitudes and two longitudes, return the distance in miles between them
     * @param lat1 float The latitude of the first location
     * @param lat2 float The latitude of the second location
     * @param lon1 float The longitude of the first location
     * @param lon2 float The longitude of the second location
     * @return float The distance in miles between the two points
     */
    const getDistanceFromLatLonPair = (lat1, lat2, lon1, lon2) => {
        const p = 0.017453292519943295
        const c = Math.cos
        const a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
        
        return (12742 * Math.asin(Math.sqrt(a))) / 1.609344
    }

    return <div className={styles.NearbyMalls}>
        <h2>Nearby Malls</h2>
        <div className={styles.malls}>
            {mallsWithDistance.map((mall, index) => {
                return <Link href={`/post/${mall.slug}`} key={index}>
                    <a className={styles.mall}>
                        <img 
                            alt='Image representing the mall that this post corresponds to' 
                            className={styles.postImage} 
                            src={mall.imageURL} 
                            style={{borderColor: colorPair[0]}} 
                        />
                        <h3>{mall.title}</h3>
                        <span>{mall.location}</span>
                        <i className={styles.distance}>{`${Math.round(mall.distance)} miles away`}</i><br />
                    </a>
                </Link>
            })}
        </div>
    </div>
}
