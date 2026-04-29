import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "Мёд таёжный цветочный",
    price: 650,
    oldPrice: 800,
    rating: 4.9,
    reviews: 142,
    badge: "city",
    city: "Новосибирске",
    image: "https://cdn.poehali.dev/projects/30e9900d-06e6-4571-878c-34078a0fc414/files/f08a55f9-b6e6-4858-aa68-bce98ed90517.jpg",
    shop: "Пасека Никитиных",
    shopAvatar: "🍯",
    inFav: false,
  },
  {
    id: 2,
    name: "Хлеб «Деревенский» на закваске",
    price: 280,
    oldPrice: null,
    rating: 4.8,
    reviews: 89,
    badge: "rf",
    city: "",
    image: "https://cdn.poehali.dev/projects/30e9900d-06e6-4571-878c-34078a0fc414/files/5ea90587-6bc1-4300-ae95-4c07fbf34c62.jpg",
    shop: "Пекарня «Заквас»",
    shopAvatar: "🍞",
    inFav: true,
  },
  {
    id: 3,
    name: "Керамическая миска ручной работы",
    price: 1200,
    oldPrice: 1500,
    rating: 5.0,
    reviews: 37,
    badge: "city",
    city: "Екатеринбурге",
    image: "https://cdn.poehali.dev/projects/30e9900d-06e6-4571-878c-34078a0fc414/files/252d1ec6-fd5a-46f8-8438-1304e2572bcf.jpg",
    shop: "Мастерская Глины",
    shopAvatar: "🏺",
    inFav: false,
  },
  {
    id: 4,
    name: "Овощи с грядки: томаты и зелень",
    price: 180,
    oldPrice: null,
    rating: 4.7,
    reviews: 215,
    badge: "city",
    city: "Краснодаре",
    image: "https://cdn.poehali.dev/projects/30e9900d-06e6-4571-878c-34078a0fc414/files/52b551fc-7747-4258-a60b-8a638f85df55.jpg",
    shop: "Ферма Солнечная",
    shopAvatar: "🌱",
    inFav: false,
  },
  {
    id: 5,
    name: "Свеча соевая «Лес после дождя»",
    price: 450,
    oldPrice: 600,
    rating: 4.9,
    reviews: 68,
    badge: "rf",
    city: "",
    image: "https://cdn.poehali.dev/projects/30e9900d-06e6-4571-878c-34078a0fc414/files/a92a5327-b3a6-4e89-be10-479d08061f9b.jpg",
    shop: "Candle Studio",
    shopAvatar: "🕯️",
    inFav: true,
  },
  {
    id: 6,
    name: "Кошелёк кожаный ручной выделки",
    price: 2800,
    oldPrice: null,
    rating: 4.8,
    reviews: 54,
    badge: "rf",
    city: "",
    image: "https://cdn.poehali.dev/projects/30e9900d-06e6-4571-878c-34078a0fc414/files/8d550188-c40d-4c29-97a3-bf9479983a3b.jpg",
    shop: "Мастер Кожи",
    shopAvatar: "👜",
    inFav: false,
  },
];

const CATEGORIES = [
  { icon: "🍎", label: "Еда и напитки" },
  { icon: "🌿", label: "Эко-товары" },
  { icon: "🏺", label: "Хендмейд" },
  { icon: "🌸", label: "Красота" },
  { icon: "🏠", label: "Дом и уют" },
];

