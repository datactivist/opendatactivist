import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import styles from '../../styles/MarkdownContent.module.css';
import Layout from '../Layout';
import FilteredDocsDisplay from './FilteredDocsDisplay';
import FilteredLinksDisplay from './FilteredLinksDisplay';
import DatagouvDisplay from './DatagouvDisplay';
import JsonGalleryDisplay from './JsonGalleryDisplay';
import DocsMetadata from './DocsMetadata';
import ProductDisplay from './ProductsDisplay';
import Partners from '../nav/Partners';
import ImageGallery from './ImageGallery';
import Head from 'next/head';

const MarkdownDocs = ({ filename }) => {
  const [metadata, setMetadata] = useState({});
  const [content, setContent] = useState('');
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);

  const createContentElements = (htmlContent) => {
    const contentParts = htmlContent.split(
      /(%%Docs:[^%]*%%|%%Links:[^%]*%%|%%Datagouv:[^%]*%%|%%JsonGallery:[^%]*%%|%%Products:[^%]*%%|%%Images:[^%]*%%)/,
    );
    return contentParts.map((part, index) => {
      const matchDocs = part.match(/%%Docs:([^%]*)%%/);
      if (matchDocs) {
        const docsList = matchDocs[1].split(',').map((doc) => doc.trim());
        return (
          <FilteredDocsDisplay
            key={`filtered-docs-display-${index}`}
            docsList={docsList}
          />
        );
      } else {
        const matchLinks = part.match(/%%Links:([^%]*)%%/);
        if (matchLinks) {
          const linksList = matchLinks[1].split(',').map((link) => link.trim());
          return (
            <FilteredLinksDisplay
              key={`filtered-links-display-${index}`}
              ids={linksList}
            />
          );
        } else {
          const matchDataGouv = part.match(/%%Datagouv:([^%]*)%%/);
          if (matchDataGouv) {
            const ids = matchDataGouv[1].split(',').map((id) => id.trim());
            return (
              <DatagouvDisplay key={`datagouv-display-${index}`} ids={ids} />
            );
          } else {
            const matchJsonGallery = part.match(/%%JsonGallery:([^%]*)%%/);
            if (matchJsonGallery) {
              const [filename, title] = matchJsonGallery[1]
                .split(',')
                .map((value) => value.trim());
              return (
                <JsonGalleryDisplay
                  key={`json-gallery-${index}`}
                  filename={filename}
                  title={title}
                  isExpanded={isGalleryExpanded}
                  setIsExpanded={setIsGalleryExpanded}
                />
              );
            } else {
              const matchImages = part.match(/%%Images:([^%]*)%%/);
              if (matchImages) {
                const galleryName = matchImages[1].trim();
                return (
                  <ImageGallery
                    key={`image-gallery-${index}`}
                    galleryName={galleryName}
                  />
                );
              } else {
                const matchProducts = part.match(/%%Products:([^%]*)%%/);
                if (matchProducts) {
                  const productIds = matchProducts[1]
                    .split(',')
                    .map((id) => id.trim());
                  return (
                    <ProductDisplay
                      key={`product-display-${index}`}
                      ids={productIds}
                    />
                  );
                } else {
                  return (
                    <div
                      key={`markdown-part-${index}`}
                      dangerouslySetInnerHTML={{ __html: part }}
                    />
                  );
                }
              }
            }
          }
        }
      }
    });
  };

  function slugify(text) {
    return text.toLowerCase().replace(/\W/g, '-');
  }

  marked.use({
    renderer: {
      heading(text, level) {
        const slug = slugify(text);
        return `
          <h${level} id="${slug}" onClick="location.href='#${slug}'">
            ${text}
            <span class="hash-link" style="visibility: hidden; pointer-events: none;">#</span>
          </h${level}>
        `;
      },
    },
  });

  const TitleWithBackground = ({ title, imageUrl }) => {
    const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        setSmallScreen(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <div
        style={{
          position: 'relative',
          justifyContent: 'center',
          display: 'flex',
          maxWidth: '1300px',
          padding: '0',
          margin: '0',
          width: '100%',
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '100%',
            display: 'block',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginTop: '10px',
          }}
        />
        <h1
          style={{
            position: 'absolute',
            top: '45%',
            left: smallScreen ? '10%' : '5%',
            right: smallScreen ? '10%' : '5%',
            transform: 'translateY(-50%)',
            textAlign: 'center',
            fontSize: smallScreen ? '1.6rem' : '3rem',
            color: 'rgba(23, 53, 65, 0.8)',
            zIndex: 1,
            padding: '1rem',
            lineHeight: '1em',
            background: 'rgb(255,255,255, 0.9)',
            borderRadius: '10px',
            fontWeight: '1000',
          }}
        >
          {title}
        </h1>
      </div>
    );
  };

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        // Update the API endpoint to the new 'metadoc' endpoint
        const res = await fetch(`/api/metadoc?filename=${filename}`);
        const data = await res.json();

        // Set metadata and content from the new API response
        setMetadata(data.metadata);
        setContent(marked(data.content));
      } catch (error) {
        console.error('Error fetching Markdown content', error);
      }
    };

    fetchMarkdownContent();
  }, [filename]);

  useEffect(() => {
    if (content) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substr(1); // remove '#'
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }
    }
  }, [content]);

  useEffect(() => {
    const fetchReferencesDetails = async () => {
      if (metadata.references_catalog) {
        // Split the references_catalog string into individual IDs
        const referenceIds = metadata.references_catalog.split(',');
        // Fetch details for each reference
        const referencesPromises = referenceIds.map((id) =>
          fetch(`/api/referenceDetails?id=${id.trim()}`).then((response) =>
            response.json(),
          ),
        );
        Promise.all(referencesPromises)
          .then((referencesDetails) => {
            // Process and display these details as needed
            console.log(referencesDetails); // This will log the details for each reference
            // Set state here if you're storing these details in state
          })
          .catch((error) =>
            console.error('Error fetching references details:', error),
          );
      }
    };

    fetchReferencesDetails();
  }, [metadata.references_catalog]);

  const renderReferences = () => {
    if (!metadata.references_catalog) return null;

    const referenceIds = metadata.references_catalog.split(',');
    const referenceTitles = metadata['reference-title']
      ? metadata['reference-title'].split(',')
      : [];

    return referenceIds.map((id, index) => {
      const title = referenceTitles[index]
        ? referenceTitles[index].trim()
        : 'Reference';
      return (
        <a
          key={id.trim()}
          href={`/references/${id.trim()}`}
          className={styles.referenceLink}
        >
          <div className={styles.referenceDocContainer}>{title}</div>
        </a>
      );
    });
  };

  return (
    <Layout>
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
      </Head>
      <div
        style={{
          backgroundColor: 'white',
          margin: '0 auto',
          maxWidth: '900px',
          padding: '0 10px',
          borderRadius: '20px',
        }}
      >
        <TitleWithBackground
          title={metadata?.title}
          imageUrl={metadata?.image}
        />
        <DocsMetadata metadata={metadata} />
        <br />
        <p
          style={{
            width: '100%',
            display: 'block',
            fontSize: '1.5rem',
            color: '#696969',
            textAlign: 'center',
          }}
        >
          {metadata?.description}
        </p>
        <br />
        {(metadata.partners && metadata.partners.length > 0) || metadata.references_catalog ? (
          <div className={styles.partnersReferencesContainer}>
            {metadata.partners && metadata.partners.length > 0 && (
              <div className={styles.partnersContainer}>
                <Partners partnersIds={metadata.partners} />
              </div>
            )}
            {metadata.references_catalog && (
              <div className={styles.referencesContainer}>
                <h2 className={styles.referenceTitle}>Référence(s)</h2>
                <div>{renderReferences()}</div>
              </div>
            )}
          </div>
        ) : null}
        <div className={styles.markdownContent}>
          {createContentElements(content)}
        </div>
      </div>
    </Layout>
  );
  
};

export default MarkdownDocs;
