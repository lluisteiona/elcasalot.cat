import Bloc from './Bloc';
import Slider from './Slider';

const Link = ({ href, children, external }) => (
  <a
    href={href}
    className="link-animat"
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
  >
    {children}
  </a>
);

const H2 = ({ children }) => (
  <h2 className="text-[#003366] text-2xl md:text-3xl font-bold mb-3">{children}</h2>
);

const P = ({ children }) => (
  <p className="text-gray-700 text-base leading-relaxed mb-3">{children}</p>
);

export function QuiSom() {
  return (
    <Bloc id="qui-som" style={{ gridArea: 'bloc1' }}>
      <H2>Qui som?</H2>
      <P>
        El Casalot és un <strong className="text-[#004080] font-semibold">esplai laic i inclusiu d'educació en el lleure</strong>{' '}
        on infants, monitores i monitors comparteixen una educació en valors, crítica i lliure.
        És un lloc on els infants poden desconnectar de la rutina diària i gaudir d'un temps
        de trobada enriquidor. A través{' '}
        <strong className="text-[#004080] font-semibold">d'activitats diverses i dinàmiques</strong>,
        promovem la reflexió sobre temes importants, tot fomentant valors com la cooperació,
        la convivència i el respecte, sempre des d'una perspectiva lúdica i divertida.
      </P>
    </Bloc>
  );
}

export function QueFem() {
  return (
    <Bloc id="que-fem" style={{ gridArea: 'bloc2' }}>
      <H2>Què fem?</H2>
      <P>
        Organitzem activitats cada dissabte a la tarda, colònies, campaments i projectes
        per fomentar el creixement personal i col·lectiu dels infants i joves.
      </P>
      <Slider />
    </Bloc>
  );
}

export function OnSom() {
  return (
    <Bloc id="on-som" style={{ gridArea: 'bloc3' }}>
      <H2>On som?</H2>
      <img
        src="assets/mapa.png"
        alt="Mapa ubicació Esplai El Casalot"
        className="w-full max-h-[300px] object-cover rounded-xl mb-3 shadow-sm hover:scale-[1.02] transition-transform duration-300"
      />
      <P>
        <Link
          href="https://www.google.es/maps/place/Esplai+El+Casalot/@41.9802206,2.3085711,236m"
          external
        >
          Veure al Google Maps
        </Link>
      </P>
    </Bloc>
  );
}

export function Esplac() {
  return (
    <Bloc id="esplac" style={{ gridArea: 'bloc4' }}>
      <H2>Esplac</H2>
      <P>
        Som un esplai associat a{' '}
        <strong className="text-[#004080] font-semibold">
          Esplais Catalans (<Link href="https://www.esplac.cat" external>Esplac</Link>)
        </strong>
        , una entitat laica, progressista i transformadora que agrupa esplais
        d'arreu del territori català. Esplac promou l'educació en el lleure com
        una eina de transformació social, basada en la participació infantil i
        juvenil, l'assemblearisme i el compromís amb el territori.
      </P>
      <P>Formar part d'Esplac vol dir compartir uns <strong className="text-[#004080] font-semibold">valors comuns</strong>, com ara:</P>
      <ul className="list-disc pl-6 mb-3 space-y-1 text-gray-700">
        {[
          [<><strong className="text-[#004080]">L'educació en el lleure</strong> com a espai educatiu lliure i crític.</>],
          [<><strong className="text-[#004080]">El feminisme, l'ecologisme i l'antiracisme</strong> com a eixos transversals del nostre dia a dia.</>],
          [<><strong className="text-[#004080]">L'autogestió i l'assemblearisme</strong>, donant veu a infants, joves i monitores en la presa de decisions.</>],
          [<><strong className="text-[#004080]">El compromís social</strong>, participant activament en la comunitat i promovent un món més just.</>],
        ].map((item, i) => <li key={i} className="text-base leading-relaxed">{item}</li>)}
      </ul>
      <P>
        A través d'Esplac, ens formem, compartim experiències amb altres esplais
        i participem en trobades i accions conjuntes que enriqueixen el nostre
        projecte educatiu i ens connecten amb una xarxa més gran que ens dona força i sentit.
      </P>
    </Bloc>
  );
}

export function Contacte() {
  return (
    <Bloc id="contacte" style={{ gridArea: 'contacte' }}>
      <H2>Contacte</H2>
      <P>
        Envia'ns un correu a{' '}
        <Link href="mailto:esplaielcasalot@gmail.com">esplaielcasalot@gmail.com</Link>
      </P>
      <P>
        També pots escriure'ns a Instagram{' '}
        <Link href="https://www.instagram.com/esplaielcasalot/" external>@esplaielcasalot</Link>
      </P>
    </Bloc>
  );
}

export function Instagram() {
  return (
    <Bloc id="instagram" style={{ gridArea: 'bloc6' }}>
      <H2>Segueix-nos a Instagram</H2>
      <P>
        <Link href="https://www.instagram.com/esplaielcasalot/" external>
          @esplaielcasalot
        </Link>
      </P>
    </Bloc>
  );
}
