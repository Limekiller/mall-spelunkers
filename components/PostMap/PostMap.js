import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'

import RecentPosts from './RecentPosts/RecentPosts'
import styles from './PostMap.module.scss'

export default function PostMap(props) {

  //const [postImages, setPostImages] = useState([])

  const customMarkerIcon = divIcon({
    html: `<img src='/images/marker.svg' />`,
    iconSize: [25, 41],
  });

  // For some fucking insane reason Contentful doesn't return images in the same object as their posts,
  // so this code iterates through all posts for each image so we can manually match them up before passing them to the RecentPosts sub-component
  let postImages = {}
  props.posts.includes.Asset.forEach((file) => {
    props.posts.items.forEach(post => {
      if (post.fields.coverImage.sys.id === file.sys.id) {
        postImages[post.sys.id] = file.fields.file.url
      }
    })
  })

  return <div className={styles.PostMap}>
      <RecentPosts posts={props.posts.items.slice(0, 3)} images={postImages} />
      <div className={styles.map}>
        <MapContainer center={[40.0066, -75.8551]} zoom={9} scrollWheelZoom={true} style={{height: 600, width: "102vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {props.posts.items.map((post, index) => {
            return <Marker icon={customMarkerIcon} position={[post.fields.coordinates.lat, post.fields.coordinates.lon]} key={index}>
              <Popup>
                <h3>{post.fields.title}</h3>
                <span>{post.fields.location}</span>
              </Popup>
            </Marker>
          })}
          </MapContainer>
      </div>
  </div>
}
