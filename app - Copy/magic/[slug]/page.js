import { notFound } from 'next/navigation';
import { getMagicItem, magicItems } from '../../../lib/magic';
import MagicExperience from '../../../components/MagicExperience';

export function generateStaticParams() {
  return magicItems.map((item) => ({ slug: item.slug }));
}

export default async function MagicPage({ params }) {
  const { slug } = await params;
  const item = getMagicItem(slug);
  if (!item) notFound();
  return <MagicExperience item={item} />;
}
