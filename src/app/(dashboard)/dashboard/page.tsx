import { CVCard, CreateCVButton } from '@/components/global';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { getAllCVs } from '@/lib/server-actions/get-all-cvs';

import { ArrowUpDownIcon } from 'lucide-react';

const Dashboard = async () => {
  const cvs = await getAllCVs();

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
        {!cvs || cvs.length === 0 ? (
          <div className="flex w-full h-full justify-center items-center text-md md:text-xl">
            You have no CVs yet. Create a new one by clicking the button above.
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cvs.map((cv) => (
              <CVCard
                key={cv.id}
                id={cv.id}
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
