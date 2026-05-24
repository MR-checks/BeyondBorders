"use client";
import { testimonials } from "@/content/testimonials";
import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Success Stories</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div 
              key={test.id}
              className="glass p-8 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-ink-dim italic mb-6">"{test.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center font-bold text-accent">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{test.name}</h4>
                  <p className="text-sm text-accent">{test.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
