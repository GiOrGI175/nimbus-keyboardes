import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { Content } from '@prismicio/client';
import clsx from 'clsx';

type BentoBoxItemProps = {
  item: any;
};

export default function BentoBoxItem({ item }: BentoBoxItemProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-3xl',
        item.size === 'Small' && 'md:col-span-2',
        item.size === 'Medium' && 'md:col-span-3',
        item.size === 'Large' && 'md:col-span-4',
      )}
    >
      <PrismicNextImage
        field={item.image}
        className='h-full w-full object-cover'
        quality={96}
        width={700}
        alt={item.image?.alt || ''}
      />

      <div className='absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-black' />

      <div className='absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white'>
        <PrismicRichText field={item.text} />
      </div>
    </div>
  );
}
