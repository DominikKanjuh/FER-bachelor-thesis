import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateToTimeDate } from '@/lib/utils';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DeleteCVButton from './DeleteCVButton';

interface Props {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  modifiedAt: Date;
  inTrash: boolean;
}

const CVCard = ({ id, title, description, createdAt, modifiedAt, inTrash }: Props) => {
  return (
    <Card id="id">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description ? description : '-'}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Created:</span>
          <span>{formatDateToTimeDate(createdAt)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Modified:</span>
          <span>{formatDateToTimeDate(modifiedAt)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <DeleteCVButton cvId={id} inTrash={inTrash} />
        <Link href={`/dashboard/cv/${id}`}>
          <Button variant="secondary" size="sm">
            <Bot className="mr-2" size={'20'} />
            Edit with AI
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CVCard;
