import { CvCard } from '@/components/global';
import CreateCVButton from '@/components/global/CreateCVCard';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import db from '@/lib/supabase/db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowUpDownIcon } from 'lucide-react';
import { cookies } from 'next/headers';

const Dashboard = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const cvs = await db.query.cvs.findMany({
    where: (cv, { eq }) => eq(cv.cvOwner, user.id),
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
        <div className="flex-1">
          <Input placeholder="Search CVs by title..." />
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDownIcon className="w-4 h-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value="date_created">
                  <DropdownMenuRadioItem value="date_created">Date Created</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date_modified">Date Modified</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDownIcon className="w-4 h-4" />
                  From
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value="new_to_old">
                  <DropdownMenuRadioItem value="new_to_old">New to Old</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="old_to_new">Old to New</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CreateCVButton />
        </div>
      </div>

      <div className="flex w-full h-full justify-center items-center">
        {cvs.length === 0 ? (
          <div className="flex w-full h-full justify-center items-center text-md md:text-xl">
            You have no CVs yet. Create a new one by clicking the button above.
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cvs.map((cv) => (
              <CvCard
                key={cv.id}
                id={Number(cv.id)}
                title={cv.title}
                description={cv.description}
                createdAt={new Date(cv.createdAt)}
                modifiedAt={new Date(cv.updatedAt)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
