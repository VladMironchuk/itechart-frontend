import "./layout.scss";
import { ReactNode } from "react";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);
