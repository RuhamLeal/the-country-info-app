import type { Metadata } from "next";
import "../styles/globals.css";
import ReactQueryProvider from "@/providers/react-query";

export const metadata: Metadata = {
  title: "Countries App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
