import Link from 'next/link'
import groq from 'groq'
import client from '../client'

const Index = ({posts}) => {
    return (
      <div>
        <h1>Sanity!</h1>
        {posts.length > 0 && posts.map(
          ({ _id, title = '', slug = '', publishedAt = '' }) =>
            slug && (
              <li key={_id}>
                <Link href={`/post/${encodeURIComponent(slug)}`}>
                  {title}
                </Link>{' '}
                ({new Date(publishedAt).toDateString()})
              </li>
            )
        )}
      </div>
    )
}

export async function getStaticProps() {
    const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
      props: {
        posts
      }
    }
}

export default Index