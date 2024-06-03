import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Box, SelectChangeEvent } from '@mui/material';

interface DateLanguageSelectorProps {
  onSelectionChange: (selection: { date: string, language: string }) => void;
}

const DateLanguageSelector: React.FC<DateLanguageSelectorProps> = ({ onSelectionChange }) => {
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('en');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };

  const handleSearch = () => {
    onSelectionChange({ date, language });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" marginY={2}>
      <TextField
        label="Select Date"
        type="date"
        value={date}
        onChange={handleDateChange}
        InputLabelProps={{ shrink: true }}
      />
      <Select value={language} onChange={handleLanguageChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
        
      </Select>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default DateLanguageSelector;
