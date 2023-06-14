import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ size }) => {
  const [data, setData] = useState([]);
  const chartArea = useRef(null);

  useEffect(() => {
    fetch("/api/docs?action=list")
      .then(response => response.json())
      .then(docs => {
        const tagsMap = new Map();
        docs.forEach(doc => {
          doc.metadata.tags.forEach(tag => {
            if (tagsMap.has(tag)) {
              tagsMap.set(tag, tagsMap.get(tag) + 1);
            } else {
              tagsMap.set(tag, 1);
            }
          });
        });
        const formattedData = Array.from(tagsMap, ([text, value]) => ({ text, value }));
        setData(formattedData);
      })
      .catch(console.error);
  }, []);

  const COLORS = ["#3d5a80", "#98c1d9", "#ee6c4d", "#ddbea9", "#293241", "#e0fbfc", "#f48c06", "#90be6d"];

const drawChart = (words) => {
  const svg = d3.select(chartArea.current)
    .append('svg')
    .attr('width', size[0])
    .attr('height', size[1]);

  svg.append('g')
    .attr('transform', 'translate(' + size[0] / 2 + ',' + size[1] / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter().append('text')
    .style('font-size', d => d.size + 'px')
    .style('fill', (d, i) => COLORS[i % COLORS.length])
    .attr('text-anchor', 'middle')
    .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
    .text(d => d.text);
};

  useEffect(() => {
    if (data.length > 0) {
      const fontSizeScale = d3.scaleLinear().domain([1, d3.max(data, d => d.value)]).range([12, 80]);

      const layout = cloud()
        .size(size)
        .words(data.map(d => ({ ...d, size: fontSizeScale(d.value) })))
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font('Montserrat')
        .fontSize(d => d.size)
        .on('end', drawChart);

      layout.start();
    }
  }, [data]);

  return <div ref={chartArea}></div>;
};

export default WordCloud;
