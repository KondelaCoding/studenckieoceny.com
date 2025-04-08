import SearchBar from "./SearchBar";
import Logo from "../../public/Logo.svg";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex items-center flex-col gap-10 text-center pt-12">
      <div className="flex flex-col gap-5 justify-center items-center">
        <Image src={Logo} alt="absolwent-uczelni" width={100} className="foreground-filter" />
        <h1 className="text-3xl font-semibold sm:text-5xl">Studenckie oceny</h1>
        <p className="max-w-md opacity-50 mx-auto">Dowiedz się czy warto iść na wykład.</p>
      </div>
      <SearchBar isFull={true} isInstant={false} />
    </div>
  );
};

export default Banner;
