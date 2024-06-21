import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { formatDateToTimeDate } from '@/lib/utils';
import { Bot } from 'lucide-react';

interface Props {
  id: number;
  title: string;
  description: string | null;
  createdAt: Date;
  modifiedAt: Date;
}

const CvCard = ({ id, title, description, createdAt, modifiedAt }: Props) => {
  return (
    <Card id="id">
      <CardHeader>
        <CardTitle className="truncate line-clamp-2">{title}</CardTitle>
        {description && <CardDescription className="truncate line-clamp-3">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Created at:</span>
          <span>{formatDateToTimeDate(createdAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Last Modified at:</span>
          <span>{formatDateToTimeDate(modifiedAt)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/cv/${id}`}>
          <Button variant="secondary" size="sm">
            <Bot className="mr-2" size={'20'} />
            Edit with AI
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CvCard;
