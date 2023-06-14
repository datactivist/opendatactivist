import React from 'react';
import styles from '../../styles/ProductPage.module.css';
import FilteredDocsDisplay from "../docs/FilteredDocsDisplay";
import Partners from '../nav/Partners';

const ProductPage = ({ nom, baseline, description, targets, liens, testimonials, docsList, imageUrl, partnersIds }) => { 
  return (
    <div className={styles.productBox}>
      <h1>{nom}</h1>
      <p className={styles.baseline}>{baseline}</p>
      <br />
      <img src={imageUrl} alt={nom} className={styles.productImage} />
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
      {partnersIds && partnersIds.length > 0 && (
        <>
          <h3>Nos partenaires :</h3>
          <Partners partnersIds={partnersIds} />
        </>
      )}
      {docsList && docsList.length > 0 && (
        <>
          <h3>Contenus liés :</h3>
          <FilteredDocsDisplay docsList={docsList} />
        </>
      )}
    </div>
  );
};

export default ProductPage;
