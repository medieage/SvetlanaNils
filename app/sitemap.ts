import type { MetadataRoute } from 'next';
import { SITE_URL } from './seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // This is a single-page site. Unreleased sections are not separate URLs.
  return [{ url: `${SITE_URL}/` }];
}
