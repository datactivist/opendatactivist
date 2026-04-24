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
import ImageGallery from './ImageGallery';
import Head from 'next/head';

const MarkdownDocs = ({ filename }) => {
  const [metadata, setMetadata] = useState({});
  const [content, setContent] = useState('');
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [quotes, setQuotes] = useState([]); // Étape 1: État pour les citations
  const [loadError, setLoadError] = useState('');
  const [loadWarning, setLoadWarning] = useState('');

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

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const responseFilename = encodeURIComponent(filename);
        const res = await fetch(`/api/metadoc?filename=${responseFilename}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || data?.message || `Failed to fetch document metadata: ${res.status}`);
        }
  
        setMetadata(data.metadata);
        setContent(marked(data.content));
        setLoadError('');
        setLoadWarning(data.warning || '');
  
        if (data.metadata.quotes) {
          const quoteIds = `${data.metadata.quotes}`.split(',').map(id => id.trim());
          const quotesData = await Promise.all(quoteIds.map(async (id) => {
            const quoteRes = await fetch(`/api/quotes?ID=${id}`);
            return quoteRes.ok ? quoteRes.json() : null;
          }));
          setQuotes(quotesData.filter(q => q)); // Filtrer les éventuelles réponses null
        }
      } catch (error) {
        console.error('Error fetching Markdown content and quotes', error);
        setLoadError(error.message || 'Erreur lors du chargement du document');
        setLoadWarning('');
      }
    };
  
    fetchMarkdownContent();
  }, [filename]);
  

  const formatDate = (dateISO) => {
    const date = new Date(dateISO);
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };
  
  const renderQuotes = () => {
    if (quotes.length > 0) {
      return (
        <div className={styles.quotesSection}>
          <h3 className={styles.quotesSectionTitle}>📸 Revue de presse</h3>
          <div className={styles.quotesGrid}>
            {quotes.map((quote, index) => (
              <a key={index} href={quote.Link} className={styles.quoteCard}>
                <img src={quote.journal_image} alt={quote.Journal} className={styles.quoteImage} />
                <div className={styles.quoteContent}>
                  <h2 className={styles.quoteTitle}>{quote.Title}</h2>
                  <p className={styles.quoteDate}>⏱️ {formatDate(quote['Date published'])}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
    

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
    if (content) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substr(1); // remove '#'
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }
    }
  }, [content]);

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

  const renderResearchProjects = () => {
    if (!metadata.research_projects || !metadata.research_projects_titles) return null;
  
    const projectIds = metadata.research_projects.split(',');
    const projectTitles = metadata.research_projects_titles.split(',');
  
    return projectIds.map((id, index) => {
      const title = projectTitles[index] ? projectTitles[index].trim() : 'Voir le projet de recherche';
      return (
        <a
          key={id.trim()}
          href={`/recherche/${id.trim()}`}
          className={styles.referenceLink}
        >
          <div className={styles.referenceDocContainer}>{title}</div>
        </a>
      );
    });
  };
  
  return (
    <Layout>
      <div className={styles.docContainer}>
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
        {loadError && (
          <div
            style={{
              margin: '1rem auto',
              padding: '0.85rem 1rem',
              maxWidth: '820px',
              borderRadius: '10px',
              background: '#fff3cd',
              color: '#664d03',
              border: '1px solid #ffe69c',
              fontSize: '0.95rem',
            }}
          >
            {loadError}
          </div>
        )}
        {!loadError && loadWarning && (
          <div
            style={{
              margin: '1rem auto',
              padding: '0.85rem 1rem',
              maxWidth: '820px',
              borderRadius: '10px',
              background: '#e7f1ff',
              color: '#0b3d91',
              border: '1px solid #b6d4fe',
              fontSize: '0.95rem',
            }}
          >
            {loadWarning}
          </div>
        )}
        <br />
        <div className={styles.partnersReferencesContainer}>
          {metadata.references_catalog && (
            <div className={styles.referencesContainer}>
              <h2 className={styles.referenceTitle}>Référence(s)</h2>
              <div>{renderReferences()}</div>
            </div>
          )}
          {metadata.research_projects && (
            <div className={styles.referencesContainer}>
              <img
                src="/icons/research.png"
                alt="Research Sticker"
                className={styles.sticker}
              />
              <h2 className={styles.referenceTitle}>Projets de recherche</h2>
              <div>{renderResearchProjects()}</div>
            </div>
          )}
        </div>
        <div className={styles.markdownContent}>
          {createContentElements(content)}
        </div>
        <div className={styles.quotesContainer}>
            {renderQuotes()}
          </div>

      </div>
      </div>
    </Layout>
  );
};

export default MarkdownDocs;
