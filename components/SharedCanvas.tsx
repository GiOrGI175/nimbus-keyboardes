import { Content, isFilled } from '@prismicio/client';
import clsx from 'clsx';

type SharedCanvasProps = {
  color: Content.SwitchPlaygroundSliceDefaultPrimarySwitchesItem['switch'];
};

export default function SharedCanvas({ color }: SharedCanvasProps) {
  if (!isFilled.contentRelationship(color) || !color.data) return null;

  const colorName = color.uid as 'red' | 'brown' | 'blue' | 'black';

  const { color: hexColor, name } = color.data;

  const bgColor = {
    blue: 'bg-sky-950',
    red: 'bg-red-950',
    brown: 'bg-amber-950',
    black: 'bg-gray-900',
  }[colorName];

  return (
    <div className='group relative min-h-96 overflow-hidden rounded-3xl select-none'>
      <div
        className={clsx(
          'font-black-slanted absolute inset-0 -z-10 grid place-items-center uppercase text-8xl',
          bgColor,
        )}
      >
        <svg className='pointer-events-none h-auto w-full' viewBox='0 0 75 100'>
          <text
            x='50%'
            y='50%'
            dominantBaseline='middle'
            fontSize={18}
            className='font-black-slanted fill-white/30 uppercase mix-blend-overlay group-hover:fill-white motion-safe:transition-all motion-safe:duration-700'
          >
            {Array.from({ length: 8 }, (_, i) => (
              <tspan key={i} x={`${(i + 1) * 10}%`} dy={i === 0 ? -40 : 14}>
                {colorName}
                {colorName}
                {colorName}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  );
}
