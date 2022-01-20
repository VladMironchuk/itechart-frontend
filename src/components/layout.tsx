import "./layout.scss";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { ReactNode } from "react";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);
