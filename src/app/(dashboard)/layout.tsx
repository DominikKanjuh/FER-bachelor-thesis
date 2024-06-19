import { Header } from '@/components/global';

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="w-full h-full">{children}</main>
    </>
  );
};

export default DashboardLayout;
