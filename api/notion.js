module.exports = async function handler(req, res) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!token || !databaseId) {
    return res.status(500).json({ error: 'Missing NOTION_TOKEN or NOTION_DATABASE_ID env vars' });
  }

  const notionHeaders = {
    Authorization: `Bearer ${token}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  };

  // PATCH — update a page's properties
  if (req.method === 'PATCH') {
    const { pageId, properties } = req.body || {};
    if (!pageId || !properties) {
      return res.status(400).json({ error: 'pageId and properties required' });
    }
    try {
      const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
        method: 'PATCH',
        headers: notionHeaders,
        body: JSON.stringify({ properties }),
      });
      return res.status(r.status).json(await r.json());
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // POST — create a new page in the database
  if (req.method === 'POST') {
    const { properties } = req.body || {};
    if (!properties) return res.status(400).json({ error: 'properties required' });
    try {
      const r = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: notionHeaders,
        body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
      });
      return res.status(r.status).json(await r.json());
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // GET — query all camp items (handles pagination)
  if (req.method === 'GET') {
    try {
      let all = [];
      let cursor;
      do {
        const body = { page_size: 100 };
        if (cursor) body.start_cursor = cursor;
        const r = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
          method: 'POST',
          headers: notionHeaders,
          body: JSON.stringify(body),
        });
        if (!r.ok) {
          const err = await r.json();
          return res.status(r.status).json(err);
        }
        const data = await r.json();
        all = all.concat(data.results || []);
        cursor = data.has_more ? data.next_cursor : null;
      } while (cursor);

      return res.status(200).json(all);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
