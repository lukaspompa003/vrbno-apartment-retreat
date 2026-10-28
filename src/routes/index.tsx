import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import hero from "@/assets/relax-hero.jpeg.asset.json";
import kitchen from "@/assets/kitchen.jpg";
import bathroom from "@/assets/bathroom.jpg";
import exterior from "@/assets/exterior.jpg";
import living1 from "@/assets/IMG_0890.jpeg.asset.json";
import living2 from "@/assets/IMG_0891.jpeg.asset.json";
import living3 from "@/assets/IMG_0892.jpeg.asset.json";
import living4 from "@/assets/IMG_0893.jpeg.asset.json";
import living5 from "@/assets/IMG_0889.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apartmán Relax – Vrbno pod Pradědem" },
      { name: "description", content: "Útulný apartmán pro 2 osoby ve Vrbně pod Pradědem. Wi-Fi, parkování, terasa, výhled na hory." },
      { property: "og:title", content: "Apartmán Relax – Vrbno pod Pradědem" },
      { property: "og:description", content: "Útulný apartmán pro 2 osoby v Jeseníkách." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sections = [
  {
    title: "Obývací pokoj s postelí",
    photos: [hero.url, living1.url, living2.url, living5.url, living4.url, living3.url],
    items: ["Manželská postel", "Jídelní stůl", "Wi-Fi zdarma"],
  },
  { title: "Koupelna", photos: [bathroom], items: ["Prostorný sprchový kout", "Toaleta", "Pračka"] },
  { title: "Kuchyň", photos: [kitchen], items: ["Lednička s mrazákem", "Myčka nádobí", "Varná deska", "Mikrovlnná trouba"] },
  { title: "Terasa a vchod", photos: [exterior], items: ["Sezení", "Soukromé parkoviště zdarma", "Výhled na hory"] },
  { title: "Venku", photos: [] as string[], items: [] as string[] },
];

const nearby = [
  { place: "Karlova Studánka – lázně", dist: "11 km autem" },
  { place: "Lyžařský areál Kopřivná", dist: "17 km autem" },
  { place: "Praděd", dist: "19 km autem" },
  { place: "Termály Velké Losiny", dist: "60 km, hodina cesty" },
];



const prices = [
  { season: "Léto", price: "1 900 Kč" },
  { season: "Zima", price: "1 900 Kč" },
  { season: "Silvestr", price: "5 000 Kč" },
];

function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + photos.length) % photos.length);
  return (
    <div>
      <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">
        <img src={photos[i]} alt={`${title} – foto ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
        <button aria-label="Předchozí" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-overlay p-2 text-on-overlay">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button aria-label="Další" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-overlay p-2 text-on-overlay">
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-overlay px-3 py-1 text-xs text-on-overlay">{i + 1} / {photos.length}</span>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {photos.map((p, k) => (
          <button key={k} onClick={() => setI(k)} className={`h-14 w-20 shrink-0 overflow-hidden rounded-sm border-2 ${k === i ? "border-primary" : "border-transparent opacity-60"}`}>
            <img src={p} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <main>
      <section className="relative h-[85vh] min-h-[480px]">
        <img src={hero.url} alt="Apartmán Relax" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-overlay to-transparent" />
        <div className="relative flex h-full flex-col items-center justify-end pb-16 text-center text-on-overlay">
          <h1 className="text-5xl md:text-7xl">Apartmán Relax</h1>
          <p className="mt-3 text-sm uppercase tracking-[0.3em]">2 osoby · 1 manželská postel</p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-16">
        <h2 className="mb-8 text-center text-3xl">V okolí</h2>
        <ul className="space-y-3">
          {nearby.map((n) => (
            <li key={n.place} className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <span>{n.place}</span>
              <span className="shrink-0 text-sm text-muted-foreground">{n.dist}</span>
            </li>
          ))}
        </ul>
      </section>



      <div className="mx-auto max-w-4xl space-y-24 px-6 py-20">
        {sections.filter((s) => s.photos.length > 0).map((s) => (
          <section key={s.title}>
            <h2 className="mb-6 text-4xl">{s.title}</h2>
            <Gallery photos={s.photos} title={s.title} />
            {s.items.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="rounded-full border border-border px-4 py-1.5 text-sm">{it}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-4xl">Ceník</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {prices.map((p) => (
              <div key={p.season} className="rounded-sm bg-card p-8 text-center">
                <div className="text-sm uppercase tracking-widest text-muted-foreground">{p.season}</div>
                <div className="mt-3 font-display text-4xl">{p.price}</div>
                <div className="text-sm text-muted-foreground">/ noc</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-10 text-center text-4xl">Kontakt</h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xl font-medium">Monika Bařinová</p>
            <a href="mailto:barinovamonika35@seznam.cz" className="flex items-center gap-3 hover:text-primary"><Mail className="h-4 w-4 text-primary" />barinovamonika35@seznam.cz</a>
            <a href="tel:+420603307568" className="flex items-center gap-3 hover:text-primary"><Phone className="h-4 w-4 text-primary" />603 307 568</a>
            <a href="tel:+420735885725" className="flex items-center gap-3 hover:text-primary"><Phone className="h-4 w-4 text-primary" />735 885 725</a>
            <p className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 text-primary" />Žižkova 134<br />793 26 Vrbno pod Pradědem</p>
          </div>
          <iframe
            title="Mapa"
            src="https://maps.google.com/maps?q=%C5%BDi%C5%BEkova%20134%2C%20Vrbno%20pod%20Prad%C4%9Bdem&z=15&output=embed"
            className="h-72 w-full rounded-sm border-0"
            loading="lazy"
          />
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">Apartmán Relax · Vrbno pod Pradědem</footer>
    </main>
  );
}
