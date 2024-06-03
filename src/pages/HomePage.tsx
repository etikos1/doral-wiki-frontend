import React, { useState, useEffect } from 'react';
import DateLanguageSelector from '../components/DateLanguageSelector';
import ContentGrid from '../components/ContentGrid';
import { fetchContent } from './api';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

const HomePage: React.FC = () => {
  const [content, setContent] = useState<any[]>([]);
  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>(() => {
    const savedStatus = localStorage.getItem('readStatus');
    return savedStatus ? JSON.parse(savedStatus) : {};
  });
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('en');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size

  useEffect(() => {
    if (date && language) {
      loadContent();
    }
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, [date, language]);

  const loadContent = async () => {
    try {
      const newContent = await fetchContent(date, language);
      const parsedContent = [
        ...(newContent.tfa ? [newContent.tfa] : []),
        ...(newContent.mostread?.articles || []),
        ...(newContent.news?.stories || []),
        ...(newContent.onthisday?.events || []),
        ...(newContent.image ? [newContent.image] : [])
      ].map((item: any) => ({
        ...item,
        titles: item.titles || { normalized: item.title || 'No Title' },
        extract: typeof item.extract === 'object' ? item.extract.text : item.extract,
        description: typeof item.description === 'object' ? item.description.text : item.description,
        id: item.pageid || item.title 
      }));

      setContent(parsedContent);
      setTotalPages(Math.ceil(parsedContent.length / pageSize));
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleSelectionChange = ({ date, language }: { date: string; language: string }) => {
    setDate(date);
    setLanguage(language);
    setContent([]);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setPage(1); // Reset page to 1 when page size changes
  };

  const handleCardClick = (id: string, url: string) => {
    const newReadStatus = { ...readStatus, [id]: true };
    setReadStatus(newReadStatus);
    localStorage.setItem('readStatus', JSON.stringify(newReadStatus));
    window.open(url, '_blank');
  };

  const paginatedContent = content.slice(0, page * pageSize);

  // Function to handle scroll event
  const handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    // Load more content if user has scrolled to the bottom of the page
    if (windowBottom >= docHeight) {
      loadMoreContent();
    }
  };

  // Function to load more content
  const loadMoreContent = () => {
    // Increment page number and load content
    setPage(prevPage => prevPage + 1);
    loadContent();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ marginBottom: 4 }}>
        <DateLanguageSelector onSelectionChange={handleSelectionChange} />
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={15}>15 items per page</option>
          {/* Add more options as needed */}
        </select>
      </Box>
      <ContentGrid content={paginatedContent} readStatus={readStatus} onCardClick={handleCardClick} />
      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
