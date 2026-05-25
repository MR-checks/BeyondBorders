"use client";
import { destinations } from "@/content/destinations";
import { motion } from "framer-motion";
import Image from "next/image";

const DEST_IMAGES: Record<string, string> = {
  'usa': 'https://images.unsplash.com/photo-1545328805-926d6a0950ca?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0',
  'canada': 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0',
  'uk': 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
  'australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0',
  'turkey': 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
  'germany': 'https://plus.unsplash.com/premium_photo-1661955588369-b0d28de38b45?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0'
};

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 relative inline-block">
            <span className="block text-sm font-sans text-accent tracking-widest uppercase mb-2">Explore the World</span>
            Popular Destinations
          </h2>
          <p className="text-lg text-ink-dim max-w-2xl mx-auto">Where will your next journey take you?</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div 
              key={dest.id}
              className="relative h-80 rounded-2xl overflow-hidden group glass cursor-pointer"
              whileHover={{ y: -8, boxShadow: "0 12px 40px rgb(var(--accent) / 0.28)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Image 
                src={DEST_IMAGES[dest.id]} 
                alt={dest.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" /> 
              <div className="absolute inset-x-4 bottom-4 glass p-4 rounded-xl border-t border-white/20">
                <h3 className="text-xl font-bold text-white drop-shadow-md">{dest.name}</h3>
                <p className="text-sm text-white/90 drop-shadow-sm">{dest.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
