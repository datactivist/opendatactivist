import { useRouter } from 'next/router';
import Head from 'next/head';
import MarkdownDocs from '../../components/docs/MarkdownDocs';
import React, { useEffect, useState } from 'react';

const DocsPage = () => {
  const router = useRouter();
  const { filename } = router.query;
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    // Fetch the metadata here and set it
    const fetchMetadata = async () => {
      // Replace this with your actual API call
      const response = await fetch(`/api/metadoc?filename=${filename}`);
      const data = await response.json();
      setMetadata(data.metadata);
    };

    if (filename) {
      fetchMetadata();
    }
  }, [filename]);

  return (
    <div>
      <Head>
        <title>{metadata?.title || 'Default Title'}</title>
        <meta name="description" content={metadata?.description || 'Default Description'} />
        {/* Open Graph / Facebook / LinkedIn */}
        {metadata?.image && (
          <>
            <meta property="og:image" content={metadata.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:title" content={metadata?.title || 'Default Title'} />
            <meta property="og:description" content={metadata?.description || 'Default Description'} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
          </>
        )}
        {/* Twitter */}
        {metadata?.image && (
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
