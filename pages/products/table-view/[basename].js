import { useRouter } from 'next/router';
import TableViewer from '../../../components/database/TableViewer';
import Layout from '../../../components/Layout';

const DatabasePage = () => {
  const router = useRouter();
  const { basename } = router.query;

  if (!basename) {
    return <div>Chargement...</div>;
  }

  return (
    <Layout>
    <br></br>
    <div>
      <h1>Base de données: {basename}</h1>
      <TableViewer database={basename} />
    </div>
    </Layout>
  );
};

export default DatabasePage;
