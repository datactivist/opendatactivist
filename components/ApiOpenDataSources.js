import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

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
      <h2>Données ouvertes utilisées</h2>
      <p>
        Cette méthode se base sur{' '}
        {uniq
          ? 'un jeu de données ouvert, accessible'
          : 'plusieurs jeux de données ouverts, accessibles'}{' '}
        via{' '}
        <a href="https://data.gouv.fr" target="_blank" rel="noopener noreferrer">data.gouv.fr</a>
        &nbsp;:
      </p>
      <div className={`${uniq ? '' : 'two-column-grid'} dataset-container`}>
      {datasetsInfo.map((item, index) => (
        <div key={index} className="dataset-item">
          <h3>
            {datasetsList[index] && (
              <a
                href={`https://www.data.gouv.fr/fr/datasets/${datasetsList[index].uid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            )}
          </h3>
          <p>{item.organization}</p>
        </div>
      ))}
    </div>
      <style jsx>{`
        #api-open-data-sources {
          margin-bottom: 60px;
        }
        h2 {
          margin-top: 50px;
          margin-bottom: 30px;
          font-size: 2rem;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
        }
        p {
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 400;
          font-family: 'Montserrat', sans-serif;
        }
        a {
          color: black ;
          text-decoration: none;
        }
        .dataset-container {
          margin: 30px auto;
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        .dataset-item {
          padding: 20px;
          background-color: #f8f8f8;
          border-radius: 10px;
        }
        .dataset-item:hover {
          background-color: #e8e8e8;
        }
        h3 {
          margin-bottom: 10px;
          font-size: 1.2rem;
          font-weight: 00;
          font-family: 'Montserrat', sans-serif;
        }
        p {
          font-size: 16px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};

export default ApiOpenDataSources;
