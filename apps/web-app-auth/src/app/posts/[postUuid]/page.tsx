import getPostByUuid from '@/lib/getPostByUuid';

type Params = {
  params: {
    postUuid: string;
  };
};

export default async function PostPage({ params }: Params) {
  const post: Post = await getPostByUuid(params.postUuid);

  return (
    <article>
      <header
        className="justify-between
      font-bold
      sm:flex md:flex-row
      "
      >
        <div
          className="text-xl
        font-bold
        md:text-3xl
        "
        >
          <div className="flex items-center">
            <h4 className="rounded-md drop-shadow-sm">{post.title}</h4>
            <div className="ml-4 rounded-md px-2 py-1 text-xs text-gray-500">
              <p>proyecto.Estado</p>
            </div>
          </div>
          <hr className="border-celestucho my-1 border-4"></hr>
          <div className="flex items-end justify-end">
            <h4 className="text-gris my-2 text-right text-xs font-normal italic">
              {post.createdAt}
            </h4>
            <h4 className="text-gris my-2 text-right text-xs font-normal italic">
              {post.updatedAt}
            </h4>
          </div>
        </div>
      </header>
      <section>
        <p>{post.content}</p>
      </section>
      <footer>proyecto.stack</footer>
    </article>
  );
}
