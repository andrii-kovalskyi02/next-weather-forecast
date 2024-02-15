export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
