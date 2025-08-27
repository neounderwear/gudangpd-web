import React from "react";

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 inline-block ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const onlineStores = [
    { name: "Tiktok Shop by Tokopedia", url: "https://www.tiktok.com/@gudangpakaiandalam" },
    { name: "Tokopedia", url: "https://www.tokopedia.com/gudangunderwear" },
    { name: "Shopee", url: "https://shopee.co.id/gudangunderwear4" },
  ];
  const offlineStores = [
    { name: "Jagoan Underwear", url: "https://jagoanunderwear.vercel.app/" },
    { name: "Regino Store", url: "https://reginostore.vercel.app/" },
  ];
  const socialLinks = [
    { name: "TT", url: "https://www.tiktok.com/@gudangpakaiandalam" },
    { name: "IG", url: "https://www.instagram.com/gudangpakaiandalam.katalog/" },
    { name: "FB", url: "https://web.facebook.com/dodi.rostandi.5?mibextid=LQQJ4d&rdid=InsfPAWejPDktIwy&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F8LRCJp3NNF3d39uE%2F%3Fmibextid%3DLQQJ4d&_rdc=1&_rdr#" },
    { name: "YT", url: "www.youtube.com/@officialgudangpakaiandalam" },
  ];

  return (
    <footer className="bg-brand-secondary text-brand-light/70 font-outfit">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h3 className="text-lg font-bold text-white mb-4">Gudang Pakaian Dalam</h3>
            <p className="leading-relaxed">
              Tianseng Komp. Rukan Pangeran Jayakarta Center Blok E2 No. 12
              <br />
              Jl. Pangeran Jayakarta No. 73
              <br />
              Kel. Mangga Dua Selatan, Kec. Sawah Besar
              <br />
              Kota Adm. Jakarta Pusat, 10730
            </p>
            <a
              href="https://maps.app.goo.gl/fukxBhKdCRa6iAgF9"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-block border border-brand-light/50 text-brand-light/90 font-bold py-2 px-4 rounded-md transition-colors duration-300 hover:bg-brand-light hover:text-brand-secondary"
            >
              Lihat Maps
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>

          <div className="md:col-span-2"></div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">Toko Online</h3>
            <ul className="space-y-2">
              {onlineStores.map((store) => (
                <li key={store.name}>
                  <a href={store.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {store.name}
                    <ExternalLinkIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold text-white mb-4">Toko Offline</h3>
            <ul className="space-y-2">
              {offlineStores.map((store) => (
                <li key={store.name}>
                  <a href={store.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {store.name}
                    <ExternalLinkIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-light/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} Gudang Pakaian Dalam</p>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-light/10 hover:bg-brand-light/20 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
