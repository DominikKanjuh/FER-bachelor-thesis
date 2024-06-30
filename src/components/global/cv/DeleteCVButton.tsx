'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { deleteCV, removeFromTrashCV } from '@/lib/server-actions/cv-actions';
import { FileX2, Undo2 } from 'lucide-react';
import { useState } from 'react';

const DeleteCVButton = ({ cvId, inTrash }: { cvId: string; inTrash: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCV = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromTrash = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mr-2">
      <Button variant={'destructive'} size={'sm'} onClick={handleDeleteCV} disabled={isLoading}>
        <FileX2 size={'20'} />
      </Button>
      {inTrash ? (
        <Button variant={'default'} size={'sm'} onClick={handleRemoveFromTrash} disabled={isLoading}>
          <Undo2 size={'20'} />
        </Button>
      ) : null}
    </div>
  );
};

export default DeleteCVButton;
