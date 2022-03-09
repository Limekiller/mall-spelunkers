export default async function handler(req, res) {
  const recentPostsRes = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=post`, {
    headers: {
        'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
    }
  })
  const recentPosts = await recentPostsRes.json()

  let postImages = []
  await Promise.all(recentPosts.items.map(async post => {
    const coverImageRes = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/assets/${post.fields.coverImage.sys.id}`, {
      headers: {
          'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
      }
    })
    const coverImage = await coverImageRes.json()
    postImages.push(coverImage.fields.file.url)
  }))

  res.status(200).json({ posts: recentPosts, postImages: postImages })
}
