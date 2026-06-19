import Header from "../components/header";
import LiveMarkets from "../components/liveMarkets";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <LiveMarkets />
      <main className="flex-1 w-full lg:w-[80vw] mx-auto">{children}</main>
    </div>
  );
}
