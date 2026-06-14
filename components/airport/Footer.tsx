export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold text-base mb-3">Kuwait International Airport</h3>
            <p className="text-white/70">
              General Authority of Civil Aviation<br />
              Kuwait City, Kuwait
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-white/70">
              <li><a href="/en/flights" className="hover:text-white">Flight Movement</a></li>
              <li><a href="/en/services" className="hover:text-white">Centers & Services</a></li>
              <li><a href="/en/complaints" className="hover:text-white">Suggestions & Complaints</a></li>
              <li><a href="/en/media" className="hover:text-white">Media Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Contact</h3>
            <p className="text-white/70">
              Tel: +965 2434 5555<br />
              Email: info@kuwaitairport.gov.kw<br />
              www.kuwaitairport.gov.kw
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-6 pt-4 text-center text-white/50 text-xs">
          © {new Date().getFullYear()} Kuwait International Airport. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
