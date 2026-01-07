import React, { useEffect, useMemo, useState } from 'react';

let embedScriptPromise;

function loadInstagramEmbedScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  if (!embedScriptPromise) {
    embedScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-instagram-embed]');
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-instagram-embed', 'true');
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Instagram embed script'));
      document.body.appendChild(script);
    });
  }
  return embedScriptPromise;
}

export function InstagramEmbed({ url }) {
  const [state, setState] = useState({ status: 'idle', data: null, error: null });
  const requestUrl = useMemo(() => `/api/instagram/oembed?url=${encodeURIComponent(url)}`, [url]);

  useEffect(() => {
    let isMounted = true;
    if (!url) {
      setState({ status: 'error', data: null, error: 'url is required' });
      return () => {};
    }
    setState({ status: 'loading', data: null, error: null });

    fetch(requestUrl)
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body?.error || 'Failed to load embed');
        }
        return body;
      })
      .then(async (body) => {
        if (!isMounted) return;
        setState({ status: 'ready', data: body, error: null });
        await loadInstagramEmbedScript();
        if (window.instgrm?.Embeds?.process) {
          window.instgrm.Embeds.process();
        }
      })
      .catch((error) => {
        if (!isMounted) return;
        setState({ status: 'error', data: null, error: error.message });
      });

    return () => {
      isMounted = false;
    };
  }, [requestUrl, url]);

  if (state.status === 'loading') {
    return <div className="instagram-embed instagram-embed--loading">読み込み中...</div>;
  }
  if (state.status === 'error') {
    return <div className="instagram-embed instagram-embed--error">埋め込みに失敗しました。</div>;
  }
  if (!state.data?.html) {
    return null;
  }

  return (
    <div
      className="instagram-embed"
      dangerouslySetInnerHTML={{ __html: state.data.html }}
    />
  );
}
