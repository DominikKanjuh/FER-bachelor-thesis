import { Logo, ThemeSwitcher, UserButton } from '@/components/global';

function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b-2 bg-background border-primary h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default DashboardLayout;
