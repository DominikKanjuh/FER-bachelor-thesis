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
import { CVCreationSchema } from '@/lib';

import { CvInsert } from '@/lib/drizzle/schema';
import { createCV } from '@/lib/server-actions/create-cv';

function CreateCVButton() {
  const router = useRouter();
  const form = useForm<CvInsert>({
    resolver: zodResolver(CVCreationSchema),
  });

  async function onSubmit(values: CvInsert) {
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
          <FilePlus2 className="mr-2" size={'20'} />
          Add new CV
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
