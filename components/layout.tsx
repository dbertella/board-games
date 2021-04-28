import CookieConsent from "react-cookie-consent";
import Footer from "./footer";
import Meta from "./meta";
import { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <CookieConsent buttonText="Ok">
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Meta />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
