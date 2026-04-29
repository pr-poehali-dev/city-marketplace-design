import Icon from "@/components/ui/icon";
import { CATEGORIES } from "./data";

interface HeroSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeFilter: "city" | "rf";
  onFilterChange: (filter: "city" | "rf") => void;
  activeCategory: number | null;
  onCategoryChange: (index: number | null) => void;
}

export default function HeroSearch({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activeCategory,
  onCategoryChange,
}: HeroSearchProps) {
  return (
    <>
      {/* HERO SEARCH — gradient */}
      <section
        className="relative pt-14 pb-10 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #00b4d8 0%, #0090ae 40%, #ffd166 100%)" }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-8 left-1/3 w-32 h-32 rounded-full bg-[#ffd166]/20 pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-7">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#ffd166] rounded-full"></span>
              1 240 товаров от местных мастеров
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-tight drop-shadow-sm">
              Покупай у местных —<br/>поддерживай свой город
            </h1>
            <p className="text-white/80 text-base">Товары от лучших производителей и мастеров вашего города</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-0 bg-white rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] border-2 border-white">
              <div className="pl-4 text-[#aaa]">
                <Icon name="Search" size={20} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Мёд, хлеб, керамика, свечи..."
                className="flex-1 px-3 py-4 text-sm outline-none bg-transparent text-[#141414] placeholder:text-[#bbb]"
              />
              <button className="m-1.5 bg-[#ffd166] hover:bg-[#f0b800] transition-colors text-[#141414] font-bold px-6 py-3 rounded-xl text-sm shrink-0 shadow-sm">
                Найти
              </button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={() => onFilterChange("city")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "city"
                  ? "bg-white text-[#00b4d8] shadow-sm"
                  : "bg-white/20 border border-white/40 text-white hover:bg-white/30"
              }`}
            >
              <Icon name="MapPin" size={13} />
              В моём городе
            </button>
            <button
              onClick={() => onFilterChange("rf")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "rf"
                  ? "bg-white text-[#00b4d8] shadow-sm"
                  : "bg-white/20 border border-white/40 text-white hover:bg-white/30"
              }`}
            >
              <Icon name="Truck" size={13} />
              + Поставщики с отправкой в другие регионы
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-5 border-b border-[#ebebeb]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => onCategoryChange(activeCategory === i ? null : i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === i
                    ? "bg-[#00b4d8] text-white shadow-sm"
                    : "bg-[#f5f5f5] text-[#141414] hover:bg-[#00b4d8] hover:text-white border border-transparent"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#6b6b6b] hover:text-[#00b4d8] transition-colors whitespace-nowrap ml-1">
              Все категории
              <Icon name="ChevronRight" size={14} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
