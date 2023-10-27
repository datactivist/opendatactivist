import React, { useState, useEffect } from 'react';

const DatagouvDisplay = ({ ids }) => {
  const [datasetsInfo, setDatasetsInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(
            `https://www.data.gouv.fr/api/1/datasets/${id}`,
          );
          const json = await response.json();
          const { title, organization } = json;
          return { title, organization: organization.name };
        }),
      );
      setDatasetsInfo(data);
    };
    fetchData();
  }, [ids]);

  const uniq = ids.length === 1;

  return (
    <div>
      <div
        style={{
          backgroundColor: '#f8f8f8',
          padding: '0.5rem',
          borderRadius: '10px',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <div className={`${uniq ? '' : 'two-column-grid'} dataset-container`}>
          {datasetsInfo.map((item, index) => (
            <div key={index} className="dataset-item">
              <h3>
                <a
                  href={`https://www.data.gouv.fr/fr/datasets/${ids[index]}`}
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
          color: black;
          text-decoration: none;
        }
        article a {
          text-decoration: none;
          color: black;
          border: none;
        }
        .dataset-container {
          margin: 30px auto;
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        .dataset-item {
          padding: 20px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #fff;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
          width: 95%;
          margin-left: auto;
          margin-right: auto;
        }
        .dataset-item:hover {
          background-color: #fff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        }
        h3 {
          margin-bottom: 10px;
          font-size: 1.2rem;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
        }
        p {
          font-size: 16px;
          font-weight: 400;
          color: #696969;
          margin-top: 10px;
          margin-bottom: 0px;
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default DatagouvDisplay;
