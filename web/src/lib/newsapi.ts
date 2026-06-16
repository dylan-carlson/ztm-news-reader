export async function fetchNews({ category, search, page }: { category: string, search: string, page: number }) {
  const url = new URL('/api/news/all', window.location.origin);
  if (search) {
    url.searchParams.append('search', search);
  } else if (category) {
    url.searchParams.append('categories', category);
  }
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', '3');

  console.log(`Fetching: ${url.pathname}${url.search}`);

  const res = await fetch(url.toString());
  const data = await res.json();
  
  if (!res.ok) {
    return { error: data.error || 'Failed to fetch' };
  }
  
  return data;
}