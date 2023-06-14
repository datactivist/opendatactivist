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
    <h1 className={styles.h1Gray}>...Nos partenaires</h1>
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
          </div>
        </div>
        <br />
        <Gallery>
          <Cards items={partnerDocs} onClick={(linkId) => router.push(`/docs/${linkId}`)} tagRoute="docs" showDate={false} showPartners={false} />
        </Gallery>
      </div>
      </div>
    </Layout>
  );
};

export default PartnerPage;
