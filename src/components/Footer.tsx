import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';
import Instagram from '../../public/instagram.svg';
import Github from '../../public/github.svg';
import BuyMeACoffee from '../../public/buy-me-a-coffee.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Footer = () => {
  return (
    <div className="bg-card">
      <Separator orientation="horizontal" />
      <footer className="px-default">
        <TooltipProvider>
          <div className="flex flex-col gap-10 items-center py-10 lg:flex-row lg:justify-between">
            <Link href="/">
              <h1 className="text-3xl font-semibold">
                Studenckie <span className="text-primary font-bold">oceny</span>
              </h1>
            </Link>
            <div className="inline-flex justify-center items-center gap-10 foreground-filter">
              {/* Instagram */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="https://www.instagram.com/studenckie_oceny/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src={Instagram} alt="instagram-logo" width={40} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram</p>
                </TooltipContent>
              </Tooltip>

              {/* GitHub */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="https://github.com/KondelaCoding"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src={Github} alt="github-logo" width={40} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>

              {/* BuyMeACoffee */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="https://buymeacoffee.com/mikolajkondela"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src={BuyMeACoffee} alt="buy-me-a-coffee-logo" width={40} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Buy me a coffee</p>
                </TooltipContent>
              </Tooltip>

              {/* Email */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="mailto:studenckieoceny.contact@gmail.com" rel="noopener noreferrer">
                    <Mail size={40} color="black" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kontakt</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
        <div className="mb-3 text-muted-foreground text-sm text-center w-full lg:flex lg:justify-between">
          <p>&copy; {new Date().getFullYear()} Studenckie oceny. Wszystkie prawa zastrzeżone.</p>
          <p>
            <Link href="/regulamin" className="text-primary underline hover:text-foreground">
              Regulamin
            </Link>{' '}
            i{' '}
            <Link
              href="/polityka-prywatnosci"
              className="text-primary underline hover:text-foreground"
            >
              polityka prywatności
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
