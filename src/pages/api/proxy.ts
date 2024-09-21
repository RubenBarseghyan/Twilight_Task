import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://api3.twilightcyber.com';
const API_KEY = process.env.NEXT_PUBLIC_TWILIGHT_API_KEY || 'fb1fffffa1e09a0888bbe10987edfc';

interface ApiResponse {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/infections/_search`, req.body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status || 500;
    const errorMessage = getErrorMessage(statusCode);

    console.error(`Error making API request: ${axiosError.message}`);
    res.status(statusCode).json({ message: errorMessage });
  }
}

const getErrorMessage = (statusCode: number): string => {
  switch (statusCode) {
    case 403:
      return 'Invalid API key. Please check your API key and try again.';
    case 429:
      return 'Rate limit exceeded. Please try again later.';
    case 400:
      return 'Invalid domain provided. Please check the domain and try again.';
    default:
      return 'An unknown error occurred.';
  }
};
