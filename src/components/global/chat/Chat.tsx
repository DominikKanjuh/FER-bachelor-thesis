'use client';

import { Button } from '@/components/ui/button';

import { Textarea } from '@/components/ui/textarea';
import { AISuggestionType } from '@/lib/types';

import { useCompletion } from 'ai/react';
import { useEffect, useRef, useState } from 'react';

import Loader from '../Loader';
import Markdown from 'react-markdown';

const Chat = ({ type, cvContent }: { type: AISuggestionType; cvContent: string }) => {
  const { completion, complete, isLoading } = useCompletion({
    api: '/api/ai',
  });

  const chatContainerRef = useRef<React.ElementRef<'div'>>(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainerRef.current as HTMLDivElement;
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainerRef.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [completion]);

  const [jobApplication, setJobApplication] = useState<string | null>(null);

  const handleAISuggestion = async () => {
    let promptText = '';

    if (jobApplication) {
      promptText += `Job application ${jobApplication} `;
    }

    promptText = `CV content: ${cvContent}`;

    await complete(promptText);
  };

  return (
    <div className="h-full">
      <div className="h-[calc(100vh-232px)] overflow-y-auto" ref={chatContainerRef}>
        {type === AISuggestionType.JobApplication && (
          <Textarea
            rows={4}
            placeholder="Paste your job description here!"
            onChange={(e) => setJobApplication(e.currentTarget.value)}
          />
        )}
        <Markdown>{completion}</Markdown>
      </div>
      <Button className="w-full mt-4" onClick={handleAISuggestion}>
        {!isLoading ? <span>Get Suggestions</span> : <Loader />}
      </Button>
    </div>
  );
};

export default Chat;
