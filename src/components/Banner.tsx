import { GraduationCap } from "lucide-react";
import SearchBar from "./SearchBar";

const Banner = () => {
  return (
    <div className="flex items-center flex-col gap-10 text-center pt-12">
      <div className="flex flex-col gap-5 justify-center items-center">
        <GraduationCap size={100} />
        <h1 className="text-3xl font-semibold sm:text-5xl">Ranking prowadzących</h1>
        <p className="max-w-md opacity-50 mx-auto">Dowiedz się czy warto iść na wykład.</p>
      </div>
      <SearchBar isFull={true} isInstant={false} />
    </div>
  );
};

export default Banner;
