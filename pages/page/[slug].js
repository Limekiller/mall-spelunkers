import ZaggedH1 from "@/components/ZaggedH1/ZaggedH1"

export default function Page(props) {
  return <div className='page'>
      <div className='page-content'>
        <ZaggedH1 heading={props.pageData.fields.title}/>
          <div dangerouslySetInnerHTML={{__html: props.pageData.fields.body}} />
      </div>
  </div>
}

export async function getStaticProps(context) {
    const res = await fetch(
        `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=page&fields.slug=${context.params.slug}`, {
            headers: {
                'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
            }
        }
    )
    const data = await res.json()

    return {
      props: {
        slug: context.params.slug,
        pageData: data.items[0],
      },
      revalidate: 60,
    }
}

export async function getStaticPaths() {
    const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=page`, {
        headers: {
            'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
        }
    })
    const pages = await res.json()
    const paths = pages.items.map((page) => ({
        params: { slug: page.fields.slug },
    }))
    return { paths, fallback: 'blocking' }
}
