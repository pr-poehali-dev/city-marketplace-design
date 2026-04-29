import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  cartCount: number;
  favCount: number;
}

export default function Header({ cartCount, favCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ebebeb]">
      <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#00b4d8] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="white"/>
            </svg>
          </div>
          <div className="leading-none">
            <span className="text-base font-bold text-[#141414] tracking-tight">Всети</span>
            <span className="text-base font-bold text-[#00b4d8] tracking-tight"> города</span>
          </div>
        </div>

        <button className="hidden md:flex items-center gap-1.5 text-sm text-[#6b6b6b] hover:text-[#00b4d8] transition-colors">
          <Icon name="MapPin" size={15} />
          <span>Новосибирск</span>
          <Icon name="ChevronDown" size={13} />
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/catalog" className="text-sm text-[#6b6b6b] hover:text-[#141414] transition-colors font-medium">Каталог</Link>
          {["О платформе", "Контакты"].map((item) => (
            <a key={item} href="#" className="text-sm text-[#6b6b6b] hover:text-[#141414] transition-colors font-medium">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <button className="relative w-10 h-10 rounded-xl hover:bg-[#f5f5f5] transition-colors flex items-center justify-center text-[#6b6b6b] hover:text-[#141414]">
            <Icon name="Heart" size={20} />
            {favCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ff4d6d] rounded-full text-[10px] text-white flex items-center justify-center font-bold leading-none">
                {favCount}
              </span>
            )}
          </button>
          <button className="relative w-10 h-10 rounded-xl hover:bg-[#f5f5f5] transition-colors flex items-center justify-center text-[#6b6b6b] hover:text-[#141414]">
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#00b4d8] rounded-full text-[10px] text-white flex items-center justify-center font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>
          <button className="ml-1 flex items-center gap-2 bg-[#f5f5f5] hover:bg-[#ebebeb] transition-colors rounded-xl px-3 h-10 text-sm font-medium text-[#141414]">
            <Icon name="User" size={16} />
            <span className="hidden sm:inline">Войти</span>
          </button>
        </div>
      </div>
    </header>
  );
}