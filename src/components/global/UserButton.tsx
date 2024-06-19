import { isUserAuthenticated } from '@/lib/server-actions/auth-actions';
import Link from 'next/link';
import React from 'react';

const UserButton = async () => {
  const { data, error } = await isUserAuthenticated();
  const { session } = data;

  if (!session || error) {
    return (
      <Link href="/login" className="cursor-pointer underline-offset-4 hover:underline">
        Login
      </Link>
    );
  }

  return (
    <Link href="/dashboard" className="cursor-pointer underline-offset-4 hover:underline">
      Dashboard
    </Link>
  );
};

export default UserButton;
