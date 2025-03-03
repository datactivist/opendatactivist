import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/ReferencesPage.module.css';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const ReferencesPage = () => {
  const [researchProjects, setResearchProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Déplacez useRouter ici, à l'intérieur du composant

  useEffect(() => {
    fetch('/api/research-projects?action=list')
      .then((response) => response.json())
      .then((data) => {
        setResearchProjects(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch research projects:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    router.push('mailto:hello@datactivist.coop');
  };

  return (
    <Layout>
      <div className={styles.introSection}>
        <h1 className={styles.mainTitle}>
          La recherche au sein de Datactivist
        </h1>
        <div className={styles.textBlocksContainer}>
          <div className={styles.leftTextBlocks}>
            <div className={styles.textBlock}>
              <h1 className={styles.blocTitle}>
                {' '}
                Une entreprise née de la recherche
              </h1>
              La société coopérative (SCOP) Datactivist a été créée en 2016. Sa
              mission est de{' '}
              <b>
                donner à toutes et tous le pouvoir de comprendre, d’agir pour
                plus de démocratie, de justice et de résilience.
              </b>
              Datactivist est né des conclusions de la thèse de doctorat en
              sociologie de Samuel Goëta qui propose une enquête sociologique
              sur les coulisses de l’open data et identifie les freins à
              l’ouverture et à la réutilisation des données publiques.{' '}
              <h1 className={styles.blocTitle}>
                Des interactions permanentes entre missions et projets de
                recherche
              </h1>
              Ancrée dans notre activité, la R&D chez Datactivist croise nos
              questionnements issus du terrain, notre expertise et des approches
              disciplinaires variées. Elle nous apporte de la réflexivité par
              rapport au temps court des missions, nous permet d‘explorer en
              profondeur des sujets et de{' '}
              <b>
                tester de nouvelles méthodes pour créer l‘open data de demain.
              </b>{' '}
              Nos projets de R&D s\'appuient' sur des collaborations avec notre
              écosystème de partenaires, y compris académiques (Ecole des Mines
              de Paris (Centre de Sociologie de l’Innovation), Université
              d’Avignon, Sciences Po Aix…)
              <br></br>
              <button
                className={styles.researchButton}
                onClick={handleButtonClick}
              >
                👉 Menez un projet de recherche avec notre équipe
              </button>
            </div>
          </div>
          <div className={styles.rightTextBlock}>
            <h1 className={styles.blocTitleRight}>Notre équipe</h1>
            <p>
              Datactivist est composé de salarié·es aux parcours
              professionnels très variés mais partageant le souci de mettre la
              donnée au service du bien commun.
            </p>
            <p>
              Au sein de l’équipe,{' '}
              <b>
                quatre chercheurs mènent des projets de recherche et développement
                :
              </b>{' '}
              en <b>sociologie des sciences et techniques</b> (Dr. Samuel
              Goëta, Dr. Loup Cellard), <b>psychologie cognitive</b> (Margaux Larre-Perez), 
              <b>science politique</b> (Dr. Elise Ho-Pun-Cheung)
            </p>
            <p>
              Au-delà des projets de R&D, Datactivist se distingue par un lien
              fort avec la recherche.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.referenceGrid}>
      <h2 className={styles.referencePageTitle}>Nos projets de recherche</h2>
      <div className={styles.referencesContainer}>
        {researchProjects.map((project) => (
          <Link key={project.id} href={`/recherche/${project.id}`} passHref>
            <div className={styles.referenceCardLink}>
              <div className={styles.rechercheCard}>
                <h2 className={styles.referenceTitle}>{project.title}</h2>
                <img
                  src={`/images/research/${project.id}.png`}
                  alt={project.title}
                  className={styles.referenceImage}
                />
                <div className={styles.teamInfoContainer}>
                  {project['team-images'] &&
                    project['team-images'].map((image, index) => (
                      <div key={index} className={styles.teamMember}>
                        <img
                          src={image}
                          alt={project['team-names'][index]}
                          className={styles.teamMemberImage}
                        />
                        <p className={styles.teamMemberName}>
                          {project['team-names'][index]}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default ReferencesPage;
