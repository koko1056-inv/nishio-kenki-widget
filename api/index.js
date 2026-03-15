export default async function handler(req, res) {
  try {
    const targetUrl = 'https://www.nishio-rent.co.jp/kenki/';
    const response = await fetch(targetUrl);
    let html = await response.text();

    const widgetCode = `
    <elevenlabs-convai agent-id="agent_2801kkrr9pj2eynaxfpxbdd28c8j"></elevenlabs-convai>
    <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"><\/script>
    `;

    html = html.replace('</body>', widgetCode + '</body>');

    html = html.replace(/href="\//g, 'href="https://www.nishio-rent.co.jp/');
    html = html.replace(/src="\//g, 'src="https://www.nishio-rent.co.jp/');
    html = html.replace(/href="\.\//g, 'href="https://www.nishio-rent.co.jp/kenki/');
    html = html.replace(/src="\.\//g, 'src="https://www.nishio-rent.co.jp/kenki/');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Error fetching page: ' + error.message);
  }
}
