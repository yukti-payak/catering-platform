

"use client";
import { useState, useEffect, useMemo } from "react";
import CatererCard from "@/components/CatererCard";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://caterering-platform.onrender.com/api/caterers")
      .then((res) => res.json())
      .then((data) => {
        setCaterers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

const filteredCaterers = useMemo(() => {
    return caterers.filter((cat) => {
      const matchesName = cat?.name?.toLowerCase().includes(search.toLowerCase()) ?? false;
      const parsedMaxPrice = parseInt(maxPrice, 10);
      const matchesPrice = !maxPrice || (cat?.pricePerPlate && cat.pricePerPlate <= parsedMaxPrice);
      
      return matchesName && matchesPrice;
    });
  }, [caterers, search, maxPrice]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      
      <div className="bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-40"></div>
        
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <header className="text-center">
           <h1 className="text-5xl font-black text-red-900 tracking-tight mb-4">
             Catering <span className="text-red-900">Partners</span> 
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
            Browse trusted catering professionals and choose the perfect match for your celebration.
            </p>
          </header>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
    
        <div className="bg-white/80 backdrop-blur-md p-3 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white flex flex-col md:flex-row gap-3 mb-16">
          <div className="flex-1 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search by caterer name..."
              value={search}
              className="w-full pl-12 pr-5 py-4 rounded-[2rem] bg-slate-50/50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-slate-900 transition-all font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="md:w-72 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
            <input
              type="number"
              placeholder="Max price per plate"
              value={maxPrice}
              className="w-full pl-12 pr-5 py-4 rounded-[2rem] bg-slate-50/50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-slate-900 transition-all font-medium"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Loading Artisans...</p>
          </div>
        ) : filteredCaterers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCaterers.map((cat) => (
              <CatererCard key={cat._id} caterer={cat} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] py-32 text-center border-2 border-dashed border-slate-100 shadow-inner">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-slate-800">No caterers found</h3>
            <p className="text-slate-400 mt-1">Try adjusting your search or price filters.</p>
            <button 
              onClick={() => {setSearch(""); setMaxPrice("");}}
              className="mt-6 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
