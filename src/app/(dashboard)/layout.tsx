import { Header } from '@/components/global';

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="w-full h-full">
      <Header />
      {children}
    </main>
  );
};

export default DashboardLayout;
