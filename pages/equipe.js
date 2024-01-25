import React from 'react';
import TeamGallery from '../components/nav/TeamGallery';
import Layout from '../components/Layout'; // Si vous avez un composant Layout pour la mise en page générale
import styles from '../styles/TeamGallery.module.css'; // Assurez-vous de créer ce fichier CSS

const TeamPage = () => {
  return (
    <Layout> {/* Utilisez votre composant Layout si vous en avez un, sinon supprimez cette ligne */}
      <div className={styles.teamPageContainer}>
        <h1 className={styles.teamPageTitle}>Notre équipe</h1>
        <TeamGallery />
      </div>
    </Layout>
  );
};

export default TeamPage;
