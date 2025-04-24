export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="px-6 py-4 bg-white border-t border-gray-200">
      <div className="text-center text-gray-500 text-sm">
        © {currentYear} PT Gunung Bara Utama. All rights reserved.
      </div>
    </footer>
  );
}
