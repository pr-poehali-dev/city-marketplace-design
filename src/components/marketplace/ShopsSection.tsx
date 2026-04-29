import Icon from "@/components/ui/icon";
import { SHOPS, PRODUCTS } from "./data";
import ProductCard from "./ProductCard";

export default function ShopsSection() {
  return (
    <>
      {/* SHOPS SECTION */}
      <section className="bg-white py-8 border-b border-[#ebebeb]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#141414]">Магазины вашего города</h2>
              <p className="text-sm text-[#6b6b6b] mt-0.5">Проверенные продавцы из Новосибирска</p>
            </div>
            <button className="text-sm text-[#00b4d8] font-semibold hover:underline flex items-center gap-1">
              Все магазины <Icon name="ChevronRight" size={14} />
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {SHOPS.map((shop) => (
              <button
                key={shop.id}
                className="group flex flex-col items-center gap-2.5 p-3 rounded-2xl border border-[#ebebeb] hover:border-[#00b4d8] hover:shadow-[0_4px_16px_rgba(0,180,216,0.12)] transition-all duration-200 text-center"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl relative shrink-0 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: shop.color }}
                >
                  {shop.avatar}
                  {shop.verified && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00b4d8] rounded-full flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="w-full min-w-0">
                  <div className="text-[11px] font-semibold text-[#141414] leading-tight truncate">{shop.name}</div>
                  <div className="text-[10px] text-[#aaa] mt-0.5">{shop.products} товаров</div>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    <svg width="9" height="9" viewBox="0 0 16 16" fill="#ffd166"><path d="M8 1.2l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.3l-3.6 1.9.7-4L2.2 5.4l4-.6L8 1.2z"/></svg>
                    <span className="text-[10px] font-semibold text-[#141414]">{shop.rating}</span>
                  </div>
                </div>
              </button>
            ))}
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
    </>
  );
}
