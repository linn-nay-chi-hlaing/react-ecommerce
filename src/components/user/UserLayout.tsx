import type { ReactNode } from "react";
import Footer from "./navigation/Footer";
import Header from "./navigation/Header";

interface UserProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserProps) {
  return (
    <div>
      <main className="user-layout">
        <Header />
        <div style={{ marginTop: "60px" }}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}