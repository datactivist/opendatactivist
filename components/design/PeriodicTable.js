import { useState } from 'react';
import styles from '../../styles/apps/PeriodicTable.module.css';
import Popup from './PeriodicTablePopup';
import periodicElements from '../../public/files/periodic-elements.json'; // Ensure the path is correct


const columns = [
  {
    title: "Problem and Demand Definition",
    color: "#ede9f6",
    contentColor: "#57398d",
    elements: [
      ["User Research"],
      ["Causes and Context"],
      ["Refinement"],
      ["Benefit and Goals"],
      ["Data Audit and Inventory"]
    ]
  },
  {
    title: "Capacity and Culture",
    color: "#d9f5ff",
    contentColor: "#008bbf",
    elements: [
      ["Data Infrastructure", "Public Infrastructure"],
      ["Public Infrastructure"],
      ["Tech Literacy & Internet Penetration"],
      ["Cultural/Institutional Roadblocks"],
      ["Skills & Expertise"],
      ["Feedback Loops"],
      ["Resource Availability and Sustainability"]
    ]
  },
  {
    title: "Governance",
    color: "#e7eac5",
    contentColor: "#99a03e",
    elements: [
      ["Performance Metrics"],
      ["Risk Mitigation"],
      ["Open by Default (and other principles)"],
      ["Freedom of Information and other Policies"],
      ["Data Quality"],
      ["Responsiveness"]
    ]
  },
  {
    title: "Partnerships",
    color: "#beeae8",
    contentColor: "#00aaa2",
    elements: [
      ["Data Holders"],
      ["Intermediaries"],
      ["Domain Experts"],
      ["Collaborators"]
    ]
  },
  {
    title: "Risks",
    color: "#f5d4da",
    contentColor: "#ba0c2d",
    elements: [
      ["Privacy Concerns"],
      ["Data Security"],
      ["Poor decision-making due to faulty information"],
      ["Entrenching power asymmetries"],
      ["Open washing"]
    ]
  }
];

const ELEMENT_INITIALS = {
  "User Research": "U",
  "Causes and Context": "C",
  "Refinement": "Rf",
  "Benefit and Goals": "Bg",
  "Data Audit and Inventory": "Da",
  "Data Infrastructure": "Di",
  "Public Infrastructure": "Pu",
  "Open washing": "Ow",
  "Entrenching power asymmetries": "Pa",
  "Poor decision-making due to faulty information": "Dm",
  "Data Security": "Ds",
  "Data Holders": "Dh",
  "Tech Literacy & Internet Penetration": "Lp",
  "Cultural/Institutional Roadblocks": "Rb",
  // ... add the rest of the elements
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
  

const CategoryContainer = ({ title, color, elements, doubleColumn, contentColor, onElementClick }) => (
    <div className={styles.categoryContainer} style={{ backgroundColor: color }}>
        <h2 className={styles.categoryTitle} style={{ color: contentColor }}>{title}</h2>
        <div className={`${styles.elementsGallery} ${doubleColumn ? styles.doubleColumn : ''}`}>
            {elements.map((element, index) => (
                <Element key={index} element={element[0]} contentColor={contentColor} onClick={onElementClick} />
            ))}
        </div>
    </div>
);

const PeriodicTable = () => {
    const [popupContent, setPopupContent] = useState(null);
  
    const handleElementClick = (element) => {
        // Use the periodicElements data here
        if(periodicElements[element]) {
            setPopupContent(periodicElements[element]);
        } else {
            // Handle the case where the element data is not found
            console.error("Data not found for element:", element);
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
