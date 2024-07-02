'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CVType, CvInsertType } from '@/lib/drizzle/types';
import { useEffect, useRef, useState } from 'react';
import { Designer } from '@pdfme/ui';
import { Template, checkTemplate } from '@pdfme/common';

import { downloadPDF, getFontsData, getPlugins, previewPDF, getBlankTemplate } from '@/lib/designer-utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '../Loader';
import { editCV } from '@/lib/server-actions/cv-actions';
import { toast } from '@/components/ui/use-toast';
import { CVTitleDescriptionSchema } from '@/lib/zod-schemas';
import CVAISuggestion from './CVAISuggestion';

const CVDesigner = ({ cv }: { cv: CVType }) => {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const [prevDesignerRef, setPrevDesignerRef] = useState<Designer | null>(null);

  const form = useForm<CvInsertType>({
    resolver: zodResolver(CVTitleDescriptionSchema),
    defaultValues: {
      ...cv,
    },
  });

  async function onSubmitTitleData(values: CvInsertType) {
    try {
      await editCV(cv.id, values);
      toast({
        title: 'Success',
        description: 'CV title and description edited successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    }
  }

  const onSaveTemplate = async (currentRef: Designer | null) => {
    if (!currentRef) return;
    try {
      const newValues = { ...cv, content: designer.current?.getTemplate() };
      await editCV(cv.id, newValues);
      toast({
        title: 'Success',
        description: 'CV saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    }
  };

  const buildDesigner = () => {
    let template: Template;
    // @ts-ignore
    const templateJson = cv.content ? cv.content : getBlankTemplate();

    checkTemplate(templateJson);
    template = templateJson as Template;

    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
          options: {
            font,
            lang: 'en',
            theme: {
              token: {
                colorPrimary: '#7E22CE',
                colorSecondary: '#B49CC9',
                colorBgLayout: '#F3E5FF',
              },
            },
          },
          plugins: getPlugins(),
        });
      }
    });
  };

  useEffect(() => {
    // @ts-ignore
    if (designerRef !== prevDesignerRef) {
      if (prevDesignerRef && designer.current) {
        designer.current.destroy();
      }
      buildDesigner();
      // @ts-ignore
      setPrevDesignerRef(designerRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designerRef, prevDesignerRef]);

  return (
    <>
      <section className="flex p-6 gap-6 justify-between items-center">
        <div className="flex gap-6 max-w-[40%] items-center">
          <div>
            <h1 className="line-clamp-1">
              <strong>Title:</strong> {cv.title}
            </h1>
            <h2 className="line-clamp-1">
              <strong>Description: </strong>
              {cv.description}
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create form</DialogTitle>
                <DialogDescription>Create a new form to start collecting responses</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitTitleData)} className="space-y-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          {/* @ts-expect-error */}
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onSubmitTitleData)}
                  disabled={form.formState.isSubmitting}
                  className="w-full mt-4"
                >
                  {!form.formState.isSubmitting && <span>Save</span>}
                  {form.formState.isSubmitting && <Loader />}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2 max-w-[30%]">
          <CVAISuggestion cv={cv} />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => previewPDF(designer.current)}>
            Preview
          </Button>
          <Button variant="secondary" onClick={() => onSaveTemplate(designer.current)}>
            Save
          </Button>
          <Button variant="default" onClick={() => downloadPDF(designer.current, cv.title)}>
            Download
          </Button>
        </div>
      </section>
      <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - ${156}px)` }} />
    </>
  );
};

export default CVDesigner;
