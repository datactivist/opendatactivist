import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import chroma from 'chroma-js';

const generateTagColors = (tags) => {
  const colorScale = chroma.scale(['#713E5A', '#63A375', '#EDC79B', '#D57A66', '#CA6680']).mode('lch').colors(tags.length);

  const tagColors = {};
  tags.forEach((tag, index) => {
    tagColors[tag] = colorScale[index];
  });

  return tagColors;
};

const TagSystem = ({ tags, onClickTag }) => {
  const tagColors = generateTagColors(tags);

  return (
    <div>
      {tags &&
        tags.map((tag, index) => (
          <Link key={index} href={`/tags/${tag}`} passHref>
            <Button
              onClick={() => onClickTag(tag)}
              sx={{
                textTransform: 'none',
                fontSize: '0.9rem',
                mr: 1,
                mb: 1,
                backgroundColor: tagColors[tag],
                color: '#fff',
              }}
            >
              {tag}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default TagSystem;
