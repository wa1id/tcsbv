"use client";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
<>
<Navbar />
<Hero/>
<Services/>
<FAQ/>
<CTA/>
<Footer/>
</>
  );
}
