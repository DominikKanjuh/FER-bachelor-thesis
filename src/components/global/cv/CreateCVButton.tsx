'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';

import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { toast } from '../../ui/use-toast';
import { Input } from '../../ui/input';
import Loader from '../Loader';
import { FilePlus2 } from 'lucide-react';
import { CVTitleDescriptionSchema } from '@/lib';

import { createCV } from '@/lib/server-actions/cv-actions';
import { CvInsertType } from '@/lib/drizzle/types';

function CreateCVButton() {
  const router = useRouter();
  const form = useForm<CvInsertType>({
    resolver: zodResolver(CVTitleDescriptionSchema),
  });

  async function onSubmit(values: CvInsertType) {
    try {
      const cvId = await createCV(values);
      toast({
        title: 'Success',
        description: 'CV created successfully. You will be redirected to the CV editor.',
      });

      router.push(`/dashboard/cv/${cvId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FilePlus2 className="mr-0 sm:mr-2" size={'20'} />
          <span className="hidden sm:block">Add new CV</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>Create a new form to start collecting responses</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
            {!form.formState.isSubmitting && <span>Create</span>}
            {form.formState.isSubmitting && <Loader />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCVButton;
