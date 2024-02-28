import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta charSet="utf-8" />
      </Head>
      <Navbar />

      <div className="flex-grow">{children}</div>

      {!router.pathname.includes("/driver") && <Footer />}
    </div>
  );
}

Layout.defaultProps = {
  title: "Along app",
  description: "Along App",
  keywords: "Along App",
};
