import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";
import { lightTheme } from "../theme";

const googleMapsAPIKey = process.env["GOOGLE_MAPS_API_KEY"] || "";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content={lightTheme.palette.primary.main} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content={lightTheme.palette.secondary.main}
          ></meta>
          <meta name="apple-mobile-web-app-title" content="Pata"></meta>
          {/* Favicon */}
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta name="emotion-insertion-point" content="" />
          {/* apple touch */}
          <link rel="apple-touch-startup-image" href="/favicon.png"></link>
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link
            rel="apple-touch-icon"
            href="/apple-touch-icon-iphone-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-touch-icon-ipad-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-touch-icon-iphone-retina-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-touch-icon-ipad-retina-152x152.png"
          />
          {/* Third Party Scripts */}
          <script src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&libraries=places,geometry`}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            id="chatsupport-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html:
                "(function(a, b, c, d, e, f, g) { c[d] = c[d] || function() { (c[d].q = c[d].q || []).push(arguments); }; c['_lsAlias'] = c[d]; e = a.createElement(b); e.type = 'text/javascript'; e.async = true; e.src = 'https://app.chatsupport.co/api/client/get/script/LS-cb396977'; f = function() { g = a.getElementsByTagName(b)[0]; g.parentNode.insertBefore(e, g); }; c.addEventListener('load', f); })(document, 'script', window, '_ls'); _ls('init', { 'projectId': 'LS-cb396977' });",
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
