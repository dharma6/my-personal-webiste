import { engineeringPosts } from '@/assets/assets';
import ArticleContent from './ArticleContent';

export function generateStaticParams() {
  return engineeringPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function EngineeringArticlePage({ params }) {
  const { slug } = await params;
  return <ArticleContent slug={slug} />;
}
