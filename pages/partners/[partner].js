import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';
import Cards from '../../components/nav/Cards';
import Gallery from '../../components/nav/Gallery';
import Layout from '../../components/Layout';

const PartnerPage = () => {
  const router = useRouter();
  const { partner } = router.query;

  const [partnerData, setPartnerData] = useState(null);
  const [partnerDocs, setPartnerDocs] = useState([]);
  const [partnerContributors, setPartnerContributors] = useState([]);
  const [partnerProducts, setPartnerProducts] = useState([]);

  useEffect(() => {
    if (partner) {
      fetch(`/sitedata/products-catalog.json`)
        .then(response => response.json())
        .then(data => {
          const productsByPartner = data.filter(product =>
            product.partners && product.partners.includes(partner)
          );
          setPartnerProducts(productsByPartner);
        });
    }
  }, [partner]);

  useEffect(() => {
    fetch('/sitedata/authors.json')
      .then(response => response.json())
      .then(data => {
        const contributorsOfPartner = Object.entries(data)
          // eslint-disable-next-line no-unused-vars
          .filter(([id, author]) => author.organisation === partner)
          .map(([id, author]) => ({ ...author, id }));
        setPartnerContributors(contributorsOfPartner);
      });
  }, [partner]);

  useEffect(() => {
    fetch(`/sitedata/partners.json`)
      .then(response => response.json())
      .then(data => {
        if (Object.prototype.hasOwnProperty.call(data, partner)) {
          const partnerInfo = data[partner];
          setPartnerData(partnerInfo);
        } else {
          setPartnerData(null);
        }
      });
  }, [partner]);

  useEffect(() => {
    if (partnerData) {
      fetch(`/api/docs?action=list`)
        .then(response => response.json())
        .then(data => {
          const docsByPartner = data.filter(doc =>
            doc.metadata && doc.metadata.partners && doc.metadata.partners.includes(partner)
          );
          setPartnerDocs(docsByPartner);
        });
    }
  }, [partner, partnerData]);

  if (partnerData === null) {
    return <div>Cette organisation n‘est pas encore partenaire ou cliente 🥲 Mais n‘hésitez pas à lui parler de nous ! </div>;
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
            <img src={partnerData.image} alt={partnerData.name} className={styles.partnerImageLarge} />
            <div className={styles.authorInfo}>
              <h1>{partnerData.name}</h1>
              <div className={styles.authorBio}>
                <p className={styles.authorBioText}/>
                <p>{partnerData.description}</p>
              </div>
              <div className={styles.contributorsContainer}>
                <br></br>
                {partnerContributors.length > 0 && (
                  <div className={styles.authorContributors}>
                    <h2>Contributeurs</h2>
                    {partnerContributors.map((author) => (
                      <div key={author.id} className={styles.contributor} onClick={() => router.push(`/authors/${author.id}`)}>
                        <img src={author.image} alt={author.name} className={styles.contributorImage} />
                        <p>{author.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <br />
          <div className={styles.galleryContainer}>
            <Gallery>
              <Cards items={partnerDocs} onClick={(linkId) => router.push(`/docs/${linkId}`)} tagRoute="docs" showDate={false} showPartners={false} />
              <Cards items={partnerProducts} onClick={(productId) => router.push(`/products/${productId}`)} tagRoute="products" showDate={false} showPartners={false} />
            </Gallery>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerPage;
