import axios from 'axios';
import { GOOGLE_BOOKS_API_KEY } from './config';

export const fetchRecentBooks = async (query) => {
  try {
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=bestseller&orderBy=newest&maxResults=40&key=${GOOGLE_BOOKS_API_KEY}`);
    return res.data.items || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};
