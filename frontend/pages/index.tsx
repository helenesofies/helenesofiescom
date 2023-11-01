import Link from 'next/link'
import groq from 'groq'
import client from '../client'

type Posts = [{
  _id: string;
  current: string;
  title: string;
  publishedAt: string;
  slug: {
    current: string;
  }
}]



const Index = ({ posts }: { posts: Posts }) => {
  console.log(posts)
  return (
    <div>

      <div className='lineContainer'>
        <svg viewBox="0 0 873 868" >
          <path fill="none" className="path" d="M24.998 865C98.5 159.5 913.998 581 843.498 3.5" stroke="#DF0732" stroke-width="49" pathLength="1"/>
          <path fill="none" className="path" d="M25 3C98.502 708.5 914 287 843.5 864.5" stroke="#0729DF" stroke-width="49" pathLength="1"/>
        </svg>




      </div>
      <div className='mainLanding'>
        <h1>STENSTADVOLD</h1>
      </div>
      {posts.length > 0 && posts.map(
        ({ _id, title = '', slug, publishedAt = '' }) =>
          slug && (
            <li key={_id}>
              <Link href={`/post/${encodeURIComponent(slug?.current)}`}>
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