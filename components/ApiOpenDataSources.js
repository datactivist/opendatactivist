import React from 'react';

const ApiOpenDataSources = ({ datasetsList }) => {
  const uniq = datasetsList.length === 1;

  return (
    <div id="api-open-data-sources">
      <h2>Source de données ouvertes</h2>
      <p>
        Cette API se base sur{' '}
        {uniq
          ? 'un jeu de données ouvert, accessible'
          : 'plusieurs jeux de données ouverts, accessibles'}{' '}
        via{' '}
        <a href="https://data.gouv.fr" target="_blank" rel="noopener noreferrer">data.gouv.fr</a>
        &nbsp;:
      </p>
      <div className={`${uniq ? '' : 'two-column-grid'} dataset-container`}>
        {datasetsList.map(item => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.organization}</p>
            <a href={`https://data.gouv.fr/fr/datasets/${item.uuid}`} target="_blank" rel="noopener noreferrer">
              Voir le dataset
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        div > span {
          margin-right: 20px;
        }
        div.dataset-container {
          margin: 30px auto;
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      `}</style>
    </div>
  );
};

export default ApiOpenDataSources;
