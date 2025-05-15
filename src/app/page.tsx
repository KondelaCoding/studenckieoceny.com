import Banner from "@/components/Banner";
import Presentation from "@/components/Presentation";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Banner />
      <Presentation />
    </div>
  );
}
