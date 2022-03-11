import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'

import MallInfo from './MallInfo/MallInfo'
import RecentPosts from './RecentPosts/RecentPosts'
import styles from './PostMap.module.scss'

export default function PostMap(props) {

  const [hoveredMall, sethoveredMall] = useState({})
  const [isHovering, setisHovering] = useState(false)

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

  const setPostFromLatLong = (latLongArray) => {
    let foundMall = false
    props.posts.items.forEach(post => {
      if (post.fields.coordinates.lat * post.fields.coordinates.lon === latLongArray[0] * latLongArray[1]) {
        sethoveredMall(post)
        foundMall = true
      }
    })
    if (!foundMall) {
      sethoveredMall({})
    }
  }

  return <div className={styles.PostMap}>
      <RecentPosts posts={props.posts.items.slice(0, 3)} images={postImages} currPost={isHovering ? hoveredMall : {}} />
      <div className={styles.map}>
        <MapContainer 
          center={[40.0066, -75.8551]} 
          zoom={9} 
          scrollWheelZoom={false} 
          style={{height: "30rem", width: "102vw"}}
          whenReady={(map) => {
            map.target.on("mouseover", (e) => {
              setisHovering(false)
            });
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {props.posts.items.map((post, index) => {

            const customMarkerIcon = divIcon({
              html: `<svg viewBox="0 0 500 820" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"> <defs></defs> <g transform="matrix(19.5417,0,0,19.5417,-7889.1,-9807.44)"     id="g16"><path       d="M416.544,503.612C409.971,503.612 404.5,509.303 404.5,515.478C404.5,518.256 406.064,521.786 407.194,524.224L416.5,542.096L425.762,524.224C426.892,521.786 428.5,518.433 428.5,515.478C428.5,509.303 423.117,503.612 416.544,503.612ZM416.544,510.767C419.128,510.784 421.223,512.889 421.223,515.477C421.223,518.065 419.128,520.14 416.544,520.156C413.96,520.139 411.865,518.066 411.865,515.477C411.865,512.889 413.96,510.784 416.544,510.767Z" style="stroke-width:0.125rem !important" 
                class='marker-image ${hoveredMall.fields && 
                  hoveredMall.fields.coordinates.lat * hoveredMall.fields.coordinates.lon === post.fields.coordinates.lat * post.fields.coordinates.lon ?
                  'secondary-color secondary-stroke' :
                  'primary-color primary-stroke'}' /></g></svg>`,
              iconSize: [25, 75],
            });

            return <Marker 
              icon={customMarkerIcon} 
              position={[post.fields.coordinates.lat, post.fields.coordinates.lon]} key={index}
              eventHandlers={{
                mouseover: (e) => {
                  setPostFromLatLong([e.latlng.lat, e.latlng.lng])
                  setisHovering(true)
                },
                mouseout: (e) => {
                  setisHovering(false)
                }
              }}
            >
              <Popup>
                <h3>{post.fields.title}</h3>
                <span>{post.fields.location}</span>
              </Popup>
            </Marker>
          })}
          </MapContainer>
      </div>
      <MallInfo mall={hoveredMall} setPostFromLatLong={setPostFromLatLong} />
  </div>
}
