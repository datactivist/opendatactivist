import React, { useState, useEffect } from 'react';
import styles from '../../styles/TeamGallery.module.css';
import Link from 'next/link';

const TeamGallery = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    let apiUrl = '/api/authors-list';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const processedData = data
          .filter(member => member.organisation === 'datactivist') // Keep only members of datactivist
          .map(member => ({
            ...member,
            tags: Object.entries(member)
              .filter(([key, value]) => key.startsWith('tags/') && value)
              .map(([, value]) => value),
            date_arrivee: member.date_arrivee ? new Date(member.date_arrivee).getFullYear().toString() : "",
          }))
          .filter(member => member.tags.length > 0) // Keep members with at least one tag
          .sort((a, b) => new Date(a.date_arrivee) - new Date(b.date_arrivee));

        setTeamMembers(processedData);

        const tags = new Set();
        processedData.forEach(member => {
          member.tags.forEach(tag => tags.add(tag));
        });
        setUniqueTags([...tags]);
      });
  }, []);

  const handleTagClick = tag => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const renderTagButtons = () => (
    <div className={styles.tagButtons}>
      {uniqueTags.map(tag => (
        <button
          key={tag}
          className={selectedTag === tag ? styles.selectedTagButton : styles.tagButton}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );

  const renderMembers = () => {
    const filteredMembers = selectedTag
      ? teamMembers.filter(member => member.tags.includes(selectedTag))
      : teamMembers;
    return filteredMembers.map(member => (
      <Link key={member.id} href={`/authors/${member.id}`} passHref>
        <div className={styles.card} aria-label={`Voir le profil de ${member.name}`}>
          <div className={styles.avatarContainer}>
            <img src={member.image} alt={member.name} className={styles.avatar} />
          </div>
          <div className={styles.info}>
            <h3>{member.name}</h3>
            <div className={styles.roleDateCity}>
              <span className={styles.role}>{member.role}</span>
              <span className={styles.dateArrivee}>⇠ {member.date_arrivee}</span>
              <span className={styles.city}>☉ {member.city}</span>
            </div>
            <div className={styles.tags}>
              {member.tags.map(tag => (
                <span key={`${member.id}-${tag}`} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className={styles.teamPageContainer}>
      {renderTagButtons()}
      <div className={styles.gallery}>{renderMembers()}</div>
    </div>
  );
};

export default TeamGallery;
