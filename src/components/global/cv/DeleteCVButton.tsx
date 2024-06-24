'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { deleteCV, removeFromTrashCV } from '@/lib/server-actions/cv-actions';
import { FileX2, Undo2 } from 'lucide-react';

const DeleteCVButton = ({ cvId, inTrash }: { cvId: string; inTrash: boolean }) => {
  const handleDeleteCV = async () => {
    try {
      await deleteCV(cvId);
      toast({
        title: 'Success',
        description: 'CV was moved to trash. You can still restore it from the trash.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveFromTrash = async () => {
    try {
      await removeFromTrashCV(cvId);
      toast({
        title: 'Success',
        description: 'CV was removed from trash.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {inTrash ? (
        <div className="flex gap-2 mr-2">
          <Button variant={'destructive'} size={'sm'} onClick={handleDeleteCV}>
            <FileX2 size={'20'} />
          </Button>
          <Button variant={'default'} size={'sm'} onClick={handleRemoveFromTrash}>
            <Undo2 size={'20'} />
          </Button>
        </div>
      ) : (
        <Button variant={'destructive'} size={'sm'} onClick={handleDeleteCV}>
          <FileX2 className="mr-2" size={'20'} />
          Delete
        </Button>
      )}
    </>
  );
};

export default DeleteCVButton;