const REVIEWS = [
  {
    id: 1,
    name: "Ольга М.",
    avatar: "О",
    text: "Заказываю уже третий раз — всё свежее, упаковка аккуратная. Наконец-то платформа, где можно поддержать местных!",
    rating: 5,
    date: "2 дня назад",
  },
  {
    id: 2,
    name: "Андрей К.",
    avatar: "А",
    text: "Нашёл пекаря из своего района. Хлеб лучший в жизни. Рекомендую всем!",
    rating: 5,
    date: "5 дней назад",
  },
  {
    id: 3,
    name: "Марина Д.",
    avatar: "М",
    text: "Отличный сервис, удобный поиск по городу. Купила керамику в подарок — все в восторге.",
    rating: 4,
    date: "1 неделю назад",
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill={star <= Math.round(rating) ? "#ffd166" : "#e0e0e0"}
        >
          <path d="M8 1.2l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.3l-3.6 1.9.7-4L2.2 5.4l4-.6L8 1.2z" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const [fav, setFav] = useState(product.inFav);
  const [inCart, setInCart] = useState(false);

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,180,216,0.18)] flex flex-col border-t-4 ${product.badge === "city" ? "border-t-[#00b4d8]" : "border-t-[#ffd166]"} border border-[#ebebeb] hover:border-[#00b4d8]`}>
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f8f8f8]" style={{ paddingBottom: "72%" }}>
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge === "city" ? (
          <span className="absolute top-3 left-3 bg-[#141414] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full leading-none">
            Только в {product.city}
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-[#ffd166] text-[#141414] text-[11px] font-semibold px-2.5 py-1 rounded-full leading-none">
            Отправка по РФ
          </span>
        )}
        <button
          onClick={() => setFav(!fav)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? "#ff4d6d" : "none"} stroke={fav ? "#ff4d6d" : "#999"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">{product.shopAvatar}</span>
          <span className="text-xs text-[#6b6b6b] truncate">{product.shop}</span>
        </div>
        <h3 className="text-sm font-semibold text-[#141414] leading-snug mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-[#6b6b6b]">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-[#141414]">{product.price.toLocaleString("ru")} ₽</span>
            {product.oldPrice && (
              <span className="text-xs text-[#aaa] line-through ml-1.5">
                {product.oldPrice.toLocaleString("ru")} ₽
              </span>
            )}
          </div>
          <button
            onClick={() => setInCart(!inCart)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              inCart
                ? "bg-[#00b4d8] text-white"
                : "bg-[#f0f9fc] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white"
            }`}
          >
            <Icon name="ShoppingCart" size={13} />
            {inCart ? "В корзине" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<"city" | "rf">("city");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cartCount] = useState(2);
  const [favCount] = useState(3);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-white font-golos">

      {/* HEADER */}
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
            {["Каталог", "О платформе", "Контакты"].map((item) => (
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

      {/* HERO SEARCH — gradient */}
      <section
        className="relative pt-14 pb-10 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #00b4d8 0%, #0090ae 40%, #ffd166 100%)" }}
      >
        {/* Decorative circles */}
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
                onChange={(e) => setSearch(e.target.value)}
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
              onClick={() => setActiveFilter("city")}
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
              onClick={() => setActiveFilter("rf")}
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
                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
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

      {/* PRODUCT GRID */}
      <main className="bg-[#fafafa] py-8">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#141414]">Популярное в городе</h2>
              <p className="text-sm text-[#6b6b6b] mt-0.5">1 240 товаров от местных мастеров и производителей</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-sm text-[#6b6b6b] hover:text-[#141414] px-3 py-2 rounded-lg hover:bg-white transition-all border border-transparent hover:border-[#ebebeb]">
                <Icon name="SlidersHorizontal" size={14} />
                Фильтры
              </button>
              <select className="text-sm text-[#6b6b6b] bg-white border border-[#ebebeb] rounded-lg px-3 py-2 outline-none cursor-pointer hover:border-[#00b4d8] transition-colors">
                <option>По популярности</option>
                <option>Сначала дешевле</option>
                <option>Сначала дороже</option>
                <option>По рейтингу</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="px-8 py-3 border-2 border-[#00b4d8] text-[#00b4d8] font-semibold rounded-xl hover:bg-[#00b4d8] hover:text-white transition-all text-sm">
              Показать ещё
            </button>
          </div>
        </div>
      </main>

      {/* REVIEWS */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, #e0f7fd 0%, #fff9e6 100%)" }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-[#141414] mb-1">Отзывы о платформе</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <StarRating rating={5} size={16} />
                  <span className="text-2xl font-black text-[#141414]">4.8</span>
                </div>
                <span className="text-sm text-[#6b6b6b]">на основе 3 482 отзывов</span>
              </div>
            </div>
            <button className="text-sm text-[#00b4d8] font-medium hover:underline">
              Все отзывы →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-5 border border-white hover:border-[#00b4d8] transition-colors shadow-sm hover:shadow-[0_4px_20px_rgba(0,180,216,0.12)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#00b4d8] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#141414]">{review.name}</div>
                    <div className="text-xs text-[#aaa]">{review.date}</div>
                  </div>
                  <div className="ml-auto">
                    <StarRating rating={review.rating} size={13} />
                  </div>
                </div>
                <p className="text-sm text-[#444] leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-white py-10 border-t border-[#ebebeb]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div
            className="rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #00b4d8 0%, #0090ae 50%, #007a96 100%)" }}
          >
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#ffd166]/20 pointer-events-none" />
            <div className="absolute right-24 bottom-0 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
            <div className="text-white relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-[#ffd166]/30 text-[#ffd166] text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>✦</span> Бесплатно
              </div>
              <h3 className="text-2xl font-black mb-1">Ты — мастер или производитель?</h3>
              <p className="text-white/80 text-sm">Разместите свои товары и начните продавать уже сегодня.</p>
            </div>
            <button className="shrink-0 bg-[#ffd166] hover:bg-[#f0b800] transition-all text-[#141414] font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg hover:shadow-xl relative z-10">
              Стать поставщиком →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-white py-10" style={{ background: "linear-gradient(135deg, #007a96 0%, #005f75 100%)" }}>
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#ffd166] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#141414"/>
                  </svg>
                </div>
                <span className="font-bold text-white">Всети города</span>
              </div>
              <p className="text-sm text-white/50 max-w-[200px]">Локальный маркетплейс — покупай у местных</p>
            </div>

            <div className="flex flex-wrap gap-8">
              {[
                { title: "Покупателям", links: ["Как купить", "Доставка", "Возврат", "Отзывы"] },
                { title: "Продавцам", links: ["Стать поставщиком", "Условия", "Помощь"] },
                { title: "Компания", links: ["О платформе", "Контакты", "Пресса"] },
              ].map((col) => (
                <div key={col.title}>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">{col.title}</div>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">© 2024 Всети города. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Оферта</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}