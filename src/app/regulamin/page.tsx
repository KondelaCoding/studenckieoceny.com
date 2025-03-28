import Navbar from "@/components/Navbar";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { Separator } from "@/components/ui/separator";

const Regulamin = () => {
  return (
    <>
      <Navbar />
      <div className="px-default w-full mb-32">
        <h1 className="text-3xl font-bold inline-flex gap-3 items-center justify-center text-center">
          Regulamin dla StudenckieOceny.pl
          <Image src={Logo} alt="absolwent-uczelni" width={32} className="foreground-filter" />
        </h1>
        <Separator orientation="horizontal" className="my-5" />
        <p className="my-5 text-xl">
          <strong>1. Postanowienia og&oacute;lne</strong>
        </p>
        <ol className="list-decimal pl-10">
          <li>
            Niniejszy regulamin określa zasady korzystania ze strony internetowej<strong>&nbsp;</strong>
            <a href="http://StudenckieOceny.pl">
              <span>StudenckieOceny.pl</span>
            </a>{" "}
            (dalej &quot;Serwis&quot;).
          </li>
          <li>
            Serwis umożliwia użytkownikom anonimowe wyrażanie opinii o zajęciach akademickich, przy zachowaniu zasad
            określonych w niniejszym regulaminie.
          </li>
          <li>Korzystanie z Serwisu oznacza akceptację niniejszego regulaminu.</li>
        </ol>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>2. Ochrona danych osobowych (RODO)</strong>
        </p>
        <ol className="list-decimal pl-10">
          <li>
            W Serwisie przechowywane są jedynie imiona i pierwsza litera nazwiska wykładowcy. Nie gromadzimy ani nie
            publikujemy pełnych danych osobowych.
          </li>
          <li>
            Opinie publikowane przez użytkownik&oacute;w nie mogą zawierać treści umożliwiających identyfikację
            konkretnej osoby, w tym nazwisk, adres&oacute;w e-mail, numer&oacute;w telefonu ani innych danych
            wrażliwych.
          </li>
          <li>
            Każdy wykładowca może zgłosić prośbę o usunięcie swojego profilu poprzez kontakt z administracją Serwisu pod
            adresem e-mail: studenckieoceny.contact@gmail.com.
          </li>
          <li>Podstawą przetwarzania danych jest art. 6 ust. 1 lit. f RODO.</li>
        </ol>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>3. Zasady publikowania opinii</strong>
        </p>
        <ol className="list-decimal pl-10">
          <li>
            Użytkownicy zobowiązują się do publikowania opinii zgodnych z prawdą oraz nienaruszających godności ani
            dobrego imienia wykładowc&oacute;w.
          </li>
          <li>
            Opinie nie mogą zawierać:
            <ul>
              <li>Treści zniesławiających, obraźliwych, dyskryminujących lub naruszających prawo.</li>
              <li>Informacji prywatnych o wykładowcach ani studentach.</li>
              <li>Treści reklamowych, spamu lub link&oacute;w do zewnętrznych stron.</li>
            </ul>
          </li>
          <li>Każdy użytkownik ponosi pełną odpowiedzialność prawną za treści publikowane w Serwisie.</li>
          <li>
            Serwis nie ponosi odpowiedzialności za treści publikowane przez użytkownik&oacute;w, jednak zastrzega sobie
            prawo do ich moderacji i usuwania w razie zgłoszenia naruszeń.
          </li>
        </ol>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>4. Moderacja treści</strong>
        </p>
        <ol className="list-decimal pl-10">
          <li>Serwis stosuje system moderacji w celu eliminacji treści naruszających regulamin.</li>
          <li>
            Każdy profil wykładowcy może zostać zgłoszony, co skutkuje tymczasowym ukryciem jego widoczności do czasu
            weryfikacji przez administrator&oacute;w.
          </li>
          <li>
            W przypadku powtarzających się naruszeń, administrator może ograniczyć dostęp do Serwisu użytkownikowi
            naruszającemu zasady.
          </li>
          <li>
            W przypadku zgłoszenia naruszenia d&oacute;br osobistych wykładowcy, administrator ma obowiązek rozpatrzenia
            zgłoszenia w ciągu 7 dni roboczych i podjęcia odpowiednich działań.
          </li>
          <li>
            Administrator może usuwać treści z własnej inicjatywy, jeśli naruszają regulamin, nie tylko po ich
            zgłoszeniu
          </li>
        </ol>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>5. Zgłaszanie naruszeń</strong>
        </p>
        <ol className="list-decimal pl-10">
          <li>
            Jeśli uważasz, że treści opublikowane w Serwisie naruszają Twoje prawa, skontaktuj się z administracją pod
            adresem e-mail:
            <span>
              <strong>&nbsp;</strong>
            </span>
            studenckieoceny.contact@gmail.com.
          </li>
          <li>
            Zgłoszenie powinno zawierać:
            <ul>
              <li>Opis naruszenia.</li>
              <li>Twoje dane kontaktowe (opcjonalnie, jeśli chcesz otrzymać odpowiedź).</li>
            </ul>
          </li>
          <li>Administrator może podjąć decyzję o usunięciu treści, jeśli uzna zgłoszenie za zasadne.</li>
        </ol>
        <p>
          <br />
        </p>
        <p className="my-5 text-xl">
          <strong>6. Postanowienia końcowe</strong>
        </p>
        <ol className="list-decimal pl-10">
          <li>
            Administrator zastrzega sobie prawo do zmiany regulaminu w każdym czasie. Zmiany będą publikowane na stronie
            Serwisu i wchodzą w życie w momencie ich opublikowania.
          </li>
          <li>W sprawach nieuregulowanych niniejszym regulaminem obowiązują przepisy prawa polskiego.</li>
          <li>Korzystanie z Serwisu po wprowadzeniu zmian oznacza ich akceptację.</li>
        </ol>
        <p>
          <br />
        </p>
      </div>
    </>
  );
};

export default Regulamin;
