import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Combox from "./Combox";
import DrawerDemo from "./Drawer";

const Banner = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-10 text-center h-screen">
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl">Ranking prowadzących</h1>
        <p className="max-w-md opacity-50 mx-auto">Dowiedz się czy warto iść na wykład.</p>
      </div>
      <div className="flex gap-5">
        <div className="flex gap-3">
          <Input type="search" placeholder="Wyszukaj prowadzącego" />
          <Combox />
          <Combox />
        </div>
        <Button>
          <SearchIcon />
          Szukaj
        </Button>
      </div>
      <p>lub</p>
      <DrawerDemo />
    </div>
  );
};

export default Banner;
