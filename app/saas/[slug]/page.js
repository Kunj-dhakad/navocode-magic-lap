import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { getSaasItem, saasItems } from '../../../lib/saas';
import SaasExperience from '../../../components/SaasExperience';

export const dynamicParams = false;

export function generateStaticParams() {
  return saasItems.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getSaasItem(slug);
  return { title: item ? `${item.title} — NavoCode SaaS UI` : 'Component not found', description: item?.blurb };
}

export default async function SaasPage({ params }) {
  const { slug } = await params;
  const item = getSaasItem(slug);
  if (!item) notFound();
  const directory = path.join(process.cwd(), 'components', 'saas');
  const [source, sharedSource] = await Promise.all([
    readFile(path.join(directory, `${item.component}.js`), 'utf8'),
    readFile(path.join(directory, 'UI.js'), 'utf8'),
  ]);
  return <SaasExperience item={item} source={source} sharedSource={sharedSource} />;
}
