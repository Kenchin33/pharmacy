// SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Items from '../Components/Items';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults({ onAddToCart }) {
  const query = useQuery().get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/items/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Помилка при завантаженні результатів пошуку:', err);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-result-page">
      <h2>
        Результати пошуку за запитом: "{query}"
      </h2>
      <Items items={results} onAdd={onAddToCart} hideDesc={false} />
    </div>
  );
}
