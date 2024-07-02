import { Font, Template } from '@pdfme/common';
import { getInputFromTemplate } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { text, line } from '@pdfme/schemas';
import { Designer } from '@pdfme/ui';

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

export const getBlankTemplate = () =>
  ({ schemas: [{}], basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] } } as Template);

export const getPlugins = () => {
  return {
    Text: text,
    Line: line,
  };
};
const generatePDF = async (currentRef: Designer | null) => {
  if (!currentRef) return { pdf: null, blob: null };

  const template = currentRef.getTemplate();
  const inputs = getInputFromTemplate(template);
  const font = await getFontsData();

  const pdf = await generate({
    template,
    inputs,
    options: { font, title: 'CV-Improver' },
    plugins: getPlugins(),
  });

  const blob = new Blob([pdf.buffer], { type: 'application/pdf' });

  return { pdf, blob };
};

export const previewPDF = async (currentRef: Designer | null) => {
  if (!currentRef) return;

  const { blob } = await generatePDF(currentRef);

  if (blob) {
    window.open(URL.createObjectURL(blob));
  }
};

export const downloadPDF = async (currentRef: Designer | null, title: string) => {
  if (!currentRef) return;

  const { blob } = await generatePDF(currentRef);

  if (blob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = title + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
