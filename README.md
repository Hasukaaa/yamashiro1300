# Yamashiro 1300 - Instagram oEmbed Proxy

This project includes a lightweight oEmbed proxy for Instagram content using the Meta Graph API (no HTML scraping or CDN hotlinking).

## Meta App Setup (oEmbed Read)

1. Create a Meta app in the [Meta for Developers console](https://developers.facebook.com/).
2. Add the **Instagram Graph API** product.
3. Enable **oEmbed Read** permissions for the app.
4. Generate an access token for oEmbed requests.

## Environment Variables

Set the following env var before starting the server:

```
INSTAGRAM_OEMBED_ACCESS_TOKEN=YOUR_META_APP_TOKEN
```

## Local Development

Start the oEmbed server:

```
npm run start
```

The API endpoint is available at:

```
GET http://localhost:8787/api/instagram/oembed?url=https://www.instagram.com/p/POST_ID/
```

## Frontend Usage

Use the React component:

```jsx
import { InstagramEmbed } from './js/InstagramEmbed';
import './js/instagram-embed.css';

export default function GalleryItem() {
  return <InstagramEmbed url="https://www.instagram.com/p/POST_ID/" />;
}
```
