import CookieConsent from "react-cookie-consent";
import Footer from "./footer";
import Meta from "./meta";
import { FC } from "react";
import { Box } from "@theme-ui/components";

const Layout: FC = ({ children }) => {
  return (
    <>
      <CookieConsent buttonText="Ok">
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Meta />
      <Box as="main" variant="styles.container">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
