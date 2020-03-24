import { AuthProvider } from "react-use-auth";
import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
      <AuthProvider
          navigate={router.push}
          auth0_domain={process.env.AUTH0_DOMAIN}
          auth0_client_id={process.env.AUTH0_CLIENT_ID}
      >
        <Component {...pageProps} />
      </AuthProvider>
  );
}

export default MyApp;
