import { Header } from '@/components/global';

const LandingLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LandingLayout;
