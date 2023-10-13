export interface Book {
  bookId: number;
  title: string;
  genre?: string;
  isbn?: string;
  pages?: number;
  price?: number;
}