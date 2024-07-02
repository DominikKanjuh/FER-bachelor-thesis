import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CVType } from '@/lib/drizzle/types';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Chat } from '../chat';
import { AISuggestionType } from '@/lib/types';

const getTextContent = (content: any) => {
  // @ts-ignore
  return (
    content
      // @ts-ignore
      .map((schema) =>
        Object.values(schema)
          // @ts-ignore
          .filter((field) => field.type === 'text')
          .map((field) => ({
            // @ts-ignore
            x: field.position.x,
            // @ts-ignore
            y: field.position.y,
            // @ts-ignore
            content: field.content.replace(/\n/g, ' ').trim(),
          }))
      )
      .flat()
      // @ts-ignore
      .sort((a, b) => {
        if (a.y === b.y) {
          return a.x - b.x;
        }
        return a.y - b.y;
      })
      // @ts-ignore
      .map((field) => field.content)
      .join(' ')
  );
};

const CVAISuggestion = ({ cv }: { cv: CVType }) => {
  const content = cv.content;
  // @ts-ignore
  const cvTextContent: string = getTextContent(content?.schemas);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'default'} disabled={!content}>
          Get AI Suggestions
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Generate AI Suggestions</SheetTitle>
          <SheetDescription>
            Ask AI to give you either general suggestions or suggestions for a specific job application.
          </SheetDescription>
        </SheetHeader>

        <div className="w-full mt-4">
          <Tabs defaultValue={AISuggestionType.General}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value={AISuggestionType.General} className="w-1/2">
                General
              </TabsTrigger>
              <TabsTrigger value={AISuggestionType.JobApplication} className="w-1/2">
                Job Application
              </TabsTrigger>
            </TabsList>
            <TabsContent value={AISuggestionType.General} className="h-[calc(100vh-204px)] overflow-y-auto">
              <Chat type={AISuggestionType.General} cvContent={cvTextContent} />
            </TabsContent>
            <TabsContent value={AISuggestionType.JobApplication} className="h-[calc(100vh-204px)] overflow-y-auto">
              <Chat type={AISuggestionType.JobApplication} cvContent={cvTextContent} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CVAISuggestion;
