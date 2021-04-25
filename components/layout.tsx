import CookieConsent from "react-cookie-consent";
import Footer from "./footer";
import Meta from "./meta";
import { FC } from "react";
import Header from "./header";

const Layout: FC = ({ children }) => {
  return (
    <>
      <CookieConsent buttonText="Ok">
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
