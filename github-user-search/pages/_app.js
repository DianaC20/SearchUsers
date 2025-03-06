import { useEffect } from "react";
import { UserProvider } from '../context/UserContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;