import { isValid, parse } from 'date-fns';

// Function to convert DD/MM/YYYY to YYYY-MM-DD
const formatDate = (dateString) => {
  try {
    const date = parse(dateString, 'dd/MM/yyyy', new Date());
    if (!isValid(date)) {
      throw new Error('Invalid date');
    }
    return date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD format
  } catch (error) {
    console.error('Date format error:', error);
    throw new Error('Invalid date format');
  }
};
export default formatDate