import Navigation from "./components/Navigation";

export const metadata = {
  title: "Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
  <html lang="en">
    <body>
      <Navigation />
      <main>{children}</main>
      <footer>© 2021 Wild Oasis</footer>
    </body>
  </html>
  );
}