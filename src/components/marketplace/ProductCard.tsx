import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRODUCTS } from "./data";

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
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

export default function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const [fav, setFav] = useState(product.inFav);
  const [inCart, setInCart] = useState(false);

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,180,216,0.18)] flex flex-col border-t-4 ${product.badge === "city" ? "border-t-[#00b4d8]" : "border-t-[#ffd166]"} border border-[#ebebeb] hover:border-[#00b4d8]`}>
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
