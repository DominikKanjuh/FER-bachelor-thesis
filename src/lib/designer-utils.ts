import { Font } from '@pdfme/common';

const fontObjList = [
  {
    fallback: true,
    label: 'Roboto-Medium',
    url: '/fonts/roboto/Roboto-Medium.ttf',
  },
  {
    fallback: false,
    label: 'Roboto-Light',
    url: '/fonts/roboto/Roboto-Light.ttf',
  },
];

export const getFontsData = async () => {
  const fontDataList = await Promise.all(
    fontObjList.map(async (font) => ({
      ...font,
      data: await fetch(font.url).then((res) => res.arrayBuffer()),
    }))
  );

  return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font);
};
