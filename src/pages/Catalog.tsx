import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/marketplace/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/components/marketplace/data";

const SHOPS_FILTER = [
  "Пасека Никитиных",
  "Пекарня «Заквас»",
  "Мастерская Глины",
  "Ферма Солнечная",
  "Candle Studio",
  "Мастер Кожи",
];

const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "rating", label: "По рейтингу" },
];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeDelivery, setActiveDelivery] = useState<"all" | "city" | "rf">("all");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedShops, setSelectedShops] = useState<string[]>([]);
  const [onlyWithDiscount, setOnlyWithDiscount] = useState(false);
  const [sort, setSort] = useState("popular");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleShop = (name: string) => {
    setSelectedShops((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const resetFilters = () => {
    setActiveCategory(null);
    setActiveDelivery("all");
    setPriceFrom("");
    setPriceTo("");
    setMinRating(null);
    setSelectedShops([]);
    setOnlyWithDiscount(false);
    setSearch("");
  };

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeDelivery !== "all") {
      result = result.filter((p) => p.badge === activeDelivery);
    }
    if (priceFrom !== "") {
      result = result.filter((p) => p.price >= Number(priceFrom));
    }
    if (priceTo !== "") {
      result = result.filter((p) => p.price <= Number(priceTo));
    }
    if (minRating !== null) {
      result = result.filter((p) => p.rating >= minRating);
    }
    if (selectedShops.length > 0) {
      result = result.filter((p) => selectedShops.includes(p.shop));
    }
    if (onlyWithDiscount) {
      result = result.filter((p) => p.oldPrice !== null);
    }

    if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, activeDelivery, priceFrom, priceTo, minRating, selectedShops, onlyWithDiscount, sort]);

  const activeFiltersCount = [
    activeCategory !== null,
    activeDelivery !== "all",
    priceFrom !== "",
    priceTo !== "",
    minRating !== null,
    selectedShops.length > 0,
    onlyWithDiscount,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white font-golos">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#ebebeb]">
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#00b4d8] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="white"/>
              </svg>
            </div>
            <div className="leading-none">
              <span className="text-base font-bold text-[#141414] tracking-tight">Всети</span>
              <span className="text-base font-bold text-[#00b4d8] tracking-tight"> города</span>
            </div>
          </Link>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm text-[#6b6b6b]">
            <Link to="/" className="hover:text-[#00b4d8] transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-[#141414] font-medium">Каталог</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md ml-auto">
            <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-xl px-3 py-2.5">
              <Icon name="Search" size={16} className="text-[#aaa] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по каталогу..."
                className="flex-1 bg-transparent text-sm outline-none text-[#141414] placeholder:text-[#bbb]"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-[#aaa] hover:text-[#666]">
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="relative w-10 h-10 rounded-xl hover:bg-[#f5f5f5] transition-colors flex items-center justify-center text-[#6b6b6b]">
              <Icon name="Heart" size={20} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ff4d6d] rounded-full text-[10px] text-white flex items-center justify-center font-bold leading-none">3</span>
            </button>
            <button className="relative w-10 h-10 rounded-xl hover:bg-[#f5f5f5] transition-colors flex items-center justify-center text-[#6b6b6b]">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#00b4d8] rounded-full text-[10px] text-white flex items-center justify-center font-bold leading-none">2</span>
            </button>
            <button className="ml-1 flex items-center gap-2 bg-[#f5f5f5] hover:bg-[#ebebeb] transition-colors rounded-xl px-3 h-10 text-sm font-medium text-[#141414]">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Войти</span>
            </button>
          </div>
        </div>
      </header>

      {/* CATEGORY STRIP */}
      <div className="bg-white border-b border-[#ebebeb] py-3">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === null
                  ? "bg-[#00b4d8] text-white"
                  : "bg-[#f5f5f5] text-[#141414] hover:bg-[#ebebeb]"
              }`}
            >
              Все
            </button>
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === i
                    ? "bg-[#00b4d8] text-white"
                    : "bg-[#f5f5f5] text-[#141414] hover:bg-[#ebebeb]"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1360px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* SIDEBAR */}
          {sidebarOpen && (
            <aside className="w-64 shrink-0 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#141414] text-sm flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={15} />
                  Фильтры
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-[#00b4d8] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{activeFiltersCount}</span>
                  )}
                </span>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-xs text-[#00b4d8] hover:underline font-medium">
                    Сбросить
                  </button>
                )}
              </div>

              {/* Delivery */}
              <div className="bg-[#fafafa] rounded-2xl p-4 space-y-2">
                <div className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider mb-3">Доставка</div>
                {[
                  { value: "all", label: "Все товары", icon: "📦" },
                  { value: "city", label: "В моём городе", icon: "📍" },
                  { value: "rf", label: "По всей России", icon: "🚚" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setActiveDelivery(opt.value as "all" | "city" | "rf")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                      activeDelivery === opt.value
                        ? "bg-[#00b4d8] text-white"
                        : "hover:bg-white text-[#141414]"
                    }`}
                  >
                    <span>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Price range */}
              <div className="bg-[#fafafa] rounded-2xl p-4">
                <div className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider mb-3">Цена, ₽</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    placeholder="от"
                    className="w-full bg-white border border-[#ebebeb] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00b4d8] transition-colors"
                  />
                  <span className="text-[#aaa] text-sm shrink-0">—</span>
                  <input
                    type="number"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    placeholder="до"
                    className="w-full bg-white border border-[#ebebeb] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00b4d8] transition-colors"
                  />
                </div>
                {/* Quick presets */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[["до 500", "", "500"], ["500–1000", "500", "1000"], ["от 1000", "1000", ""]].map(([label, from, to]) => (
                    <button
                      key={label}
                      onClick={() => { setPriceFrom(from); setPriceTo(to); }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-[#ebebeb] text-[#6b6b6b] hover:border-[#00b4d8] hover:text-[#00b4d8] transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="bg-[#fafafa] rounded-2xl p-4">
                <div className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider mb-3">Рейтинг</div>
                <div className="space-y-1.5">
                  {[5, 4, 3].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(minRating === r ? null : r)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                        minRating === r
                          ? "bg-[#00b4d8] text-white"
                          : "hover:bg-white text-[#141414]"
                      }`}
                    >
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <svg key={s} width="12" height="12" viewBox="0 0 16 16" fill={s <= r ? "#ffd166" : (minRating === r ? "rgba(255,255,255,0.3)" : "#e0e0e0")}>
                            <path d="M8 1.2l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.3l-3.6 1.9.7-4L2.2 5.4l4-.6L8 1.2z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs font-medium">от {r}.0</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shops */}
              <div className="bg-[#fafafa] rounded-2xl p-4">
                <div className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider mb-3">Магазин</div>
                <div className="space-y-1.5">
                  {SHOPS_FILTER.map((name) => (
                    <label key={name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white transition-colors cursor-pointer">
                      <div
                        onClick={() => toggleShop(name)}
                        className={`w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 cursor-pointer transition-all ${
                          selectedShops.includes(name)
                            ? "bg-[#00b4d8] border-[#00b4d8]"
                            : "border-[#d0d0d0] bg-white"
                        }`}
                      >
                        {selectedShops.includes(name) && (
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-[#141414]">{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount toggle */}
              <div className="bg-[#fafafa] rounded-2xl p-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-[#141414]">Только со скидкой</span>
                  <div
                    onClick={() => setOnlyWithDiscount(!onlyWithDiscount)}
                    className={`w-10 h-6 rounded-full transition-all relative cursor-pointer ${
                      onlyWithDiscount ? "bg-[#00b4d8]" : "bg-[#d0d0d0]"
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${onlyWithDiscount ? "left-5" : "left-1"}`} />
                  </div>
                </label>
              </div>
            </aside>
          )}

          {/* CONTENT */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#6b6b6b] hover:text-[#141414] transition-colors px-3 py-2 rounded-xl hover:bg-[#f5f5f5]"
                >
                  <Icon name={sidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={16} />
                  {sidebarOpen ? "Скрыть" : "Фильтры"}
                </button>
                <div className="text-sm text-[#6b6b6b]">
                  Найдено: <span className="font-semibold text-[#141414]">{filtered.length}</span> товаров
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6b6b6b] hidden sm:inline">Сортировка:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm text-[#141414] bg-white border border-[#ebebeb] rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-[#00b4d8] transition-colors font-medium"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter pills */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeDelivery !== "all" && (
                  <span className="flex items-center gap-1.5 bg-[#e0f7fd] text-[#007a96] text-xs font-medium px-3 py-1.5 rounded-full">
                    {activeDelivery === "city" ? "В городе" : "По РФ"}
                    <button onClick={() => setActiveDelivery("all")}><Icon name="X" size={11} /></button>
                  </span>
                )}
                {(priceFrom || priceTo) && (
                  <span className="flex items-center gap-1.5 bg-[#e0f7fd] text-[#007a96] text-xs font-medium px-3 py-1.5 rounded-full">
                    {priceFrom && `от ${priceFrom} ₽`}{priceFrom && priceTo && " "}{priceTo && `до ${priceTo} ₽`}
                    <button onClick={() => { setPriceFrom(""); setPriceTo(""); }}><Icon name="X" size={11} /></button>
                  </span>
                )}
                {minRating !== null && (
                  <span className="flex items-center gap-1.5 bg-[#e0f7fd] text-[#007a96] text-xs font-medium px-3 py-1.5 rounded-full">
                    от {minRating}★
                    <button onClick={() => setMinRating(null)}><Icon name="X" size={11} /></button>
                  </span>
                )}
                {selectedShops.map((s) => (
                  <span key={s} className="flex items-center gap-1.5 bg-[#e0f7fd] text-[#007a96] text-xs font-medium px-3 py-1.5 rounded-full">
                    {s}
                    <button onClick={() => toggleShop(s)}><Icon name="X" size={11} /></button>
                  </span>
                ))}
                {onlyWithDiscount && (
                  <span className="flex items-center gap-1.5 bg-[#e0f7fd] text-[#007a96] text-xs font-medium px-3 py-1.5 rounded-full">
                    Со скидкой
                    <button onClick={() => setOnlyWithDiscount(false)}><Icon name="X" size={11} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className={`grid gap-4 ${sidebarOpen ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <div className="text-lg font-bold text-[#141414] mb-2">Ничего не найдено</div>
                <div className="text-sm text-[#6b6b6b] mb-6">Попробуйте изменить фильтры или поисковый запрос</div>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#00b4d8] text-white text-sm font-semibold rounded-xl hover:bg-[#0090ae] transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}

            {filtered.length > 0 && (
              <div className="text-center mt-10">
                <button className="px-8 py-3 border-2 border-[#00b4d8] text-[#00b4d8] font-semibold rounded-xl hover:bg-[#00b4d8] hover:text-white transition-all text-sm">
                  Показать ещё
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
