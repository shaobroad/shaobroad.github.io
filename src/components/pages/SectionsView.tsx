'use client';

import About from '@/components/home/About';
import News from '@/components/home/News';
import PhotoGallery from '@/components/home/PhotoGallery';
import type { SectionConfig } from '@/lib/content';

interface SectionsViewProps {
  sections: SectionConfig[];
}

/** 渲染一组 sections(about 类型页面复用,首页与独立页面共用) */
export default function SectionsView({ sections }: SectionsViewProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case 'markdown':
            return (
              <About
                key={section.id}
                content={section.content || ''}
                title={section.title}
              />
            );
          case 'list':
            return (
              <News
                key={section.id}
                items={section.items || []}
                title={section.title}
              />
            );
          case 'photos':
            return (
              <PhotoGallery
                key={section.id}
                items={section.photos || []}
                title={section.title}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
