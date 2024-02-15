// pages/references/[reference].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export async function getServerSideProps(context) {
    const { params, req } = context;
    const { reference } = params;
    
    // Construct the URL based on the request's headers
    // This assumes your Next.js app and API are hosted on the same domain
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const apiUrl = `${protocol}://${host}/api/references?action=get&id=${reference}`;
  
    const res = await fetch(apiUrl);
    const data = await res.json();
  
    if (!data || res.status === 404) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        referenceData: data,
      },
    };
  }

export default function ReferencePage({ referenceData }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Destructure data for easier access
  const { title, team, partners, partnerDescription, partnerImage, mission, actions } = referenceData;

  return (
    <Layout>
    <div>
      <h1>{title}</h1>
      <img src={partnerImage} alt={`Image of ${partners}`} />
      <h2>Team</h2>
      <p>{team.split(',').join(', ')}</p>
      <h2>Partners</h2>
      <p>{partners}</p>
      <h3>Partner Description</h3>
      <p>{partnerDescription}</p>
      <h3>Mission</h3>
      <p>{mission}</p>
      <h3>Actions</h3>
      <p>{actions}</p>
    </div>
    </Layout>
  );
}
