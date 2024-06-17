import { isUserAuthenticated } from '@/lib/server-actions/auth-actions';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const UserButton = async () => {
  const { data, error } = await isUserAuthenticated();

  if (!data || error) {
    return (
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    );
  }

  return (
    <Link href="/dashboard">
      <Button>Go to dashboard</Button>
    </Link>
  );
};

export default UserButton;
