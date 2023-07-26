import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Quizz.module.css'; 

const Quiz = () => {
  const [data, setData] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Fetch the quiz data
    axios.get('/files/dataposition-questions.json')
      .then(res => {
        // Group data by questions
        const groupedData = res.data.reduce((acc, curr) => {
          const questionIndex = acc.findIndex(item => item.Question === curr.Question);
          if (questionIndex !== -1) {
            acc[questionIndex].Answers.push({ answer: curr.Answer, profile: curr.Pofile, points: curr.Points });
          } else {
            acc.push({ Question: curr.Question, Answers: [{ answer: curr.Answer, profile: curr.Pofile, points: curr.Points }] });
          }
          return acc;
        }, []);
        setData(groupedData);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAnswer = (profile, points) => {
    // Add points to the selected profile
    setProfiles({
      ...profiles,
      [profile]: (profiles[profile] || 0) + points
    });
    // Go to the next question
    setCurrentQuestion(currentQuestion + 1);
  };

  const getTopProfile = () => {
    // If no profiles are found, return a default value
    if (Object.keys(profiles).length === 0) {
      return 'No profiles found';
    }
    // Find the profile with the most points
    return Object.keys(profiles).reduce((a, b) => profiles[a] > profiles[b] ? a : b);
  };

  const getProfileDescription = (profile) => {
    let description = '';
    let imagePath = '';
  
    if (profile === 'Ambassadeur') {
      description = "L’ambassadeur est celui qui maîtrise les discours de communication, qui sait se montrer clair et efficace dans une démonstration. En résumé, l’interlocuteur de choix pour porter le projet.";
      imagePath = "/images/apps/dataposition_ambassadeur.png";
    } else if (profile === 'Analyste') {
      description = "L’analyste : manier les données, ça le connait ! Il connait leurs forces et leurs faiblesses et les utilise pour produire du savoir.";
      imagePath = "/images/apps/dataposition_analyste.png";
    } else if (profile === 'Bâtisseur') {
      description = "Le bâtisseur est l’expert des solutions techniques, celui qui est le plus capable de produire des prototypes aboutis, le facilitateur du groupe dans les démarches de production.";
      imagePath = "/images/apps/dataposition_batisseur.png";
    } else if (profile === 'Créatif') {
      description = "Le créatif est l’astucieux de la bande, celui qui apporte un point de vue original et se montre particulièrement imaginatif dans la production des livrables.";
      imagePath = "/images/apps/dataposition_creatif.png";
    } else if (profile === 'Expert') {
      description = "L’expert maîtrise le sujet de la rénovation énergétique sur le bout des doigts. Il est le garant de la méthodologie, celui capable d’apporter une distanciation critique.";
      imagePath = "/images/apps/dataposition_expert.png";
    } else if (profile === 'Pilote') {
      description = "Le pilote est inspirant et moteur dans la collaboration, il insuffle enthousiasme et confiance au sein du groupe. Il sait faire ressortir le meilleur de ses collaborateurs.";
      imagePath = "/images/apps/dataposition_pilote.png";
    } else {
      description = "No profiles found";
      imagePath = '';
    }
  
    return { description, imagePath };
  };
  let profile = getTopProfile();
let profileData = getProfileDescription(profile);

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${percentage}%` }} />
    </div>
  );
};

  return (
    <Layout>
  <div>
    <h1>Quizz Data Position</h1>
    <p className={styles.baseLine}>Évaluez vos connaissances et compétences sur le cycle de la donnée</p>
  </div>
  <ProgressBar current={currentQuestion} total={data.length} />
  <div className={styles.container}>
    {currentQuestion < data.length ? (
      <div className={styles.content}>
        <div className={styles.questionBox}>
          <p>{data[currentQuestion].Question}</p>
        </div>
            {data[currentQuestion].Answers.map((answer, index) => (
        <div key={index} className={styles.answerBox}>
            <button className={styles.answerButton} onClick={() => handleAnswer(answer.profile, answer.points)}>
            {answer.answer}
            </button>
        </div>
        ))}
      </div>
    ) : (
      <div className={styles.content}>
        <div className={styles.resultBox}>
        <h2>Votre profil :</h2>
        <h3>{profile}</h3>
        <p>{profileData.description}</p>
        <br></br>
        <img src={profileData.imagePath} alt={profile} />
        </div>
      </div>
    )}
  </div>
</Layout>

  );
};

export default Quiz;
