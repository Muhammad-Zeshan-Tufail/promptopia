import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";

export const metadata = {
  title: "Promtopia",
  description: "Discover and share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <main className="flex items-center flex-col bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 min-h-screen sm:px-8 px-2">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
