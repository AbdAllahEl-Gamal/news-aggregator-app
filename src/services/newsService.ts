import { Article } from '../types';

export const fetchArticlesFromAPIs = async (): Promise<Article[]> => {
  const newsApiKey = "9fa943e99c4a49d6a426ca319bc00de2";
  const guardianApiKey = "1be1c119-9b41-4529-8c24-edc687f69759";
  const nytApiKey = "vt40KNXFHuoCyepdrfYfJDt33AFCIPux";

  const responses = await Promise.all([
    fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsApiKey}`).then(res => res.json()),
    fetch(`https://content.guardianapis.com/search?api-key=${guardianApiKey}&show-fields=byline`).then(res => res.json()),
    fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytApiKey}`).then(res => res.json()),
  ]);

  const [newsAPIData, guardianData, nytData] = responses;

  const newsArticles: Article[] = newsAPIData.articles.map((item: any) => ({
    title: item.title,
    description: item.description,
    url: item.url,
    source: item.source?.name ?? 'NewsAPI',
    category: item.category ?? '',
    date: item.publishedAt ?? '',
    author: item.author ?? 'Unknown Author',
  }));

  const guardianArticles: Article[] = guardianData.response.results.map((item: any) => ({
    title: item.webTitle,
    description: item.sectionName,
    url: item.webUrl,
    source: 'The Guardian',
    category: item.sectionName ?? '',
    date: item.webPublicationDate ?? '',
    author: item.fields?.byline ?? 'Unknown Author',
  }));

  const nytArticles: Article[] = nytData.results.map((item: any) => ({
    title: item.title,
    description: item.abstract,
    url: item.url,
    source: 'New York Times',
    category: item.section ?? '',
    date: item.published_date ?? '',
    author: item.byline?.replace(/^By\s+/i, '') ?? 'Unknown Author',
  }));

  return [...newsArticles, ...guardianArticles, ...nytArticles];
};