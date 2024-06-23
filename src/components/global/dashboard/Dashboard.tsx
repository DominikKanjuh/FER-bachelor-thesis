'use client';

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
import { CVType } from '@/lib/drizzle/types';

import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

enum SortBy {
  DateCreated = 'date_created',
  DateModified = 'date_modified',
}

enum SortOrder {
  NewToOld = 'new_to_old',
  OldToNew = 'old_to_new',
}

const Dashboard = ({ cvs: _cvs }: { cvs?: CVType[] }) => {
  const [cvs, setCvs] = useState<CVType[] | undefined>(_cvs);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DateCreated);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.NewToOld);

  useEffect(() => {
    if (!_cvs) return;

    let filteredCVs = _cvs.sort((a, b) => {
      const dateA = new Date(sortBy === 'date_created' ? a.createdAt : a.updatedAt);
      const dateB = new Date(sortBy === 'date_created' ? b.createdAt : b.updatedAt);
      return sortOrder === 'new_to_old' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    filteredCVs = filteredCVs.filter((cv) => cv.title.toLowerCase().includes(searchTerm.toLowerCase()));

    setCvs(filteredCVs);
  }, [searchTerm, sortBy, sortOrder, _cvs]);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search CVs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(e) => setSortBy(e as SortBy)}>
                  <DropdownMenuRadioItem value={SortBy.DateCreated}>Date Created</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={SortBy.DateModified}>Date Modified</DropdownMenuRadioItem>
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
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={(e) => setSortOrder(e as SortOrder)}>
                  <DropdownMenuRadioItem value={SortOrder.NewToOld}>New to Old</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={SortOrder.OldToNew}>Old to New</DropdownMenuRadioItem>
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
          <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
