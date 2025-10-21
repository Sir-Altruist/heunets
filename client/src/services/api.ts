const api = {
  req:  async (path: string, method: string | undefined = 'GET', body: object | null = null, isProtected: boolean = false, token: string | null = null) => {
    try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
      const options: RequestInit =  {
        method,
        headers: isProtected ? {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        } : {
          'Content-Type': 'application/json',
        }
      };

      if (body) options.body = JSON.stringify(body);
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (e: any) {
      return e.response ? e.response.data : {
        status: 'failure',
        responseCode: '01',
        responseMessage: 'Network Error'
      };
    }
  },
}
export default api;
