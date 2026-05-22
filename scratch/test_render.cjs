const { createServer } = require('vite');

async function test() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  try {
    const { default: Module8Content } = await vite.ssrLoadModule('/src/pages/modules/Module8Content.jsx');
    const React = await vite.ssrLoadModule('react');
    const ReactDOMServer = await vite.ssrLoadModule('react-dom/server');
    
    console.log("Rendering Module8Content...");
    const html = ReactDOMServer.renderToString(React.createElement(Module8Content));
    console.log("Rendered successfully! HTML length:", html.length);
  } catch (err) {
    console.error("CRITICAL ERROR during rendering:");
    console.error(err);
  } finally {
    await vite.close();
  }
}

test();
