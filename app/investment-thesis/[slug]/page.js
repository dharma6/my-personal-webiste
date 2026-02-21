import { blogPosts } from '@/assets/assets';
import ArticleContent from './ArticleContent';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  return <ArticleContent slug={slug} />;
}
