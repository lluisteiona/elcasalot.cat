import Bloc, { P, A } from './Bloc';
import Slider from './Slider';
import { EditableText, EditableList, EditableImage, EditableSliderManager } from './EditableField';

/* ── Qui som ──────────────────────────────────────────── */
export function QuiSom({ data, isAdmin, onChange }) {
  const upd = (key) => (val) => onChange({ ...data, [key]: val });
  return (
    <Bloc id="qui-som" style={{ gridArea: 'bloc1' }}>
      <EditableText tag="h2" value={data.titol} onSave={upd('titol')} isAdmin={isAdmin}
        style={{ color: '#003366', fontSize: 'clamp(1.4rem,3vw,2rem)', marginBottom: '0.75rem', fontWeight: 'bold' }} />
      <EditableText tag="p" value={data.text} onSave={upd('text')} isAdmin={isAdmin} multiline
        style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }} />
    </Bloc>
  );
}

/* ── Què fem ──────────────────────────────────────────── */
export function QueFem({ data, isAdmin, onChange }) {
  const upd = (key) => (val) => onChange({ ...data, [key]: val });
  return (
    <Bloc id="que-fem" style={{ gridArea: 'bloc2' }}>
      <EditableText tag="h2" value={data.titol} onSave={upd('titol')} isAdmin={isAdmin}
        style={{ color: '#003366', fontSize: 'clamp(1.4rem,3vw,2rem)', marginBottom: '0.75rem', fontWeight: 'bold' }} />
      <EditableText tag="p" value={data.text} onSave={upd('text')} isAdmin={isAdmin} multiline
        style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }} />
      <Slider fotos={data.fotos} />
      <EditableSliderManager fotos={data.fotos || []} onSave={upd('fotos')} isAdmin={isAdmin} />
    </Bloc>
  );
}

/* ── On som ───────────────────────────────────────────── */
export function OnSom({ data, isAdmin, onChange }) {
  const upd = (key) => (val) => onChange({ ...data, [key]: val });
  return (
    <Bloc id="on-som" style={{ gridArea: 'bloc3' }}>
      <EditableText tag="h2" value={data.titol} onSave={upd('titol')} isAdmin={isAdmin}
        style={{ color: '#003366', fontSize: 'clamp(1.4rem,3vw,2rem)', marginBottom: '0.75rem', fontWeight: 'bold' }} />
      <EditableImage
        src={data.mapaUrl} onSave={upd('mapaUrl')} isAdmin={isAdmin} alt="Mapa"
        imgStyle={{ width:'100%', maxHeight:'300px', objectFit:'cover',
          borderRadius:'12px', marginBottom:'0.75rem', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}
      />
      {isAdmin ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.85rem', color: '#555' }}>Enllaç Maps:</span>
          <EditableText tag="span" value={data.mapsLink} onSave={upd('mapsLink')} isAdmin={isAdmin}
            style={{ fontSize: '0.85rem', color: '#007BFF', flex: 1 }} />
        </div>
      ) : (
        <P><A href={data.mapsLink} external>Veure al Google Maps</A></P>
      )}
    </Bloc>
  );
}

/* ── Esplac ───────────────────────────────────────────── */
export function Esplac({ data, isAdmin, onChange }) {
  const upd = (key) => (val) => onChange({ ...data, [key]: val });
  return (
    <Bloc id="esplac" style={{ gridArea: 'bloc4' }}>
      <EditableText tag="h2" value={data.titol} onSave={upd('titol')} isAdmin={isAdmin}
        style={{ color: '#003366', fontSize: 'clamp(1.4rem,3vw,2rem)', marginBottom: '0.75rem', fontWeight: 'bold' }} />
      <EditableText tag="p" value={data.intro} onSave={upd('intro')} isAdmin={isAdmin} multiline
        style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333', marginBottom: '0.75rem' }} />
      <EditableText tag="p" value={data.valorsIntro} onSave={upd('valorsIntro')} isAdmin={isAdmin}
        style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333', marginBottom: '0.5rem' }} />
      <EditableList items={data.valors} onSave={upd('valors')} isAdmin={isAdmin} />
      <EditableText tag="p" value={data.outro} onSave={upd('outro')} isAdmin={isAdmin} multiline
        style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }} />
    </Bloc>
  );
}

/* ── Contacte ─────────────────────────────────────────── */
export function Contacte({ data, isAdmin, onChange }) {
  const upd = (key) => (val) => onChange({ ...data, [key]: val });
  return (
    <Bloc id="contacte" style={{ gridArea: 'contacte' }}>
      <EditableText tag="h2" value={data.titol} onSave={upd('titol')} isAdmin={isAdmin}
        style={{ color: '#003366', fontSize: 'clamp(1.4rem,3vw,2rem)', marginBottom: '0.75rem', fontWeight: 'bold' }} />
      <P>
        Envia'ns un correu a{' '}
        {isAdmin
          ? <EditableText tag="span" value={data.email} onSave={upd('email')} isAdmin={isAdmin}
              style={{ color: '#007BFF' }} />
          : <A href={`mailto:${data.email}`}>{data.email}</A>
        }
      </P>
      <P>
        També pots escriure'ns a Instagram{' '}
        {isAdmin
          ? <EditableText tag="span" value={data.instagram} onSave={upd('instagram')} isAdmin={isAdmin}
              style={{ color: '#007BFF' }} />
          : <A href={`https://www.instagram.com/${data.instagram}/`} external>@{data.instagram}</A>
        }
      </P>
    </Bloc>
  );
}

/* ── Instagram ────────────────────────────────────────── */
export function Instagram({ data, isAdmin, onChange }) {
  const upd = (key) => (val) => onChange({ ...data, [key]: val });
  return (
    <Bloc id="instagram" style={{ gridArea: 'bloc6' }}>
      <EditableText tag="h2" value={data.titol} onSave={upd('titol')} isAdmin={isAdmin}
        style={{ color: '#003366', fontSize: 'clamp(1.4rem,3vw,2rem)', marginBottom: '0.75rem', fontWeight: 'bold' }} />
      <P>
        {isAdmin
          ? <EditableText tag="span" value={data.handle} onSave={upd('handle')} isAdmin={isAdmin}
              style={{ color: '#007BFF' }} />
          : <A href={`https://www.instagram.com/${data.handle}/`} external>@{data.handle}</A>
        }
      </P>
    </Bloc>
  );
}
