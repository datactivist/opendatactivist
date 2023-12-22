// DocsPage.js
import Head from 'next/head';
import MarkdownDocs from '../../components/docs/MarkdownDocs';
import React from 'react';

const DocsPage = ({ metadata }) => {
  const absoluteUrl = (path = '') => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
  };

  return (
    <div>
      <Head>
        <title>{metadata?.title || 'Default Title'}</title>
        <meta name="description" content={metadata?.description || 'Default Description'} />
        
        {/* Open Graph / Facebook / LinkedIn */}
        {metadata?.image && (
          <>
            <meta property="og:image" content={absoluteUrl(metadata.image)} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:title" content={metadata?.title || 'Default Title'} />
            <meta property="og:description" content={metadata?.description || 'Default Description'} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={absoluteUrl()} />
          </>
        )}

        {/* Twitter */}
        {metadata?.image && (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={absoluteUrl(metadata.image)} />
            <meta name="twitter:title" content={metadata?.title || 'Default Title'} />
            <meta name="twitter:description" content={metadata?.description || 'Default Description'} />
          </>
        )}
      </Head>
      <MarkdownDocs filename={metadata?.name} metadata={metadata} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { filename } = context.query;

  try {
    const response = await fetch(`https://open.datactivist.coop/api/metadoc?filename=${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { props: { metadata: data.metadata } };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return { props: { metadata: {} } }; // Fallback to default metadata
  }
}

export default DocsPage;
