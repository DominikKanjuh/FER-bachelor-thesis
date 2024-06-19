import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SquareMousePointer } from 'lucide-react';

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Your CV with Ease
                  </h1>
                  <p className="max-w-[600px] md:text-xl text-muted-foreground">
                    Our intuitive drag and drop editor allows you to easily customize your CV. Get personalized
                    suggestions to enhance your resume based on the job description.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant={'default'}>Start Editing</Button>
                  <Button variant={'secondary'}>Use Editor</Button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="bg-secondary rounded-lg p-6 w-full">
                  <h2 className="text-2xl text-secondary-foreground font-bold mb-4">Drag & Drop Editor</h2>
                  <p className="text-muted-foreground mb-6">
                    Easily customize your CV with our intuitive drag and drop editor.
                  </p>
                  <div className="border-2 border-dashed border-secondary-foreground rounded-lg p-8 flex justify-center items-center">
                    <SquareMousePointer className="h-8 w-8  text-secondary-foreground" />
                    <span className="ml-2  text-secondary-foreground">Edit your CV visually with ease</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary text-secondary-foreground  px-3 py-1 text-sm ">
                  AI-Powered Suggestions
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Personalized CV Enhancements</h2>
                <p className="max-w-[900px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
                  {`Paste the job description you're applying for and our AI will analyze it to provide personalized
                suggestions to improve your CV and increase your chances of getting noticed.`}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Keyword Optimization</h3>
                      <p className=" text-muted-foreground">
                        Our AI suggests keywords to help you tailor your CV for specific job applications.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Personalized Feedback</h3>
                      <p className=" text-muted-foreground">
                        Our AI analyzes your CV and the job description to provide personalized suggestions on how to
                        improve your resume.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Seamless Editing</h3>
                      <p className=" text-muted-foreground">
                        Easily update your CV with our intuitive drag and drop editor.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="bg-secondary rounded-lg p-6 w-full">
                  <h2 className="text-2xl font-bold mb-4">Paste Job Description</h2>
                  <p className="text-muted-foreground mb-6">
                    {`Provide the job description you're applying for and we'll analyze it to give you personalized
                  suggestions.`}
                  </p>
                  <div className="border-2 border-dashed border-secondary-foreground rounded-lg p-8 flex justify-center items-center">
                    <Textarea placeholder="Paste job description here" className="w-full h-20 resize-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Started with CV Enhancement</h2>
              <p className="mx-auto max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
                Sign up now to start enhancing your CV with our AI-powered tools.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs  text-muted-foreground">
                Sign up to get started.{' '}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 CV-improver. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </footer>
    </>
  );
}
