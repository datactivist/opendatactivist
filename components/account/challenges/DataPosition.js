import { useEffect, useState } from 'react';
import { supabase } from "../../../utils/supabaseClient";
import Link from 'next/link';
import styles from '../../../styles/Task.module.css'

function DataPosition({ user, reportHasData }) {
    const [profileName, setProfileName] = useState("");
    const [description, setDescription] = useState("");
    const [imagePath, setImagePath] = useState("");
  
    useEffect(() => {
      async function fetchProfile() {
        if (user) {
          let { data, error } = await supabase
            .from('dataposition')
            .select('profile')
            .eq('email', user.email)
            .order('created_at', { ascending: false })
            .limit(1);
      
            if (error) {
                console.error("Error fetching profile:", error.message);
              } else if (data && data.length > 0) {
                setProfileName(data[0].profile);
                reportHasData(true); 
              
                switch(data[0].profile) {
            case 'Ambassadeur':
                setDescription("L’ambassadeur est celui qui maîtrise les discours de communication, qui sait se montrer clair et efficace dans une démonstration. En résumé, l’interlocuteur de choix pour porter le projet.");
                setImagePath("/images/apps/dataposition_ambassadeur.png");
                break;
            case 'Analyste':
                setDescription("L’analyste : manier les données, ça le connait ! Il connait leurs forces et leurs faiblesses et les utilise pour produire du savoir.");
                setImagePath("/images/apps/dataposition_analyste.png");
                break;
            case 'Bâtisseur':
                setDescription("Le bâtisseur est l’expert des solutions techniques, celui qui est le plus capable de produire des prototypes aboutis, le facilitateur du groupe dans les démarches de production.");
                setImagePath("/images/apps/dataposition_batisseur.png");
                break;
            case 'Créatif':
                setDescription("Le créatif est l’astucieux de la bande, celui qui apporte un point de vue original et se montre particulièrement imaginatif dans la production des livrables.");
                setImagePath("/images/apps/dataposition_creatif.png");
                break;
            case 'Expert':
                setDescription("L’expert maîtrise le sujet de la rénovation énergétique sur le bout des doigts. Il est le garant de la méthodologie, celui capable d’apporter une distanciation critique.");
                setImagePath("/images/apps/dataposition_expert.png");
                break;
            case 'Pilote':
                setDescription("Le pilote est inspirant et moteur dans la collaboration, il insuffle enthousiasme et confiance au sein du groupe. Il sait faire ressortir le meilleur de ses collaborateurs.");
                setImagePath("/images/apps/dataposition_pilote.png");
                break;
            default:
                setDescription("No profiles found");
                setImagePath('');
        }
    } else {
        reportHasData(false);
      }
        }
      }
  
      fetchProfile();
    }, [user]);  

    return (
        <>
            <h2>DataPosition</h2>
            {profileName ? (
            <>
                <p className={styles.profileName}>Profil: {profileName}</p>
                <p className={styles.profileDescription}>{description}</p>
                {imagePath && <img src={imagePath} alt={profileName} className={styles.profileImage} />}
            </>
            ) : (
            <div>
                <p>Déterminez votre profil et vos compétences data</p>
                <br></br>
                <Link href="/apps/quizz/dataposition" className={styles.taskButton}>
                Faire le test
                </Link>
            </div>
            )}
        </>
    );    
  }
  
export default DataPosition;
