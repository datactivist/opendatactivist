import React, { useState } from 'react';
import { useRouter } from 'next/router';
import storiesMetadata from '../../public/sitedata/stories-catalog.json';
import styles from '../../styles/stories-catalog.module.css';

const StoriesCatalog = ({ topicFilter = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = storiesMetadata.filter((story) => {
    const searchValue = searchTerm.toLowerCase();
    const topicMatch = topicFilter
      ? story.topics.some((topic) => topic.toLowerCase() === topicFilter.toLowerCase())
      : true;

    return (
      topicMatch &&
      (story.title.toLowerCase().includes(searchValue) ||
        story.description.toLowerCase().includes(searchValue) ||
        story.topics.some((topic) => topic.toLowerCase().includes(searchValue)))
    );
  });

  const currentDate = new Date();
  const publishedStories = filteredStories.filter((story) => new Date(story.public_date) <= currentDate);
  const upcomingStories = filteredStories.filter((story) => new Date(story.public_date) > currentDate);

  const handleCardClick = (storyId) => {
    router.push(`/stories/${storyId}`);
  };

  function formatDate(dateString) {
    const options = { month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }


  return (
    <div className={styles.container}>
      <h1>Catalogue des méthodes guidées</h1>
      <br></br>
      <br></br>
      <input
        className={styles.search}
        type="search"
        placeholder="Recherche"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className={styles.gallery}>
  {publishedStories.map((story) => (
    <div
      key={story.id}
      className={styles['story-card']}
      onClick={() => handleCardClick(story.id)}
    >
      <h2>{story.title}</h2>
      <p>{story.description}</p>
      <div>
        {story.topics.map((topic, index) => (
          <span key={index} className={styles.topic}>
            {topic}
          </span>
        ))}
      </div>
      <br></br>
      <p>🗓 {formatDate(story.public_date)}</p>
    </div>
  ))}
</div>
      <br></br>
      <h2>Prochainement publiées</h2>
      <div className={styles.roadmap}>
        {upcomingStories.map((story) => (
          <div key={story.id} className={styles['roadmap-item']}>
            <div className={styles['timeline-marker']}></div>
            <div className={styles['roadmap-content']}>
              <h3>{story.title}</h3>
              <p>{formatDate(story.public_date)}</p>
            </div>

          </div>
        ))}
      </div>


    </div>
  );
};

export default StoriesCatalog;
