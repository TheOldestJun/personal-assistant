import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <div
      className="
        flex flex-col 
        h-dvh  /* динамическая высота видимой области */
        bg-gray-100
        overflow-hidden  /* убираем возможный скролл */
      "
    >
      <Header />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}