import { Dashboard } from '@/components/global/dashboard';
import { getAllCVs } from '@/lib/server-actions/cv-actions';

const DashboardPage = async () => {
  const cvs = await getAllCVs();

  return <Dashboard cvs={cvs} />;
};

export default DashboardPage;
