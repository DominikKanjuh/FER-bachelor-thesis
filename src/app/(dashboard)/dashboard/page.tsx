import { CvCard } from '@/components/global';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ArrowUpDownIcon } from 'lucide-react';
import React from 'react';

const MOCK_DATA = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Sample Title ${index + 1}`,
  description: `This is a sample description for the card number ${index + 1}.`,
  createdAt: new Date(),
  modifiedAt: new Date(),
}));

const Dashboard = () => {
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
          <Button>Add new CV</Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {MOCK_DATA.map((cv) => (
          <CvCard
            key={cv.id}
            id={cv.id}
            title={cv.title}
            description={cv.description}
            createdAt={cv.createdAt}
            modifiedAt={cv.modifiedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
