import Hero from "@/components/Hero";
import StatBand from "@/components/StatBand";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <StatBand />
      <Services />
      <Destinations />
      <Process />
      <Testimonials />
      <Faq />
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 relative inline-block">
            <span className="block text-sm font-sans text-accent tracking-widest uppercase mb-2">Start Your Journey</span>
            Get in Touch
          </h2>
          <p className="text-lg text-ink-dim mb-8">
            Ready to start your journey? Fill out the form or reach out directly.
          </p>
          <div className="space-y-4 text-ink-dim">
            <p><strong>Email:</strong> divebeyondborders@gmail.com</p>
            <p><strong>WhatsApp:</strong> +233 234 567 890</p>
            <p><strong>Location:</strong> <a href="#" className="text-accent hover:underline">California | USA</a></p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
