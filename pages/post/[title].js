import Image from 'next/image'
import Head from 'next/head';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ZaggedH1 from '@/components/ZaggedH1/ZaggedH1';
import MallPatch from '@/components/MallPatch/MallPatch';

const Post = (props) => {

    return <div className='post'>
        <Head>
            <title>{props.title} | Mall Spelunkers</title>
        </Head>
        <div className='header-img-container'>
            {/* <div className="header-img-border"/> */}
            <Image 
                className='header-image' 
                src={`https:${props.imageData['coverImage']}`} 
                layout='fill' 
            />
            <div id='post-title' className='post-title'>
                <ZaggedH1 heading={props.title}/>
            </div>
            <MallPatch 
                title={props.title}
                location={props.postData.fields.location}
                patchImage={props.imageData['patchCenter']}
            />
        </div>

        <div className='post-content'>
            <div className='post-body'>
                {documentToReactComponents(props.postData.fields.body)}
            </div>
            <div className='sidebar secondary-color'>
                <div className='sidebar-stitching' />
                <h2>Mall Information</h2>
                {documentToReactComponents(props.postData.fields.information)}
            </div>
        </div>
    </div>
}

export async function getStaticProps(context) {
    const res = await fetch(
        `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=post&fields.title=${context.params.title}`, {
            headers: {
                'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
            }
        }
    )
    const data = await res.json()

    let imageData = {}
    data.items.forEach(post => {
        for (let key in post.fields) {
            data.includes.Asset.forEach(file => {
                if (post.fields[key].sys && file.sys.id === post.fields[key].sys.id) {
                    imageData[key] = file.fields.file.url
                }
            })
        }
    })

    return {
      props: {
        title: context.params.title,
        postData: data.items[0],
        imageData: imageData
      },
      revalidate: 60,
    }
}

export async function getStaticPaths() {
    const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=post`, {
        headers: {
            'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
        }
    })
    const posts = await res.json()
    const paths = posts.items.map((post) => ({
        params: { title: post.fields.title },
    }))
    return { paths, fallback: 'blocking' }
}

export default Post
