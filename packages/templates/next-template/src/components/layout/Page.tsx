import Header from "./Header";
import Footer from "./Footer";
import React, { PropsWithChildren } from "react";

interface PageProps {
  header?: boolean;
  footer?: boolean;
}

const Page: React.FC<PropsWithChildren<PageProps>> = ({
  children,
  header = true,
  footer = true,
}) => {
  return (
    <div className="min-h-screen">
      {!!header && <Header />}
      <div className="min-h-content container">{children}</div>
      {!!footer && <Footer />}
    </div>
  );
};

export default Page;
