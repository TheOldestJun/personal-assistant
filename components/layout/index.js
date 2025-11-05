import Footer from './footer';
import Header from './header';

export default function Layout({ children }) {
  return (
    <div className="/* динамическая высота видимой области */ /* убираем возможный скролл */ flex h-dvh flex-col overflow-hidden bg-gray-100">
      <Header />
      <main className="flex-1 overflow-auto p-6">{children}</main>
      <Footer />
    </div>
  );
}
