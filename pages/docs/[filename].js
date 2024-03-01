import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';


const MarkdownDocs = dynamic(() => import('../../components/docs/MarkdownDocs'), {
  ssr: false,
});
export async function getServerSideProps(context) {
  const { filename } = context.query;

  try {
    const response = await fetch(`https://open.datactivist.coop/api/metadoc?filename=${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const defaultImageUrl = 'https://open.datactivist.coop/images/default-image-url.png';

    return {
      props: {
        metadata: {
          title: data.metadata.title || 'Default Title',
          description: data.metadata.description || 'Default Description',
          image: data.metadata.image || defaultImageUrl,
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
          image: 'https://open.datactivist.coop/images/default-image-url.png',
        },
      },
    };
  }
}
// ...
const DocsPage = ({ metadata }) => {
  const router = useRouter();
  const imageUrl = `https://open.datactivist.coop${metadata.image.startsWith('/') ? '' : '/'}${metadata.image}`;

  return (
    <div>
      <Head>
      <title>{metadata.title || 'Default Title'}</title>
        <meta name="description" content={metadata.description || 'Default Description'} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content={metadata.title || 'Default Title'} />
        <meta property="og:description" content={metadata.description || 'Default Description'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://open.datactivist.coop/docs/${router.query.filename}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:title" content={metadata.title || 'Default Title'} />
        <meta name="twitter:description" content={metadata.description || 'Default Description'} />
      </Head>
      <br />
      {router.query.filename && <MarkdownDocs filename={router.query.filename} metadata={metadata} />}
    </div>  );
};

export default DocsPage;
