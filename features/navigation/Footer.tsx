import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border-light py-12 mt-24 text-text-muted text-[10px] tracking-widest">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          © {new Date().getFullYear()} NGO THI THUY DUYEN. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="/contact" className="hover:text-text-primary transition-colors">INSTAGRAM</Link>
          <Link href="/contact" className="hover:text-text-primary transition-colors">EMAIL</Link>
        </div>
      </div>
    </footer>
  );
}
