import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-montserrat)]">
      <Banner />
      <Navbar />
    </div>
  );
}
/*
!Teacher ranking ideas

!every teacher should have properties like: name, rating(0-5 stars float), number of votes, subject, university, graph

!graph is supposed to be taken from a picture and the values should be able to be displayed on the site

!when search returns no results, display add teacher button

!navbar just logo and search bar for now
*/
