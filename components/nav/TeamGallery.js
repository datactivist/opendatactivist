import React, { useState, useEffect } from 'react';
import styles from '../../styles/TeamGallery.module.css';
import Link from 'next/link';


const TeamGallery = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('/api/authors')
      .then(response => response.json())
      .then(data => {
        const filteredAndSortedData = data
          .filter(member => member.cercle && (Array.isArray(member.cercle) ? member.cercle.length > 0 : true))
          .sort((a, b) => a.name.localeCompare(b.name));
        setTeamMembers(filteredAndSortedData);
      });
  }, []);

  const cercleOrder = [
    "Développement et partenaires",
    "Ressources humaines et finances",
    "Communication et marketing",
    "Recherche appliquée et produits",
    "Opérations",
    "IT"
  ];
  

  const groupMembersByCercle = () => {
    const groups = {};
    teamMembers.forEach(member => {
      (Array.isArray(member.cercle) ? member.cercle : [member.cercle]).forEach(cercle => {
        if (!groups[cercle]) {
          groups[cercle] = [];
        }
        groups[cercle].push(member);
      });
    });
    return groups;
  };

  const renderGroupedMembers = () => {
    const groups = groupMembersByCercle();
  
    // Tri des cercles en fonction de l'ordre défini
    const sortedGroups = Object.entries(groups).sort((a, b) => {
      const orderA = cercleOrder.indexOf(a[0]);
      const orderB = cercleOrder.indexOf(b[0]);
      return orderA - orderB;
    });
  
    // Rendu des groupes triés
    return sortedGroups.map(([cercle, members]) => {
      const cercleClassName = cercle.replace(/\s+/g, '-').toLowerCase();
      return (
        <div key={cercle} className={`${styles.cercleGroup} ${styles[cercleClassName]}`}>
          <h2 className={styles.cercleTitle}>{cercle}</h2>
          <div className={styles.membersFlex}>
            {members.map(member => (
              <Link key={`${member.id}-${cercle}`} href={`/authors/${member.id}`} legacyBehavior>
                <a className={styles.card} aria-label={`Voir le profil de ${member.name}`}>
                  <div className={styles.avatarContainer}>
                    <img src={member.image} alt={member.name} className={styles.avatar} />
                  </div>
                  <div className={styles.info}>
                    <h3>{member.name}</h3>
                    <div className={styles.tags}>
                      {member.tags && member.tags.map(tag => (
                        <span key={`${member.id}-${tag}`} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      );
    });
  };
    

  return (
    <div className={styles.teamPageContainer}>
      <div className={styles.gallery}>
        {renderGroupedMembers()}
      </div>
    </div>
  );
};

export default TeamGallery;
