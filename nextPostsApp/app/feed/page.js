import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

export const generateMetadata = async () => {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all ${numberOfPosts}`,
  };
};

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
