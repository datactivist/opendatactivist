import Layout from '../../components/Layout';
import CellsBarChart from '../../components/dataviz/CellsBarChart';

const StatsPage = () => {
  return (
    <Layout>
      <br></br>
      <br></br>
      <h1>Mots clés des cellules</h1>
      <CellsBarChart />
    </Layout>
  );
};

export default StatsPage;
