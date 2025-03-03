import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <div className="bg-card">
      <Separator orientation="horizontal" />
      <footer className="px-default py-10">
        <h1 className="text-xl font-semibold">
          <span className="text-primary font-bold">Ranking</span> prowadzących
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
