import { getConfig } from '@/lib/config';
import { getMarkdownContent, getTomlContent, getPageConfig } from '@/lib/content';
import HomePageClient, { type HomePageLocaleData } from '@/components/home/HomePageClient';
import { BasePageConfig, TextPageConfig, CardPageConfig } from '@/types/page';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import { PhotoItem } from '@/components/home/PhotoGallery';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'list' | 'photos';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  items?: NewsItem[];
  photos?: PhotoItem[];
}

interface NewsItem {
  date: string;
  content: string;
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

function processSections(sections: SectionConfig[], locale?: string): SectionConfig[] {
  return sections.map((section: SectionConfig) => {
    switch (section.type) {
      case 'markdown':
        return {
          ...section,
          content: section.source ? getMarkdownContent(section.source, locale) : '',
        };
      case 'list': {
        const newsData = section.source ? getTomlContent<{ news: NewsItem[] }>(section.source, locale) : null;
        return {
          ...section,
          items: newsData?.news || [],
        };
      }
      case 'photos': {
        const photoData = section.source ? getTomlContent<{ photos: PhotoItem[] }>(section.source, locale) : null;
        return {
          ...section,
          photos: photoData?.photos || [],
        };
      }
      default:
        return section;
    }
  });
}

function loadPageDataForLocale(locale: string | undefined): HomePageLocaleData {
  const localeConfig = getConfig(locale);
  const enableOnePageMode = localeConfig.features.enable_one_page_mode;

  const aboutConfig = getPageConfig<{ profile?: { research_interests?: string[] }; sections?: SectionConfig[] }>('about', locale);
  const researchInterests = aboutConfig?.profile?.research_interests;

  let pagesToShow: PageData[] = [];

  if (enableOnePageMode) {
    pagesToShow = localeConfig.navigation
      .filter((item) => item.type === 'page')
      .map((item) => {
        const rawConfig = getPageConfig(item.target, locale);
        if (!rawConfig) return null;

        const pageConfig = rawConfig as BasePageConfig;

        if (pageConfig.type === 'about' || 'sections' in (rawConfig as object)) {
          return {
            type: 'about',
            id: item.target,
            sections: processSections((rawConfig as { sections: SectionConfig[] }).sections || [], locale),
          } as PageData;
        }

        if (pageConfig.type === 'text') {
          const textConfig = pageConfig as TextPageConfig;
          return {
            type: 'text',
            id: item.target,
            config: textConfig,
            content: getMarkdownContent(textConfig.source, locale),
          } as PageData;
        }

        if (pageConfig.type === 'card') {
          return {
            type: 'card',
            id: item.target,
            config: pageConfig as CardPageConfig,
          } as PageData;
        }

        return null;
      })
      .filter((item): item is PageData => item !== null);
  } else if (aboutConfig) {
    pagesToShow = [{
      type: 'about',
      id: 'about',
      sections: processSections(aboutConfig.sections || [], locale),
    }];
  }

  return {
    author: localeConfig.author,
    social: localeConfig.social,
    features: localeConfig.features,
    enableOnePageMode,
    researchInterests,
    pagesToShow,
  };
}

export default function Home() {
  const baseConfig = getConfig();
  const runtimeI18n = getRuntimeI18nConfig(baseConfig.i18n);
  const targetLocales = runtimeI18n.enabled ? runtimeI18n.locales : [runtimeI18n.defaultLocale];

  const dataByLocale: Record<string, HomePageLocaleData> = {};

  for (const locale of targetLocales) {
    dataByLocale[locale] = loadPageDataForLocale(locale);
  }

  if (!dataByLocale[runtimeI18n.defaultLocale]) {
    dataByLocale[runtimeI18n.defaultLocale] = loadPageDataForLocale(undefined);
  }

  return <HomePageClient dataByLocale={dataByLocale} defaultLocale={runtimeI18n.defaultLocale} />;
}
