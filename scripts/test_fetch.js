import https from 'https';

const url = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv';

https.get(url, (res) => {
  console.log('Status code:', res.statusCode);
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log('Redirecting to:', res.headers.location);
  }
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Data snippet length:', data.length);
    console.log('First 300 chars:', data.slice(0, 300));
  });
}).on('error', err => console.error(err));
