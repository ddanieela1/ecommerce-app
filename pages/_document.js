import { Html, Head, Main, NextScript } from 'next/document';
// import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Document.getInitialProps = async (ctx) => {
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;
//   ctx.renderPage = () => {
//     return originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });
//   };
//   const initialProps = await Document.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   };
// };
