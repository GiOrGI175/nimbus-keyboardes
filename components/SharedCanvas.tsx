import { Content, isFilled } from '@prismicio/client';

type SharedCanvasProps = {
  color: Content.SwitchPlaygroundSliceDefaultPrimarySwitchesItem['switch'];
};

export default function SharedCanvas({ color }: SharedCanvasProps) {
  if (!isFilled.contentRelationship(color) || !color.data) return null;

  const colorName = color.uid as 'red' | 'brown' | 'blue' | 'black';

  const { color: hexColor, name } = color.data;

  return <div></div>;
}
