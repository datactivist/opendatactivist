import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';
import Cards from '../../components/nav/Cards';
import Gallery from '../../components/nav/Gallery';
import Layout from '../../components/Layout';
import ReferenceCard from '../../components/nav/ReferenceCard'; // Import the ReferenceCard component

const PartnerPage = () => {
  const router = useRouter();
  const { partner } = router.query;

  const [partnerData, setPartnerData] = useState(null);
  const [partnerDocuments, setPartnerDocuments] = useState([]);
  const [partnerContributors, setPartnerContributors] = useState([]);
  const [partnerProducts, setPartnerProducts] = useState([]);
  const [partnerReferences, setPartnerReferences] = useState([]); // State to store references

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
      // Assurez-vous que l'URL est correcte et correspond à votre route d'API configurée pour le filtrage par id
      fetch(`/api/partners?id=${partner}`)
        .then((response) => response.json())
        .then((data) => {
          // Comme l'API renvoie maintenant un objet unique pour l'id spécifié, pas besoin de prendre le premier élément
          setPartnerData(data);
        })
        .catch((error) => {
          console.error('Error fetching partner data:', error);
          setPartnerData(null);
        });
    }
  }, [partner]);

  useEffect(() => {
    // Fetch documents related to the partner from the new API
    fetch('/api/docscatalog?action=metadatalist')
      .then((response) => response.json())
      .then((data) => {
        const docsByPartner = data.filter(
          (doc) => doc.partners && doc.partners.includes(partner),
        );
        setPartnerDocuments(docsByPartner);
      });
  }, [partner]);

  // Right after fetching and before setting the state
  useEffect(() => {
    if (partner) {
      fetch(`/api/references?action=getByPartner&partners=${partner}`)
        .then((response) => response.json())
        .then((data) => {
          // Check if data is an object and not an array
          if (!Array.isArray(data) && typeof data === 'object') {
            // Wrap the object into an array
            setPartnerReferences([data]);
          } else if (Array.isArray(data)) {
            // Directly set the data if it's already an array
            setPartnerReferences(data);
          } else {
            console.error('Unexpected data format received from API', data);
            setPartnerReferences([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching partner references:', error);
          setPartnerReferences([]); // Reset to empty array in case of error
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
                <br></br>
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
          <div className={styles.authorSectionTitle}>Publications</div>
          <div className={styles.docsGalleryContainer}>
            <Gallery>
              <Cards
                items={partnerDocuments}
                onClick={(linkId) => router.push(`/docs/${linkId}`)}
                tagRoute="docs"
                showDate={false}
                showPartners={false}
              />
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
            </Gallery>
            {/* La vérification conditionnelle s'assure que ni le titre "Références" ni les références elles-mêmes ne sont rendus si le tableau est vide */}
            {
              partnerReferences.length > 0 &&
              partnerReferences.every(
                (ref) => ref.id && ref.title && ref['partner-name'],
              ) ? (
                <div>
                  <div className={styles.authorSectionTitle}>Références</div>
                  {partnerReferences.map((reference) => (
                    <ReferenceCard
  key={reference.id}
  id={reference.id}
  title={reference.title}
  partnerNames={reference['partner-name']} // Assurez-vous que c'est un tableau
  partnerImages={reference['partner-image']} // Assurez-vous que c'est un tableau
/>
                  ))}
                </div>
              ) : null // Ne rien afficher si le tableau est vide ou si les données sont incomplètes
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerPage;
