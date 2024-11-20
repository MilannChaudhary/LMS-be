import express from "express";
import {
  insertBook,
  getBookByISBN,
  getAllBooks,
  updateBookByISBN,
  deleteBookByISBN,
} from "../models/user/BookModel.js";
import { bookUpdateValidator, bookValidator } from "../middleware/joiValidation.js";

const router = express.Router();

// Add a New Book
router.post("/", bookValidator, async (req, res) => {
  try {
    const book = await insertBook(req.body);

    if (book?._id) {
      res.json({
        status: "success",
        message: "The book has been added successfully.",
        book,
      });
    } else {
      res.json({
        status: "error",
        message: "Unable to add the book. Please try again later.",
      });
    }
  } catch (error) {
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection")) {
      msg = "A book with the same ISBN already exists. Please use a unique ISBN.";
    }
    res.status(500).json({
      status: "error",
      message: msg,
    });
  }
});

// Get Book by ISBN
router.get("/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await getBookByISBN(isbn);

    if (book) {
      res.json({
        status: "success",
        book,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Book not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();

    res.json({
      status: "success",
      books,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Update Book by ISBN
router.put("/:isbn", bookUpdateValidator, async (req, res) => {
  try {
    const { isbn } = req.params;
    const updateData = req.body;

    if (!isbn) {
      return res.status(400).json({
        message: "ISBN is required in the URL",
        status: "error",
      });
    }
    const updatedBook = await updateBookByISBN(isbn, req.body);

    if (updatedBook) {
      res.json({
        status: "success",
        message: "The book has been updated successfully.",
        book: updatedBook,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Book not found. Unable to update.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Delete Book by ISBN
router.delete("/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const deletedBook = await deleteBookByISBN(isbn);

    if (deletedBook) {
      res.json({
        status: "success",
        message: "The book has been deleted successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Book not found. Unable to delete.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
