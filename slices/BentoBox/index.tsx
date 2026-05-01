import { FC } from 'react';
import { asText, Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import BentoBoxItem from '@/components/BentoBoxItem';
import { Bounded } from '@/components/Bounded';
import FadeIn from '@/components/FadeIn';

/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>;

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className='font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl'>
                {children}
              </h2>
            ),
          }}
        />
      </FadeIn>
      <FadeIn targetChildren className='grid grid-cols-1 gap-4 md:grid-cols-6'>
        {slice.primary.items.map((item) => (
          <BentoBoxItem key={asText(item.text)} item={item} />
        ))}
      </FadeIn>
    </Bounded>
  );
};

export default BentoBox;
