import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';
import Cards from '../../components/nav/Cards';
import Gallery from '../../components/nav/Gallery';
import Layout from '../../components/Layout';
import ReferenceCard from '../../components/nav/ReferenceCard';
import ResearchCard from '../../components/nav/ResearchCard';

const PartnerPage = () => {
  const router = useRouter();
  const { partner } = router.query;

  const [partnerData, setPartnerData] = useState(null);
  const [partnerDocuments, setPartnerDocuments] = useState([]);
  const [partnerContributors, setPartnerContributors] = useState([]);
  const [partnerProducts, setPartnerProducts] = useState([]);
  const [partnerReferences, setPartnerReferences] = useState([]);
  const [partnerResearchProjects, setPartnerResearchProjects] = useState([]);

  useEffect(() => {
    if (partner) {
      fetch(`/sitedata/products-catalog.json`)
        .then((response) => response.json())
        .then((data) => {
          const productsByPartner = data.filter(
            (product) => product.partners && product.partners.includes(partner),
          );
          setPartnerProducts(productsByPartner);
        });
    }
  }, [partner]);

  useEffect(() => {
    fetch('/sitedata/authors.json')
      .then((response) => response.json())
      .then((data) => {
        const contributorsOfPartner = Object.entries(data)
          .filter(([author]) => author.organisation === partner)
          .map(([id, author]) => ({ ...author, id }));
        setPartnerContributors(contributorsOfPartner);
      });
  }, [partner]);

  useEffect(() => {
    if (partner) {
      fetch(`/api/partners?id=${partner}`)
        .then((response) => response.json())
        .then((data) => {
          setPartnerData(data);
        })
        .catch((error) => {
          console.error('Error fetching partner data:', error);
          setPartnerData(null);
        });
    }
  }, [partner]);

  useEffect(() => {
    fetch('/api/docscatalog?action=metadatalist')
      .then((response) => response.json())
      .then((data) => {
        const docsByPartner = data.filter(
          (doc) => doc.partners && doc.partners.includes(partner),
        );
        setPartnerDocuments(docsByPartner);
      });
  }, [partner]);

  useEffect(() => {
    if (partner) {
      fetch(`/api/references?action=getByPartner&partners=${partner}`)
        .then((response) => response.json())
        .then((data) => {
          if (!Array.isArray(data) && typeof data === 'object') {
            setPartnerReferences([data]);
          } else if (Array.isArray(data)) {
            setPartnerReferences(data);
          } else {
            console.error('Unexpected data format received from API', data);
            setPartnerReferences([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching partner references:', error);
          setPartnerReferences([]);
        });
    }
  }, [partner]);

  useEffect(() => {
    if (partner) {
      fetch(`/api/research-projects?action=getByPartner&partners=${partner}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPartnerResearchProjects(data); // Correction ici pour utiliser la bonne variable d'état
          } else {
            console.error('Unexpected data format received from API', data);
            setPartnerResearchProjects([]); // Assurez-vous que cette variable d'état est toujours un tableau
          }
        })
        .catch((error) => {
          console.error('Error fetching partner research projects:', error);
          setPartnerResearchProjects([]);
        });
    }
  }, [partner]);

  const handleCardClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  if (partnerData === null) {
    return (
      <div>
        Cette organisation n‘est pas encore partenaire ou cliente 🥲 Mais
        n‘hésitez pas à lui parler de nous !{' '}
      </div>
    );
  }

  if (!partnerData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className={styles.partnerpageTitle}>...Nos partenaires</h1>
      <div className={styles.productBox}>
        <div className={styles.authorContainer}>
          <div className={styles.authorHeader}>
            <img
              src={partnerData.image}
              alt={partnerData.name}
              className={styles.partnerImageLarge}
            />
            <div className={styles.authorInfo}>
              <h1>{partnerData.name}</h1>
              <div className={styles.authorBio}>
                <p className={styles.authorBioText} />
                <p>{partnerData.description}</p>
              </div>
              <div className={styles.contributorsContainer}>
                <br />
                {partnerContributors.length > 0 && (
                  <div className={styles.authorContributors}>
                    <h2>Contributeurs</h2>
                    {partnerContributors.map((author) => (
                      <div
                        key={author.id}
                        className={styles.contributor}
                        onClick={() => router.push(`/authors/${author.id}`)}
                      >
                        <img
                          src={author.image}
                          alt={author.name}
                          className={styles.contributorImage}
                        />
                        <p>{author.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <br />
          {(partnerDocuments.length > 0 || partnerProducts.length > 0) && (
            <>
              <div className={styles.authorSectionTitle}>Publications</div>
              <div className={styles.docsGalleryContainer}>
                <Gallery>
                  {partnerDocuments.length > 0 && (
                    <Cards
                      items={partnerDocuments}
                      onClick={(linkId) => router.push(`/docs/${linkId}`)}
                      tagRoute="docs"
                      showDate={false}
                      showPartners={false}
                    />
                  )}
                  {partnerProducts.length > 0 && (
                    <Cards
                      items={partnerProducts.map((product) => ({
                        ...product,
                        productId: product.name,
                      }))}
                      onClick={handleCardClick}
                      tagRoute="products"
                      showDate={false}
                      showPartners={false}
                    />
                  )}
                </Gallery>
              </div>
            </>
          )}
          {partnerResearchProjects.length > 0 && (
            <div>
              <div className={styles.authorSectionTitle}>
                Projets de recherche
              </div>
              <Gallery>
                {partnerResearchProjects.map((project) => (
                  <ResearchCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                  />
                ))}
              </Gallery>
            </div>
          )}
          {partnerReferences.length > 0 &&
            partnerReferences.every(
              (ref) => ref.id && ref.title && ref['partner-name'],
            ) && (
              <div>
                <div className={styles.authorSectionTitle}>Références</div>
                {partnerReferences.map((reference) => (
                  <ReferenceCard
                    key={reference.id}
                    id={reference.id}
                    title={reference.title}
                    partnerNames={reference['partner-name']}
                    partnerImages={reference['partner-image']}
                  />
                ))}
              </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default PartnerPage;
