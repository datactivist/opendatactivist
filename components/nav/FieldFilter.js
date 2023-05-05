import React, { useState, useEffect } from 'react';
import styles from '../../styles/FieldFilter.module.css';

const FieldFilter = ({ data, onFilterChange }) => {
  const [uniqueFields, setUniqueFields] = useState([]);

  useEffect(() => {
    const fields = data.reduce((acc, item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (!acc[key]) {
          acc[key] = new Set();
        }
        acc[key].add(value);
      });
      return acc;
    }, {});

    const result = Object.entries(fields)
      .filter(([, values]) => values.size <= 30)
      .map(([key, values]) => ({
        key,
        values: Array.from(values),
        expanded: false,
        selectedValue: null,
      }));

    setUniqueFields(result);
  }, [data]);

  const handleFieldClick = (index) => {
    setUniqueFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index].expanded = !prevFields[index].expanded;
      return newFields;
    });
  };

  const handleValueClick = (fieldIndex, valueIndex) => {
    setUniqueFields((prevFields) => {
      const newFields = [...prevFields];
      const selectedValue = newFields[fieldIndex].selectedValue;
      if (selectedValue === valueIndex) {
        // Clicking on the selected value, reset the filter
        newFields[fieldIndex].selectedValue = null;
        onFilterChange({ key: newFields[fieldIndex].key, selected: null });
      } else {
        // Clicking on a different value, update the filter
        newFields[fieldIndex].selectedValue = valueIndex;
        const fieldKey = newFields[fieldIndex].key;
        const selectedValue = newFields[fieldIndex].values[valueIndex];
        onFilterChange({ key: fieldKey, selected: selectedValue });
      }
      return newFields;
    });
  };

  return (
    <div className={styles.fieldFilter}>
      {uniqueFields.map(({ key, values, expanded, selectedValue }, i) => (
        <div key={key} className={styles.formControl}>
          <div className={styles.label} onClick={() => handleFieldClick(i)}>
            {key}
          </div>
          {expanded && (
            <div className={styles.valuesContainer}>
              {values.map((value, j) => (
                <div
                  key={value}
                  className={`${styles.value} ${
                    j === selectedValue ? styles.selected : ''
                  }`}
                  onClick={() => handleValueClick(i, j)}
                >
                  {value}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FieldFilter;
