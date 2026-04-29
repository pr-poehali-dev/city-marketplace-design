import { REVIEWS } from "./data";
import { StarRating } from "./ProductCard";

export default function PageFooter() {
  return (
    <>
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
    </>
  );
}
