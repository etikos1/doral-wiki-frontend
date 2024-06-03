import axios from 'axios';

const API_URL = 'https://api.wikimedia.org/feed/v1/wikipedia';

const accessToken = process.env.REACT_APP_API_ACCESS_TOKEN;
const userAgent = process.env.REACT_APP_API_USER_AGENT;

export const fetchContent = async (date: string, language: string) => {
  const [year, month, day] = date.split('-');
  const url = `${API_URL}/${language}/featured/${year}/${month}/${day}`;

  console.log(`Fetching content from URL: ${url}`);
  console.log(`Using headers: Authorization: Bearer ${accessToken}, Api-User-Agent: ${userAgent}`);

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Api-User-Agent': userAgent
      }
    });
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};
