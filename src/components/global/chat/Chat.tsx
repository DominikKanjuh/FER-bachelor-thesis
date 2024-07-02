'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { AISuggestionType } from '@/lib/types';
import { AISuggestionGeneralSchema } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loader from '../Loader';

const Chat = ({ type, cvContent }: { type: AISuggestionType; cvContent: string }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/openai',
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
  }, [messages]);

  const form = useForm<z.infer<typeof AISuggestionGeneralSchema>>({
    mode: 'onChange',
    resolver: zodResolver(AISuggestionGeneralSchema),
    defaultValues: { input: cvContent },
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-full">
        <div className="h-[calc(100vh-260px)]" ref={chatContainerRef}>
          {type === AISuggestionType.JobApplication && (
            <Textarea
              rows={4}
              placeholder="Paste your job description here!"
              value={input}
              onChange={handleInputChange}
            />
          )}
          <div>
            {messages.map((message, index) => (
              <div key={message.id} className="w-full">
                <p>{message.content}</p>
                {index < messages.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full mt-4">
          {!isLoading ? <span>Get Suggestions</span> : <Loader />}
        </Button>
      </div>
    </form>
  );
};

export default Chat;
