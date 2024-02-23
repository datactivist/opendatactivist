import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';


const MarkdownDocs = dynamic(() => import('../../components/docs/MarkdownDocs'), {
  ssr: false, // Disable server-side rendering for this component
});
// Define a function to fetch the metadata on the server side
export async function getServerSideProps(context) {
  const { filename } = context.query;

  try {
    const response = await fetch(`https://open.datactivist.coop/api/metadoc?filename=${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Set a default image URL if metadata.image is missing
    const defaultImageUrl = 'https://open.datactivist.coop/images/default-image-url.png'; // Replace with your default image URL

    return {
      props: {
        metadata: {
          title: data.metadata.title || 'Default Title',
          description: data.metadata.description || 'Default Description',
          image: data.metadata.image || defaultImageUrl, // Use metadata.image if available, or the default image URL
        },
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      props: {
        metadata: {
          title: 'Default Title',
          description: 'Default Description',
          image: 'https://open.datactivist.coop/images/default-image-url.png', // Set a default image URL here if needed
        },
      },
    };
  }
}
// ...
const DocsPage = ({ metadata }) => {
  const router = useRouter();
  const { filename } = router.query;

  // Check if we are running on the client side
  const isClient = typeof window !== 'undefined';

  return (
    <div>
      <Head>
        <title>{metadata?.title || 'Default Title'}</title>
        <meta name="description" content={metadata?.description || 'Default Description'} />
        {/* Open Graph / Facebook / LinkedIn */}
        {metadata?.image && isClient && (
          <>
            <meta property="og:image" content={metadata.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:title" content={metadata?.title || 'Default Title'} />
            <meta property="og:description" content={metadata?.description || 'Default Description'} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={router.asPath} />
          </>
        )}
        {/* Twitter */}
        {metadata?.image && isClient && (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={metadata.image} />
            <meta name="twitter:title" content={metadata?.title || 'Default Title'} />
            <meta name="twitter:description" content={metadata?.description || 'Default Description'} />
          </>
        )}
      </Head>
      <br></br>
      {filename && <MarkdownDocs filename={filename} metadata={metadata} />}
    </div>
  );
};

export default DocsPage;
