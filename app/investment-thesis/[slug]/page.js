import { blogPosts } from '@/assets/assets';
import ArticleContent from './ArticleContent';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://dharmabandaru.com/investment-thesis/${slug}`,
      images: [],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  return <ArticleContent slug={slug} />;
}
