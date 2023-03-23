import React, { useState, useEffect } from 'react';

const ApiOpenDataSources = ({ datasetsList }) => {
  const [datasetsInfo, setDatasetsInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        datasetsList.map(async (dataset) => {
          const response = await fetch(
            `https://www.data.gouv.fr/api/1/datasets/${dataset.uid}`
          );
          const json = await response.json();
          const { title, organization } = json;
          return { title, organization: organization.name };
        })
      );
      setDatasetsInfo(data);
    };
    fetchData();
  }, [datasetsList]);

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
        {datasetsInfo.map((item, index) => (
          <div key={index}>
            <h3>
              <a
                href={`https://www.data.gouv.fr/fr/datasets/${datasetsList[index].uid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            </h3>
            <p>{item.organization}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        div > span {
          margin-right: 20px;
        }
        .dataset-container {
          margin: 30px auto;
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        .dataset-container div {
          padding: 20px;
          background-color: #f8f8f8;
          border-radius: 10px;
        }
        .dataset-item:hover {
          background-color: #e8e8e8;
        }
      `}</style>
    </div>
  );
};

export default ApiOpenDataSources;
