import React from 'react';
import styles from '../../styles/Roadmap.module.css';
import roadmap from '../../public/sitedata/roadmap.json';
import authors from '../../public/sitedata/authors.json';

const Roadmap = () => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    const date = new Intl.DateTimeFormat('fr-FR', options).format(
      new Date(dateString),
    );
    return date.charAt(0).toUpperCase() + date.slice(1);
  };

  const groupByMonth = (items) => {
    return items.reduce((acc, item) => {
      const formattedDate = formatDate(item.date);
      acc[formattedDate] = [...(acc[formattedDate] || []), item];
      return acc;
    }, {});
  };

  const groupedByMonth = groupByMonth(roadmap);

  return (
    <div className={styles.roadmapContainer}>
      {Object.keys(groupedByMonth).map((month, index) => (
        <div key={index}>
          <h2 className={styles.monthTitle}>{month}</h2>
          <table>
            <tbody>
              {groupedByMonth[month].map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={authors[item.authors[0]].image}
                      alt={authors[item.authors[0]].name}
                      className={styles.authorImage}
                    />
                  </td>
                  <td className={styles.authorName}>
                    {' '}
                    {authors[item.authors[0]].name}{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
