import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const formatMonth = (monthNumber) => {
  return months[monthNumber - 1];
}

const DocsDate = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/docs?action=list")
      .then((response) => response.json())
      .then((docs) => {
        const formattedData = formatData(docs);
        setData(formattedData);
      })
      .catch((error) => console.error(error));
  }, []);

  const formatData = (docs) => {
    const sortedDocs = docs.sort(
      (a, b) => new Date(a.metadata.date) - new Date(b.metadata.date)
    );

    const firstDate = new Date(sortedDocs[0].metadata.date);
    const lastDate = new Date(sortedDocs[sortedDocs.length - 1].metadata.date);

    let currentDate = new Date(firstDate);
    const counts = [];

    while (currentDate <= lastDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
      const count = sortedDocs.filter((doc) => {
        const docDate = new Date(doc.metadata.date);
        return docDate.getFullYear() === year && docDate.getMonth() === month - 1;
      }).length;
      counts.push({
        month: yearMonth,
        count,
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    let cumul = 0;
    const dataWithCumul = counts.map((item) => {
      cumul += item.count;
      return {
        ...item,
        cumulDocs: cumul,
      };
    });

    return dataWithCumul;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && label) {
      const [year, month] = label.split("-");
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`${formatMonth(parseInt(month))} ${year}`}</p>
          <p className="intro">{`Documents cumulés : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  

  const CustomizedAxisTick = ({ x, y, payload }) => {
    const [year, month] = payload.value.split("-");
    const xPos = x + (month === "01" ? 0 : -15);
    const displayYear = month === "01" ? year : '';
    return (
      <g transform={`translate(${xPos},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor={month === "01" ? 'start' : 'end'}
          fill="#666"
        >
          {displayYear}
        </text>
      </g>
    );
  };

  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
    >
      <XAxis
        dataKey="month"
        height={60}
        tick={<CustomizedAxisTick />}
        interval={0}
        tickLine={false}
      />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="cumulDocs" fill="#e95459" />
    </BarChart>
  );
};

export default DocsDate;
