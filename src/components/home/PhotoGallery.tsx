'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CameraIcon } from '@heroicons/react/24/outline';

export interface PhotoItem {
  src: string;
  caption: string;
  location?: string;
}

interface PhotoGalleryProps {
  items: PhotoItem[];
  title?: string;
}

export default function PhotoGallery({ items, title }: PhotoGalleryProps) {
  const resolvedTitle = title || '成长相册';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <CameraIcon className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((photo, index) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 * index }}
            className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:-rotate-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-700">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-snug">{photo.caption}</p>
              {photo.location && (
                <p className="text-xs text-accent mt-1">📍 {photo.location}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
