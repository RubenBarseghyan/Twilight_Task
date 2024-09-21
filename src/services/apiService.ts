import axios from 'axios';
import { SearchData, ApiResponse } from '../interfaces/dataInterfaces';

export const searchInfections = async (searchData: SearchData): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>('/api/proxy', searchData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error((error.response.data as { message: string }).message);
    }
    throw new Error('Network error');
  }
};
