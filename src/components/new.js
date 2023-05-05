import React, { useState, useEffect } from "react";
import Book from "./Book";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [publishDateFilter, setPublishDateFilter] = useState("");

  useEffect(() => {
    // Load books data from API or local storage
    // and set to books state
    const data = [
      { id: 1, title: "Book 1", author: "Author 1", subject: "Subject 1", publishDate: "2021-01-01" },
      { id: 2, title: "Book 2", author: "Author 2", subject: "Subject 2", publishDate: "2021-02-01" },
      { id: 3, title: "Book 3", author: "Author 3", subject: "Subject 3", publishDate: "2021-03-01" },
      { id: 4, title: "Book 4", author: "Author 4", subject: "Subject 4", publishDate: "2021-04-01" },
      { id: 5, title: "Book 5", author: "Author 5", subject: "Subject 5", publishDate: "2021-05-01" },
      { id: 6, title: "Book 6", author: "Author 6", subject: "Subject 6", publishDate: "2021-06-01" },
      { id: 7, title: "Book 7", author: "Author 7", subject: "Subject 7", publishDate: "2021-07-01" },
      { id: 8, title: "Book 8", author: "Author 8", subject: "Subject 8", publishDate: "2021-08-01" },
      { id: 9, title: "Book 9", author: "Author 9", subject: "Subject 9", publishDate: "2021-09-01" },
      { id: 10, title: "Book 10", author: "Author 10", subject: "Subject 10", publishDate: "2021-10-01" },
      { id: 11, title: "Book 11", author: "Author 11", subject: "Subject 11", publishDate: "2021-11-01" },
      { id: 12, title: "Book 12", author: "Author 12", subject: "Subject 12", publishDate: "2021-12-01" },
      { id: 13, title: "Book 13", author: "Author 13", subject: "Subject 13", publishDate: "2022-01-01" },
      { id: 14, title: "Book 14", author: "Author 14", subject: "Subject 14", publishDate: "2022-02-01" },
      { id: 15,title: "Book 15", author: "Author 15", subject: "Subject 15", publishDate: "2022-03-01" },
      { id: 16, title: "Book 16", author: "Author 16", subject: "Subject 16", publishDate: "2022-04-01" },
      { id: 17, title: "Book 17", author: "Author 17", subject: "Subject 17", publishDate: "2022-05-01" },
      { id: 18, title: "Book 18", author: "Author 18", subject: "Subject 18", publishDate: "2022-06-01" },
      { id: 19, title: "Book 19", author: "Author 19", subject: "Subject 19", publishDate: "2022-07-01" },
      { id: 20, title: "Book 20", author: "Author 20", subject: "Subject 20", publishDate: "2022-08-01" },
      ];
      setBooks(data);
      }, []);
      
      useEffect(() => {
      // Filter books based on title, author, subject and publish date
      let filteredBooks = books.filter((book) => {
      return (
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
      book.subject.toLowerCase().includes(subjectFilter.toLowerCase()) &&
      book.publishDate.toLowerCase().includes(publishDateFilter.toLowerCase())
      );
      });
      setFilteredBooks(filteredBooks);
      }, [books, titleFilter, authorFilter, subjectFilter, publishDateFilter]);
      
      // Get current books
      const indexOfLastBook = currentPage * booksPerPage;
      const indexOfFirstBook = indexOfLastBook - booksPerPage;
      const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
      
      // Change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
      
      return (
      <div>
      <div className="filters">
      <input type="text" placeholder="Title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
      <input type="text" placeholder="Author" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} />
      <input type="text" placeholder="Subject" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} />
      <input type="text" placeholder="Publish Date" value={publishDateFilter} onChange={(e) => setPublishDateFilter(e.target.value)} />
      <div className="filter-counts">
      <div>Title: {filteredBooks.filter((book) => book.title.toLowerCase().includes(titleFilter.toLowerCase())).length}</div>
      <div>Author: {filteredBooks.filter((book) => book.author.toLowerCase().includes(authorFilter.toLowerCase())).length}</div>
      <div>Subject: {filteredBooks.filter((book) => book.subject.toLowerCase().includes(subjectFilter.toLowerCase())).length}</div>
      <div>Publish Date: {filteredBooks.filter((book) => book.publishDate.toLowerCase().includes(publishDateFilter.toLowerCase())).length}</div>
      </div>
      </div>
      <div className="books">
      {currentBooks.map((book) => (
      <Book key={book.id} book={book} />
      ))}
      </div>
      <div className="pagination">
      {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
      <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index +1 ? "active" : null}>
      {index + 1}
      </button>
      ))}
      </div>
      </div>
      );
      }
      
      function Book({ book }) {
      return (
      <div className="book">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Subject: {book.subject}</p>
      <p>Publish Date: {book.publishDate}</p>
      </div>
      );
      }
      
      ReactDOM.render(<Library />, document.getElementById("root"));
