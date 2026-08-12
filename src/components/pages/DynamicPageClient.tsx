'use client';

import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import SectionsView from '@/components/pages/SectionsView';
import {
  TextPageConfig,
  CardPageConfig,
  BasePageConfig,
} from '@/types/page';
import type { SectionConfig } from '@/lib/content';
import { useLocaleStore } from '@/lib/stores/localeStore';

export type DynamicPageLocaleData =
  | { type: 'text'; config: TextPageConfig; content: string }
  | { type: 'card'; config: CardPageConfig }
  | { type: 'about'; id: string; config: BasePageConfig; sections: SectionConfig[] };

interface DynamicPageClientProps {
  dataByLocale: Record<string, DynamicPageLocaleData>;
  defaultLocale: string;
}

export default function DynamicPageClient({ dataByLocale, defaultLocale }: DynamicPageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const pageData = dataByLocale[locale] || fallback;

  if (!pageData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {pageData.type === 'text' && (
        <TextPage config={pageData.config} content={pageData.content} />
      )}
      {pageData.type === 'card' && (
        <CardPage config={pageData.config} />
      )}
      {pageData.type === 'about' && (
        <div className="space-y-8">
          <SectionsView sections={pageData.sections} />
        </div>
      )}
    </div>
  );
}
