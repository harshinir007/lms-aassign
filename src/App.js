import React, { useState, useEffect } from 'react';
import { BookList, FilterBar } from './components';
import axios from 'axios';

const App = () => {
const [books, setBooks] = useState([]);
const [filteredBooks, setFilteredBooks] = useState([]);

useEffect(() => {
const fetchData = async () => {
const result = await axios.get('/api/books');
setBooks(result.data);
setFilteredBooks(result.data);
};
fetchData();
}, []);

const handleFilterChange = (filteredBooks) => {
setFilteredBooks(filteredBooks);
};

return (
<div className="container">
<h1>Library Management</h1>
<FilterBar books={books} onFilterChange={handleFilterChange} />
<h2>Books ({filteredBooks.length})</h2>
<BookList books={filteredBooks} />
</div>
);
};

export default App;