import { CVDesigner } from '@/components/global';
import { getCV } from '@/lib/server-actions/cv-actions';

const CVPage = async ({ params }: { params: { cvId: string } }) => {
  const cvId = params.cvId;
  const CVdata = await getCV(cvId);

  return <CVDesigner cv={CVdata} />;
};

export default CVPage;
