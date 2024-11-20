import BookSchema from "./BookSchema.js";

// C
export const insertBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

// Read (Get Book by ISBN)
export const getBookByISBN = (isbn) => {
  return BookSchema.findOne({ isbn: isbn });
};
// Read (Get All Books)
export const getAllBooks = () => {
  return BookSchema.find();
};

// Update (Update Book by ISBN)
export const updateBookByISBN = (isbn, updateObj) => {
  return BookSchema.findOneAndUpdate({ isbn: isbn }, updateObj, { new: true });
};

// Delete (Delete Book by ISBN)
export const deleteBookByISBN = (isbn) => {
  return BookSchema.findOneAndDelete({ isbn: isbn });
};
