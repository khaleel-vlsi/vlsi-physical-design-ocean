import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Module8Content from '../src/pages/modules/Module8Content.jsx';

try {
  console.log("Starting test render of Module8Content...");
  const html = ReactDOMServer.renderToString(React.createElement(Module8Content));
  console.log("Success! Rendered HTML length:", html.length);
} catch (e) {
  console.error("CRITICAL ERROR CAUGHT DURING RENDERING:");
  console.error(e.message);
  console.error(e.stack);
  process.exit(1);
}
