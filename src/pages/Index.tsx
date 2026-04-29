import { useState } from "react";
import Header from "@/components/marketplace/Header";
import HeroSearch from "@/components/marketplace/HeroSearch";
import ShopsSection from "@/components/marketplace/ShopsSection";
import PageFooter from "@/components/marketplace/PageFooter";

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<"city" | "rf">("city");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cartCount] = useState(2);
  const [favCount] = useState(3);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-white font-golos">
      <Header cartCount={cartCount} favCount={favCount} />
      <HeroSearch
        search={search}
        onSearchChange={setSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ShopsSection />
      <PageFooter />
    </div>
  );
}
