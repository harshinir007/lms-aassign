import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Form } from 'react-bootstrap';

const BookList = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Publish Date</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.subject}</td>
              <td>{book.publishDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() =>
            currentPage > 1 ? setCurrentPage(currentPage - 1) : null
          }
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages ? setCurrentPage(currentPage + 1) : null
          }
        />
      </Pagination>
    </div>
  );
};

const FilterBar = ({ books, onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [publishDate, setPublishDate] = useState('');

  const handleSubmit = (event) => {
  event.preventDefault();
  const filteredBooks = books.filter((book) => {
  return (
  book.title.toLowerCase().includes(title.toLowerCase()) &&
  book.author.toLowerCase().includes(author.toLowerCase()) &&
  book.subject.toLowerCase().includes(subject.toLowerCase()) &&
  book.publishDate.toLowerCase().includes(publishDate.toLowerCase())
  );
  });
  onFilterChange(filteredBooks);
  };
  
  return (
  <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicTitle">
  <Form.Label>Title</Form.Label>
  <Form.Control
  type="text"
  placeholder="Enter title"
  value={title}
  onChange={(event) => setTitle(event.target.value)}
  />
  </Form.Group>
  <Form.Group controlId="formBasicAuthor">
    <Form.Label>Author</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter author"
      value={author}
      onChange={(event) => setAuthor(event.target.value)}
    />
  </Form.Group>

  <Form.Group controlId="formBasicSubject">
    <Form.Label>Subject</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter subject"
      value={subject}
      onChange={(event) => setSubject(event.target.value)}
    />
  </Form.Group>

  <Form.Group controlId="formBasicPublishDate">
    <Form.Label>Publish Date</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter publish date"
      value={publishDate}
      onChange={(event) => setPublishDate(event.target.value)}
    />
  </Form.Group>

  <button type="submit" className="btn btn-primary">
    Filter
  </button>
</Form>
);
};

export { BookList, FilterBar };