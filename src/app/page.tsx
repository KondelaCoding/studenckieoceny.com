import Banner from "@/components/Banner";
import Presentation from "@/components/Presentation";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="px-default flex flex-col">
      <Navbar />
      <Banner />
      <Presentation />
    </div>
  );
}
/*
!every teacher should have properties like: name, rating(0-5 stars float), number of votes, subject, university, graph
*/
