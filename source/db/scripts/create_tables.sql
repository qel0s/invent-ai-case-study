CREATE DATABASE library_management;
USE library_management;


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    published_year INT NOT NULL,
    genre VARCHAR(100),
    rating FLOAT DEFAULT 0,
    rating_count INT DEFAULT 0
);


CREATE TABLE borrowed_books (
    borrow_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);


CREATE TABLE book_ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    rating FLOAT NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);


DELIMITER //
CREATE TRIGGER after_rating_insert
AFTER INSERT ON book_ratings
FOR EACH ROW
BEGIN
    UPDATE books
    SET rating = (SELECT AVG(rating) FROM book_ratings WHERE book_id = NEW.book_id),
        rating_count = (SELECT COUNT(*) FROM book_ratings WHERE book_id = NEW.book_id)
    WHERE book_id = NEW.book_id;
END//
DELIMITER ;


INSERT INTO users (first_name, last_name, email) VALUES
('John', 'Doe', 'john.doe@example.com'),
('Martha', 'Sand', 'martha.sand@example.com'),
('Jane', 'Smith', 'jane.smith@example.com');

INSERT INTO books (title, author, published_year, genre) VALUES
('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy'),
('1984', 'George Orwell', 1949, 'Dystopian'),
('To Kill a Mockingbird', 'Harper Lee', 1960, 'Classic'),
('Pride and Prejudice', 'Jane Austen', 1813, 'Romance'),
('The Catcher in the Rye', 'J.D. Salinger', 1951, 'Coming-of-age'),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Modern'),
('Moby Dick', 'Herman Melville', 1851, 'Adventure'),
('Wuthering Heights', 'Emily Brontë', 1847, 'Gothic'),
('Jane Eyre', 'Charlotte Brontë', 1847, 'Gothic'),
('The Adventures of Huckleberry Finn', 'Mark Twain', 1885, 'Adventure'),
('The Adventures of Tom Sawyer', 'Mark Twain', 1876, 'Adventure'),
('The Alchemist', 'Paulo Coelho', 1988, 'Philosophical'),
('The Da Vinci Code', 'Dan Brown', 2003, 'Thriller');

INSERT INTO borrowed_books (user_id, book_id, borrow_date, return_date) VALUES
(1, 1, '2024-01-01', '2024-01-15'),
(1, 2, '2024-02-01', '2024-02-14'),  
(2, 1, '2024-03-01', '2024-03-10'),  
(2, 3, '2024-04-01', '2024-04-10');  

INSERT INTO borrowed_books (user_id, book_id, borrow_date) VALUES
(3, 4, '2024-02-02'),
(3, 5, '2024-02-02'),
(3, 6, '2024-02-02')