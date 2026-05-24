"use client";
import { destinations } from "@/content/destinations";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Destinations() {
  // Use a placeholder image for now, user needs to replace these in public/images
  return (
    <section id="destinations" className="py-24 px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Popular Destinations</h2>
          <p className="text-lg text-ink-dim max-w-2xl mx-auto">Where will your next journey take you?</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div 
              key={dest.id}
              className="relative h-80 rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="absolute inset-0 bg-ink/20 group-hover:scale-105 transition-transform duration-700" />
              {/* Note: In real app, put images in public/images/${dest.id}.jpg */}
              <div className="absolute inset-0 bg-accent/10" /> 
              <div className="absolute inset-x-4 bottom-4 glass p-4 rounded-xl">
                <h3 className="text-xl font-bold text-ink">{dest.name}</h3>
                <p className="text-sm text-ink-dim">{dest.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
