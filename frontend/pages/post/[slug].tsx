import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import client from '../../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).url()}
        />
      )
    }
  }
}

export const Post = ({ post, paths }) => {
  const {
    title = 'Missing title',
    ingress = [],
    name = 'Missing name',
    mainImage = 'url',
    publishedAt,
    categories,
    authorImage,
    body = []
  } = post
  console.log(post)
  return (

    <article className='post'>
      <img className='mainImage' src={urlFor(mainImage).url()} />


      <div className='article'>

        <div className='introduction'>
          <h1 className='title'>{title}</h1>
          <PortableText
            value={ingress}
            components={ptComponents}
          />


        </div>
        {/* Main content */}
        <PortableText
          value={body}
          components={ptComponents}
        />

        <div className="meta">
            {authorImage && (
              <div>
                <img className='authorImage'
                  src={urlFor(authorImage)
                    .url()}
                  alt={`${name}'s picture`}
                />
              </div>
            )}
            <div className='projectDate'>
            {categories && (
              <div className="categories">
                <p>Posted in: </p>{categories.map(category => <p key={category}>{category}</p>)}
              </div>
            )}
            <p>{publishedAt}</p>
            </div>

          </div>
      </div>

    </article>
  )

}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  ingress,
  mainImage,
  collaborators,
  publishedAt,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`
export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )
  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const post = await client.fetch(query, { slug })
  return {
    props: {
      post
    }
  }
}
export default Post