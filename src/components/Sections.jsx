import Slider from "./Slider";

export function QuiSom() {
  return (
    <section id="qui-som" className="bloc bloc1">
      <h2>Qui som?</h2>
      <p>
        El Casalot és un{" "}
        <strong>esplai laic i inclusiu d'educació en el lleure</strong> on
        infants, monitores i monitors comparteixen una educació en valors,
        crítica i lliure. És un lloc on els infants poden desconnectar de la
        rutina diària i gaudir d'un temps de trobada enriquidor. A través{" "}
        <strong>d'activitats diverses i dinàmiques</strong>, promovem la
        reflexió sobre temes importants, tot fomentant valors com la cooperació,
        la convivència i el respecte, sempre des d'una perspectiva lúdica i
        divertida.
      </p>
    </section>
  );
}

export function QueFem() {
  return (
    <section id="que-fem" className="bloc bloc2">
      <h2>Què fem?</h2>
      <p>
        Organitzem activitats cada dissabte a la tarda, colònies, campaments i
        projectes per fomentar el creixement personal i col·lectiu dels infants i
        joves.
      </p>
      <Slider />
    </section>
  );
}

export function OnSom() {
  return (
    <section id="on-som" className="bloc bloc3">
      <h2>On som?</h2>
      <img
        src="assets/mapa.png"
        alt="Mapa ubicació Esplai El Casalot"
        className="mapa"
      />
      <p>
        <a
          href="https://www.google.es/maps/place/Esplai+El+Casalot/@41.9802206,2.3085711,236m/data=!3m2!1e3!5s0x12a52f53c39d1ca7:0xdc584534014b1da!4m6!3m5!1s0x12a52f0e4f4496eb:0xc93ccc031614850e!8m2!3d41.9799582!4d2.3088258!16s%2Fg%2F11h9ktwd0y?hl=ca&entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          Veure al Google Maps
        </a>
      </p>
    </section>
  );
}

export function Esplac() {
  return (
    <section id="esplac" className="bloc bloc4">
      <h2>Esplac</h2>
      <p>
        Som un esplai associat a{" "}
        <strong>
          Esplais Catalans (
          <a
            href="https://www.esplac.cat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Esplac
          </a>
          )
        </strong>
        , una entitat laica, progressista i transformadora que agrupa esplais
        d'arreu del territori català. Esplac promou l'educació en el lleure com
        una eina de transformació social, basada en la participació infantil i
        juvenil, l'assemblearisme i el compromís amb el territori.
      </p>
      <p>
        Formar part d'Esplac vol dir compartir uns <strong>valors comuns</strong>
        , com ara:
      </p>
      <ul>
        <li>
          <strong>L'educació en el lleure</strong> com a espai educatiu lliure i
          crític.
        </li>
        <li>
          <strong>El feminisme, l'ecologisme i l'antiracisme</strong> com a eixos
          transversals del nostre dia a dia.
        </li>
        <li>
          <strong>L'autogestió i l'assemblearisme</strong>, donant veu a infants,
          joves i monitores en la presa de decisions.
        </li>
        <li>
          <strong>El compromís social</strong>, participant activament en la
          comunitat i promovent un món més just.
        </li>
      </ul>
      <p>
        A través d'Esplac, ens formem, compartim experiències amb altres esplais
        i participem en trobades i accions conjuntes que enriqueixen el nostre
        projecte educatiu i ens connecten amb una xarxa més gran que ens dona
        força i sentit.
      </p>
    </section>
  );
}

export function Contacte() {
  return (
    <section id="contacte" className="bloc bloc5">
      <h2>Contacte</h2>
      <p>
        Envia'ns un correu a{" "}
        <a href="mailto:esplaielcasalot@gmail.com">esplaielcasalot@gmail.com</a>
      </p>
      <p>
        També, si tens qualsevol dubte ens pots escriure a l'Instagram{" "}
        <a
          href="https://www.instagram.com/esplaielcasalot/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @esplaielcasalot
        </a>
      </p>
    </section>
  );
}

export function Instagram() {
  return (
    <section id="instagram" className="bloc bloc6">
      <h2>Segueix-nos a Instagram</h2>
      <p>
        <a
          href="https://www.instagram.com/esplaielcasalot/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @esplaielcasalot
        </a>
      </p>
    </section>
  );
}
