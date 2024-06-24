import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToTimeDate(date: Date): string {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a Date object');
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const timeString: string = date.toLocaleTimeString('en-GB', timeOptions);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const dateString: string = date.toLocaleDateString('en-GB', dateOptions);

  return `${timeString}, ${dateString.replace(/\//g, '.')}`;
}

export function stringToBoolean(str: string): boolean {
  return str === 'true';
}
