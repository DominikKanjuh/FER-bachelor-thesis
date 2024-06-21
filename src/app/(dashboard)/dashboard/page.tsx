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

const Dashboard = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
        <div className="flex-1">
          <Input placeholder="Search CVs by title..." />
        </div>
        <div className="flex justify-end items-center gap-4">
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
      </div>
    </div>
  );
};

export default Dashboard;
