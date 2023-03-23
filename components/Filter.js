import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Filter({ types, selectedType, onSelectType, tags, selectedTag, onSelectTag }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="Type"
          onChange={(event) => onSelectType(event.target.value)}
        >
          <MenuItem value="">
            <em>Tous</em>
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="tag-select-label">Tag</InputLabel>
        <Select
          labelId="tag-select-label"
          id="tag-select"
          value={selectedTag}
          label="Tag"
          onChange={(event) => onSelectTag(event.target.value)}
        >
          <MenuItem value="">
            <em>Tous</em>
          </MenuItem>
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
