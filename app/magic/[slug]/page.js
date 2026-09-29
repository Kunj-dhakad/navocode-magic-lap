import { notFound } from 'next/navigation';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getMagicItem, magicItems } from '../../../lib/magic';
import MagicExperience from '../../../components/MagicExperience';
import SaasExperience from '../../../components/SaasExperience';

export function generateStaticParams() {
  return magicItems.map((item) => ({ slug: item.slug }));
}

export default async function MagicPage({ params }) {
  const { slug } = await params;
  const item = getMagicItem(slug);
  if (!item) notFound();
  if (slug === 'starborn' || item.component === 'StarAscension') {
    const component = item.component || 'Starborn';
    const stylesheet = item.stylesheet || 'starborn.css';
    const [source, sharedSource] = await Promise.all([
      readFile(path.join(process.cwd(), 'components', `${component}.js`), 'utf8'),
      readFile(path.join(process.cwd(), 'app', stylesheet), 'utf8'),
    ]);
    return <SaasExperience item={{ ...item, category: 'Star magic', component, stylesheet }} source={source} sharedSource={sharedSource} collection="star-magic" />;
  }
  return <MagicExperience item={item} />;
}
