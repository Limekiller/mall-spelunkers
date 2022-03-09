import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import MallPatch from '@/components/MallPatch/MallPatch'
import ZaggedH1 from '@/components/ZaggedH1/ZaggedH1'
//import PostMap from '@/components/PostMap/PostMap'

const PostMap = dynamic(import('@/components/PostMap/PostMap'), {
  ssr: false,
  loading: () => {
    return <div style={{textAlign: 'center', paddingTop: 20}}>
      Chargement…
    </div>
  }
})

export default function Home(props) {

  return <div className='home'>
    <Head>
      <title>Mall Spelunkers</title>
    </Head>

    <img className='hero-img' src={props.coverImage.fields.file.url}/>
    <div className='content-container'>
      <div className='blog-heading'>
        <ZaggedH1 heading='Explore with us' />
      </div><br />
      <MallPatch 
          title={props.post.fields.title}
          location={props.post.fields.location}
          patchImage={props.patchImage.fields.file.url}
      />
      <h2>Visiting malls all over southeastern Pennsylvania and recording our experiences</h2>
      <hr />
      <h2>Recent voyages</h2>
      <PostMap posts={props.posts} />
    </div>
  </div>
}

export async function getServerSideProps() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=post`, {
      headers: {
          'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
      }
  })
  const posts = await res.json()
  const post = posts.items[Math.floor(Math.random() * posts.items.length)]

  const coverImageRes = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/assets/${post.fields.coverImage.sys.id}`, {
      headers: {
          'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
      }
  })
  const coverImage = await coverImageRes.json()

  const patchImageRes = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/assets/${post.fields.patchCenter.sys.id}`, {
    headers: {
        'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
    }
  })
  const patchImage = await patchImageRes.json()

  return { props: { posts: posts, post: post, coverImage: coverImage, patchImage: patchImage } }
}
