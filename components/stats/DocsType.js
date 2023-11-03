import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#3d5a80',
  '#98c1d9',
  '#ee6c4d',
  '#ddbea9',
  '#293241',
  '#e0fbfc',
  '#f48c06',
  '#90be6d',
];

const DonutChartTypes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/docs?action=list')
      .then((response) => response.json())
      .then((docs) => {
        const formattedData = formatData(docs);
        setData(formattedData);
      })
      .catch((error) => console.error(error));
  }, []);

  const formatData = (docs) => {
    const typesMap = new Map();
    docs.forEach((doc) => {
      const type = doc.metadata.type;
      if (typesMap.has(type)) {
        typesMap.set(type, typesMap.get(type) + 1);
      } else {
        typesMap.set(type, 1);
      }
    });

    const formattedData = [];
    typesMap.forEach((value, key) => {
      formattedData.push({ name: key, value: value });
    });

    return formattedData;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '500px',
        width: '550px',
      }}
    >
      <div style={{ flex: 2, height: '100%' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="30%"
              cy="50%"
              outerRadius={130}
              innerRadius={80}
              fill="#8884d8"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          flex: 0.4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '10px',
        }}
      >
        {data.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: 5,
              }}
            />
            <div>{entry.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartTypes;
