import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Roadmap.module.css';
import RoadmapComponent from '../components/docs/Roadmap';
import LastContent from '../components/docs/LastContent';
import Image from 'next/image';

const RoadmapPage = () => {
  return (
    <Layout>
      <h2 className={styles.sectiontitle}> Nos prochains contenus ouverts</h2>
      <a
        href="https://www.linkedin.com/company/datactivist/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.linkedinBox}>
          <div className={styles.linkedinLogo}>
            <Image
              src="/images/footer/linkedin.png"
              alt="LinkedIn"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.linkedinText}>
            <p>
              Suiviez-nous sur LinkedIn pour ne pas manquer nos prochaines
              publications !
            </p>
          </div>
        </div>
      </a>

      <RoadmapComponent />
      <h2 className={styles.sectiontitle}> Derniers contenus publiés</h2>
      <LastContent />
    </Layout>
  );
};

export default RoadmapPage;
