export const fecthRequest = async (url, method, body) => {
  const BASE_URL = 'http://localhost:8800/api';
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    if(!response.ok) throw new Error('Something went wrong');
    return await response.json();
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}