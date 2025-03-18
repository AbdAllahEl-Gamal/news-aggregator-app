# News Aggregator App

## Features
- Search and filter news articles
- Personalize your news feed
- Mobile responsive

## Setup Locally
```bash
npm install
npm start
```

## Docker Run
```bash
docker build -t news-aggregator-app .
docker run -d -p 3000:3000 news-aggregator-app
```

## Project Structure

```plaintext
/news-aggregator-app
├── public/
│   ├── index.html
├── src/          
│   ├── components/           
│   ├── redux/
│   │   ├── slices/    
│   ├── services/           
│   ├── types/                
│   ├── App.tsx
│   └── index.tsx
│   └── index.css
├── Dockerfile
├── README.md
└── package.json