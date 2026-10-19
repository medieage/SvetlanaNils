import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';
export const alt = 'Светлана Нильс — Перо Феникса. Книги на заказ и наставничество для авторов.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [font, portrait] = await Promise.all([
    readFile(join(process.cwd(), 'app/assets/rubik-regular.ttf')),
    readFile(join(process.cwd(), 'public/images/pero-feniksa.jpg')),
  ]);
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#12120f', color: '#eee9de', padding: 48, fontFamily: 'Rubik' }}>
      <div style={{ display: 'flex', width: '100%', border: '1px solid #6a5940', padding: 30, alignItems: 'center', justifyContent: 'space-between', backgroundImage: 'radial-gradient(ellipse at 80% 50%, #332a1c 0%, #12120f 75%)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 575 }}>
          <div style={{ display: 'flex', fontSize: 18, letterSpacing: 5, color: '#cfb181', marginBottom: 32 }}>ПЕРО ФЕНИКСА</div>
          <div style={{ display: 'flex', fontSize: 57, lineHeight: 1.15 }}>Светлана Нильс</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 30, color: '#cfb181', lineHeight: 1.5, marginTop: 28 }}><span>Книги на заказ.</span><span>Наставничество для авторов.</span></div>
          <div style={{ display: 'flex', fontSize: 18, color: '#b3afa5', marginTop: 42 }}>svetlananils.ru</div>
        </div>
        {/* Local image embedded at build time; no external runtime requests. */}
        <img src={`data:image/jpeg;base64,${portrait.toString('base64')}`} width={390} height={390} alt="" style={{ borderRadius: 195 }} />
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Rubik', data: font, weight: 400, style: 'normal' }] },
  );
}
