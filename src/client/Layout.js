const Layout = ({ body, styles, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>${title}</title>
      ${styles}
      <link rel="stylesheet" type="text/css" href="style.css" /> 
    </head>
    <body>
      <div id="app">${body}</div>
      <script src="client.js"></script>
    </body>
  </html>
`;

export default Layout;
