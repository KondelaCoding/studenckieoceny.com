import Image from "next/image";
import Logo from "../../../public/Logo.svg";
import { Separator } from "@/components/ui/separator";

const PolitykaPrywatności = () => {
  return (
    <>
      <div className="w-full mb-32">
        <h1 className="text-3xl font-bold inline-flex gap-3 items-center justify-center text-center">
          Polityka Prywatności dla StudenckieOceny.pl
          <Image src={Logo} alt="absolwent-uczelni" width={32} className="foreground-filter" />
        </h1>
        <Separator orientation="horizontal" className="my-5" />
        <p className="my-5 text-xl">
          <strong>1. Administrator danych osobowych</strong>
        </p>
        Administratorem danych osobowych użytkowników Serwisu StudenckieOceny.pl jest Mikołaj Kondela, prowadzący
        działalność w zakresie utrzymywania strony internetowej, adres e-mail kontaktowy:
        studenckieoceny.contact@gmail.com.
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>2. Zakres zbieranych danych osobowych</strong>
        </p>
        <p>Serwis StudenckieOceny.pl zbiera i przetwarza następujące dane osobowe:</p>
        <ul className="list-disc pl-10">
          <li>Imiona i pierwsza litera nazwiska wykładowców.</li>
          <li>Nicki użytkowników.</li>
          <li>Treści opinii publikowanych przez użytkowników.</li>
          <li>Data i czas publikacji opinii</li>
        </ul>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>3. Cele przetwarzania danych</strong>
        </p>
        <p>Dane osobowe są przetwarzane w następujących celach:</p>
        <ul className="list-disc pl-10">
          <li>Umożliwienie publikowania opinii na temat zajęć prowadzonych przez wykładowców.</li>
          <li>Zapewnienie zgodności z regulaminem Serwisu i zasadami dotyczącymi moderowania treści.</li>
          <li>Przeprowadzenie weryfikacji zgłoszeń naruszenia zasad.</li>
          <li>Utrzymanie funkcjonalności Serwisu, w tym analizy ruchu i użyteczności strony.</li>
        </ul>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>4. Podstawa prawna przetwarzania danych</strong>
        </p>
        <p>Przetwarzanie danych osobowych opiera się na następujących podstawach prawnych:</p>
        <ul className="list-disc pl-10">
          <li>
            Art. 6 ust. 1 lit. f RODO - przetwarzanie danych jest niezbędne do realizacji prawnie uzasadnionych
            interesów administratora (np. zapewnienie prawidłowego działania Serwisu).
          </li>
          <li>
            Art. 6 ust. 1 lit. a RODO - zgoda użytkownika na przetwarzanie danych osobowych, która jest wyrażona przez
            publikowanie opinii na stronie.
          </li>
        </ul>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>5. Okres przechowywania danych</strong>
        </p>
        <p>
          Dane osobowe będą przechowywane przez czas niezbędny do realizacji celów, do których zostały zebrane, w tym
          przez okres istnienia Serwisu, chyba że użytkownik zgłosi prośbę o ich usunięcie.Komentarze użytkowników będą
          przechowywane przez czas funkcjonowania Serwisu, chyba że użytkownik zdecyduje się je usunąć, lub
          administrator dokona ich usunięcia na podstawie regulaminu.
        </p>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>6. Prawa użytkowników</strong>
        </p>
        <p>Użytkownikom przysługuje prawo do:</p>
        <ul className="list-disc pl-10">
          <li>Dostępu do swoich danych osobowych.</li>
          <li>Sprostowania lub aktualizacji danych.</li>
          <li>
            Usunięcia danych osobowych (prawo do bycia zapomnianym), z wyjątkiem danych niezbędnych do celów
            archiwalnych lub obrony przed roszczeniami prawnymi.
          </li>
          <li>Ograniczenia przetwarzania danych osobowych.</li>
          <li>Przenoszenia danych osobowych, jeżeli są przetwarzane na podstawie zgody lub umowy.</li>
          <li>
            Złożenia skargi do organu nadzorczego, jeśli uzna, że przetwarzanie danych osobowych narusza przepisy RODO.
          </li>
        </ul>
        <p>
          Aby skorzystać z tych praw, należy skontaktować się z administratorem Serwisu pod adresem e-mail:
          studenckieoceny.contact@gmail.com.
        </p>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>7. Przekazywanie danych osobowych</strong>
        </p>
        <p>
          Dane osobowe użytkowników Serwisu nie będą przekazywane osobom trzecim, chyba że będzie to wymagane przepisami
          prawa lub w celu wykonania usług niezbędnych do działania Serwisu (np. hosting, systemy analityczne). W takim
          przypadku, podmioty przetwarzające dane na zlecenie administratora będą zobowiązane do przestrzegania
          przepisów RODO i odpowiednich umów powierzenia przetwarzania danych.
        </p>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>8. Bezpieczeństwo danych</strong>
        </p>
        <p>
          Administrator stosuje odpowiednie środki organizacyjne i techniczne, aby zapewnić bezpieczeństwo
          przetwarzanych danych osobowych, w tym zabezpieczenie przed ich nieautoryzowanym dostępem, zmianą, ujawnieniem
          lub zniszczeniem. Dane są przechowywane na zabezpieczonych serwerach, a dostęp do nich mają tylko uprawnione
          osoby.
        </p>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>9. Zmiany w polityce prywatności</strong>
        </p>
        <p>
          Administrator zastrzega sobie prawo do wprowadzenia zmian w Polityce Prywatności. Zmiany te będą publikowane
          na stronie Serwisu i wchodzą w życie w momencie ich opublikowania.
        </p>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>10. Kontakt</strong>
        </p>
        <p>
          W przypadku pytań dotyczących przetwarzania danych osobowych, użytkownicy mogą skontaktować się z
          administratorem Serwisu pod adresem e-mail: studenckieoceny.contact@gmail.com.
        </p>
      </div>
    </>
  );
};

export default PolitykaPrywatności;
