import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/products/search-csv/${searchTerm}`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search CSV files:
        <input type="text" value={searchTerm} onChange={handleChange} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
