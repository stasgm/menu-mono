import Link from 'next/link';
import Image from 'next/image';
import getAllPosts from '@/lib/getAllPosts';

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <ul>
      {posts.map((post: Post) => (
        <>
          <Link href={`/posts/${post.uuid}`} key={post.uuid}>
            <article className="border-blancucho border">
              <h1 className="font-xl font-bold">{post.title}</h1>
              {post.abstract === null ? (
                <p className="ml-8">{post.content.slice(0, 100)}...</p>
              ) : (
                <p className="ml-8">{post.abstract}</p>
              )}
              {post.coverImg === 'undefined' ? null : (
                <Image
                  src={post.coverImg || ''}
                  width={100}
                  height={100}
                  alt="gato con terno"
                  className="border-rojo border"
                />
              )}
            </article>
          </Link>
          <br />
        </>
      ))}
    </ul>
  );
}
