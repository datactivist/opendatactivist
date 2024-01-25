import React, { useState, useEffect } from 'react';
import styles from '../../styles/TeamGallery.module.css';
import Link from 'next/link';

const TeamGallery = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    // Construisez l'URL de base
    let apiUrl = '/api/authors';
  
    // Si un tag est sélectionné, ajoutez-le comme paramètre de requête
    if (selectedTag) {
      apiUrl += `?tag=${encodeURIComponent(selectedTag)}`;
    }
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const filteredAndSortedData = data
          .filter(member => member.cercle && (Array.isArray(member.cercle) ? member.cercle.length > 0 : true))
          .sort((a, b) => a.name.localeCompare(b.name));
  
        setTeamMembers(filteredAndSortedData);
  
        if (!selectedTag) {
          // Si aucun tag n'est sélectionné, mettez à jour les tags uniques basés sur tous les membres
          const tags = new Set();
          filteredAndSortedData.forEach(member => member.tags?.forEach(tag => tags.add(tag)));
          setUniqueTags([...tags]);
        }
      });
  }, [selectedTag]); // Ajoutez selectedTag comme dépendance
  

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const renderTagButtons = () => (
    <div className={styles.tagButtons}>
      {uniqueTags.map(tag => (
        <button key={tag} className={selectedTag === tag ? styles.selectedTagButton : styles.tagButton} onClick={() => handleTagClick(tag)}>
          {tag}
        </button>
      ))}
    </div>
  );

  const renderMembers = () => {
    const filteredMembers = selectedTag ? teamMembers.filter(member => member.tags?.includes(selectedTag)) : teamMembers;
    return filteredMembers.map(member => (
      <Link key={member.id} href={`/authors/${member.id}`} legacyBehavior>
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
    ));
  };

  return (
    <div className={styles.teamPageContainer}>
    {renderTagButtons()}
        <div className={styles.gallery}>
          {renderMembers()}
        </div>
      </div>
  );
};

export default TeamGallery;
