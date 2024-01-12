import { useState } from 'react';
import styles from '../../styles/apps/PeriodicTable.module.css';
import Popup from './PeriodicTablePopup';
import periodicElements from '../../public/files/periodic-elements.json'; // Assurez-vous que le chemin est correct


const columns = [
    {
        title: "Définition de la demande",
        color: "#ede9f6",
        contentColor: "#57398d",
        elements: [
            ["Recherche utilisateur"],
            ["Causes et contexte"],
            ["Affinage"],
            ["Avantages et objectifs"],
            ["Audit et inventaire des données"]
        ]
    },
    {
        title: "Capacité et culture",
        color: "#d9f5ff",
        contentColor: "#008bbf",
        elements: [
            ["Infrastructure de données", "Infrastructure publique"],
            ["Infrastructure publique"],
            ["Littératie technologique et Internet"],
            ["Obstacles culturels/institutionnels"],
            ["Compétences et expertise"],
            ["Boucles de rétroaction"],
            ["Disponibilité des ressources et durabilité"]
        ]
    },
    {
        title: "Gouvernance",
        color: "#e7eac5",
        contentColor: "#99a03e",
        elements: [
            ["Indicateurs de performance"],
            ["Atténuation des risques"],
            ["Ouverture par défaut (et autres principes)"],
            ["Liberté d'information et autres politiques"],
            ["Qualité des données"],
            ["Réactivité"]
        ]
    },
    {
        title: "Partenariats",
        color: "#beeae8",
        contentColor: "#00aaa2",
        elements: [
            ["Détenteurs de données"],
            ["Intermédiaires"],
            ["Experts du domaine"],
            ["Collaborateurs"]
        ]
    },
    {
        title: "Risques",
        color: "#f5d4da",
        contentColor: "#ba0c2d",
        elements: [
            ["Préoccupations liées à la vie privée"],
            ["Sécurité des données"],
            ["Prise de décision médiocre en raison d'informations erronées"],
            ["Renforcement des asymétries de pouvoir"],
            ["Open Washing"]
        ]
    }
];

const ELEMENT_INITIALS = {
    "Recherche utilisateur": "Ru",
    "Causes et contexte": "Ca",
    "Affinage": "Af",
    "Avantages et objectifs": "Ao",
    "Audit et inventaire des données": "Ai",
    "Infrastructure de données": "Id",
    "Infrastructure publique": "Ip",
    "Open Washing": "Ow",
    "Renforcement des asymétries de pouvoir": "Ap",
    "Prise de décision médiocre en raison d'informations erronées": "Dm",
    "Sécurité des données": "Sd",
    "Détenteurs de données": "Dd",
    "Littératie technologique et Internet": "Lt",
    "Obstacles culturels/institutionnels": "Oi",
};

const Element = ({ element, contentColor, onClick }) => {
        const initials = ELEMENT_INITIALS[element] || element.charAt(0);
    
        return (
            <div className={styles.element} onClick={() => onClick(element)}>
                <div className={styles.initials} style={{ color: contentColor }}>
                    {initials}
                </div>
                <div className={styles.elementContent} style={{ color: contentColor }}>
                    {element}
                </div>
            </div>
        );
};
    

const CategoryContainer = ({ title, color, elements, doubleColumn, contentColor, onElementClick }) => {
    // Supposons que doubleColumn soit vrai pour la 3ème colonne
    // Trouvez le nombre d'éléments manquants pour un nombre pair dans la colonne
    const missingElements = doubleColumn && elements.length % 2 !== 0 ? 1 : 0;
    
    return (
        <div className={styles.categoryContainer} style={{ backgroundColor: color }}>
            <h2 className={styles.categoryTitle} style={{ color: contentColor }}>{title}</h2>
            <div className={`${styles.elementsGallery} ${doubleColumn ? styles.doubleColumn : ''}`}>
                {/* Ajoutez des éléments fictifs si nécessaire */}
                {Array.from({ length: missingElements }, (_, index) => (
                    <div key={`placeholder-${index}`} className={styles.elementPlaceholder}></div>
                ))}
                {elements.map((element, index) => (
                    <Element key={index} element={element[0]} contentColor={contentColor} onClick={onElementClick} />
                ))}
            </div>
        </div>
    );
};


const PeriodicTable = () => {
        const [popupContent, setPopupContent] = useState(null);
    
        const handleElementClick = (element) => {
                // Utilisez les données de periodicElements ici
                if(periodicElements[element]) {
                        setPopupContent(periodicElements[element]);
                } else {
                        // Gérez le cas où les données de l'élément ne sont pas trouvées
                        console.error("Données non trouvées pour l'élément :", element);
                }
        };
    
        const closePopup = () => setPopupContent(null);
    
        return (
            <div className={styles.periodicTable}>
                {columns.map((column, index) => (
                    <CategoryContainer
                        key={index}
                        title={column.title}
                        color={column.color}
                        elements={column.elements}
                        doubleColumn={index === 1 || index === 2}
                        contentColor={column.contentColor}
                        onElementClick={handleElementClick}
                    />
                ))}
                {popupContent && <Popup {...popupContent} onClose={closePopup} />}
            </div>
        );
};

    

export default PeriodicTable;
