import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <div className="bg-card">
      <Separator orientation="horizontal" />
      <footer className="px-default py-10">
        <h1 className="text-xl font-semibold">
          Studenckie <span className="text-primary font-bold">oceny</span>
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
