import React from 'react';
import styles from '../../styles/ProductPage.module.css';

const ProductPage = ({ nom, baseline, description, targets, liens, testimonials }) => {
  return (
    <div className={styles.productBox}>
      <h1>{nom}</h1>
      <p className={styles.baseline}>{baseline}</p>
      <br />
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
      <br />
      <div>
        {liens.map((lien, index) => (
          <a key={index} href={lien.url} target="_blank" rel="noopener noreferrer">
            <button className={styles.button}>{lien.texte}</button>
          </a>
        ))}
      </div>
      <h3>Publics cibles :</h3>
      <ul>
        {targets.map((target, index) => (
          <li key={index}>{target}</li>
        ))}
      </ul>
      <h3>Quelques témoignages :</h3>
      <div className={styles.testimonials}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonial}>
            <p>{testimonial.text}</p>
            <cite>- {testimonial.author}</cite>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
