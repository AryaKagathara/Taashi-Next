// src/app/page.js

"use client"; // Add this directive at the very top

import { useState, useEffect } from 'react'; // Import the useState hook
import Header from './components/Header';
import Image from 'next/image'; // Keep Image imported
import Link from 'next/link';
import { gsap } from "gsap"; // Import core GSAP
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // Import ScrollTrigger plugin

// Assuming Locomotive Scroll CSS is imported elsewhere, e.g., in app/layout.js or global.css
// import 'locomotive-scroll/dist/locomotive-scroll.css';


export default function HomePage() {
  
  // --- GSAP/ScrollTrigger & Locomotive Scroll Setup (from previous discussions) ---
  // NOTE: Your current useEffect uses basic LocomotiveScroll init and has the
  // ScrollTrigger scrollerProxy commented out. This setup WILL NOT make data-scroll,
  // data-scroll-speed, or the combination of GSAP ScrollTrigger with Locomotive Scroll
  // work correctly together. For that, you NEED the useRef for the container and the
  // ScrollTrigger.scrollerProxy setup demonstrated in my previous detailed answer.
  // The code below ONLY includes the image fix and keeps your *most recent* useEffect
  // structure for demonstration purposes, but be aware the motion/parallax effects
  // relying on data-scroll will likely NOT work fully with this minimal setup.

  useEffect(() => {
    // ** FIX: Register the ScrollTrigger plugin BEFORE using any of its methods **
    gsap.registerPlugin(ScrollTrigger);
     console.log("ScrollTrigger registered."); // Debug log


    // --- GSAP Animation Setup ---
    // Set the initial state for elements with 'fadeInUp' class
    gsap.set(".fadeInUp", { y: "30%", opacity: 0 });
     console.log("Initial fadeInUp state set."); // Debug log


    // Use ScrollTrigger.batch to animate elements as they come into view
    // With the basic Locomotive Scroll setup (commented out proxy), this might
    // revert to using native scroll or behave unexpectedly.
    ScrollTrigger.batch(".fadeInUp", {
      onEnter: batch => {
        console.log(`Batch .fadeInUp entering view (${batch.length} elements)`); // Debug log
        gsap.to(batch, {
          opacity: 1,
          duration: .8,
          delay: 0.5,
          stagger: 0.2,
          y: 0,
          ease: "power2.out" // Add ease for smoother animation
         })
      },
      // Start point for trigger relative to the viewport/scroller
      start: "top 80%", // Adjusted slightly - 100% is the very bottom edge of viewport
      once: true, // Ensures the animation only happens once for each element
      // markers: true, // Uncomment temporarily for visual debugging
       // Note: For compatibility with Locomotive Scroll's smooth scroll, you often need:
       // scroller: "YOUR_LOCOMOTIVE_SCROLL_CONTAINER_SELECTOR_OR_REF",
    });
    console.log("ScrollTrigger batch setup complete (using default scroller)."); // Debug log


    // --- Locomotive Scroll Setup (Basic - Does NOT fully integrate with ScrollTrigger parallax/batch without proxy) ---
    const initBasicLocomotive = async () => {
      if (typeof window !== 'undefined') {
         try {
           // Dynamically import Locomotive Scroll client-side
           const LocomotiveScroll = (await import('locomotive-scroll')).default;
           console.log("Locomotive Scroll module imported."); // Debug log

           // Initialize Locomotive Scroll - default mode, might attach to body/html depending on setup
           // NOTE: This setup may conflict with or not fully utilize ScrollTrigger effects.
           // The recommended integration involves targeting a specific container and using scrollerProxy.
           const locomotiveScroll = new LocomotiveScroll();
           console.log("Locomotive Scroll initialized (basic)."); // Debug log

           // You should store this instance in a ref if you need to destroy it later
           // For this basic example structure, destruction on unmount is more complex without a ref
           // For a proper setup, see previous answer using useRef and proxy + cleanup.

         } catch (e) {
            console.error("Failed to load or initialize basic Locomotive Scroll:", e);
             // Optional: Add a class to body/html indicating error, maybe switch back to native scroll CSS
         }
      }
    };

     // Call the basic init function
     initBasicLocomotive();


    // --- Cleanup Function (Needs adjustment for proper LocoScroll cleanup) ---
    // Without storing the locoScroll instance in a ref, cleaning it up here is difficult
    // in this specific effect structure. The better setup uses a ref.
    return () => {
       console.log("Running cleanup."); // Debug log
       // Kill all ScrollTrigger instances (safely cleans up default scroll triggers)
       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        console.log("ScrollTrigger instances killed."); // Debug log

        // TO PROPERLY CLEANUP LOCOMOTIVE SCROLL:
        // 1. You MUST store the instance in a ref (e.g., locoScrollRef) in the useEffect.
        // 2. In the cleanup, check the ref and call locoScrollRef.current.destroy();
        // If you revert to the useRef + proxy setup from the previous answer, cleanup is correct there.
    };

     // Dependency array: Empty means runs only once on mount and cleans up on unmount.
  }, []); // Empty dependency array


  // --- JSX Structure ---
  // Image dimensions fix involves adding width and height props to Image components.
  // Remember to replace placeholder values with actual image dimensions!

  return (
    <>
      {/* Header - Add logic for closing mobile menu here as per previous answer */}
      <Header />

      {/* Main content area - If using the recommended Locomotive Scroll setup, */}
      {/* this main or a wrapper div would have a ref and data-scroll-container */}
      <main className="mt-5 pt-5">
        {/* Hero Section */}
        <section className="hero-section text-center pt-5" data-scroll> {/* Add data-scroll */}
          {/* fadeInUp, data-scroll-speed, and **FIXED IMAGE PROPS** */}
          <h1 className="fadeInUp" data-scroll data-scroll-speed=".2" >Innovating Starch for Industrial Performance</h1>
          <Image
            src="/images/Hero.png"
            className="mt-4 fadeInUp"
            alt="Industrial buildings"
            data-scroll
            data-scroll-speed=".6"
            width={800} // <<-- Replace with ACTUAL width of Hero.png 
            height={800} // <<-- Replace with ACTUAL height of Hero.png
          />
        </section>

        {/* Products Section */}
        <section className="container products-section py-5" id="products" data-scroll> {/* Add data-scroll */}
          {/* fadeInUp heading */}
          <h2 className="text-center mb-5 fadeInUp" data-scroll data-scroll-speed=".1">Products</h2> {/* data-scroll-speed optional here */}
          <div className="row g-4">
            {/* Product Items - fadeInUp (applied to column) */}
            <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1"> {/* Add data-scroll-speed */}
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Pasting Gum</h3>
                <ul><li>T-Past 20</li><li>T-Past 25</li><li>T-Past 30</li><li>T-Past 25S</li><li>T-Past 25G</li></ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Corrugation Gum</h3>
                <ul><li>T-Corru (With Chemical)</li><li>T-Corru (Without Chemical)</li></ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Auto Plant Gum</h3>
                <ul><li>T Pack 25</li><li>T Pack 50</li></ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="product-item">
                <h6>Paper Industry</h6>
                <h3>Kraft</h3>
                <ul><li>Oxidised Starch</li></ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Duplex</h3>
                <ul><li>Oxidised Starch</li><li>Cationic Starch</li><li>Spray Starch</li></ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="product-item">
                <h6>Gypsum Board</h6>
                <h3>Gypsum Board Starch</h3>
                <ul><li>T Pack 25</li><li>T Pack 50</li></ul>
              </div>
            </div>
             <div className="col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="product-item">
                <h6>Other</h6>
                <h3>Other Products</h3>
                <ul><li>White Dextrine</li><li>Yellow Dextrine</li><li>Thin Boiling Starch</li><li>Pregelatinized Starch</li></ul>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="container industries-section py-5" id="industries" data-scroll> {/* Add data-scroll */}
           {/* Heading */}
          <h2 className="text-center mb-5 fadeInUp" data-scroll data-scroll-speed=".1">Industries Served</h2>
          <div className="row g-4">
             {/* Industry Items */}
            <div className="col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="industry-item package-industry d-flex flex-column flex-md-row py-4">
                <div className="industry-content flex-grow-1 px-4 py-4" data-scroll data-scroll-speed=".05"> {/* Inner parallax */}
                  <h3>Packaging Corrugated Box</h3>
                  {/* Use ' for the apostrophe inside React JSX strings */}
                  <p>Taashi's starch-based adhesives are essential for pasting and corrugation processes, ensuring strong bonding, high-speed machinability, and durability in carton manufacturing. Our specialized gums support both manual and automatic packaging lines.</p>
                </div>
                <div className="industry-image p-3 p-md-0">
                   {/* **FIXED IMAGE PROPS** */}
                  <Image
                    src="/images/Box.png"
                    className="img-fluid" // Assuming Bootstrap's img-fluid (max-width: 100%, height: auto)
                    alt="Packaging Corrugated Box Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={500} // <<-- Replace with ACTUAL width of Box.png
                    height={400} // <<-- Replace with ACTUAL height of Box.png
                     sizes="(max-width: 768px) 100vw, 50vw" // Example responsive sizing hint
                  />
                </div>
              </div>
            </div>
             <div className="col-lg-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="industry-item paper-industry">
                <div className="industry-content px-4 py-4" data-scroll data-scroll-speed=".05">
                  <h3>Paper Industry</h3>
                  <p>Our modified starches improve paper strength, surface sizing, and printability, serving Kraft and duplex paper mills with tailored formulations like oxidized and cationic starch. These enhance fiber bonding, coating uniformity, and ink absorption.</p>
                </div>
                <div className="industry-image">
                   {/* **FIXED IMAGE PROPS** */}
                  <Image
                    src="/images/Paper.png"
                    className="" // mid might be a custom class
                    alt="Paper Industry Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={700} // <<-- Replace with ACTUAL width of Paper.png
                    height={300} // <<-- Replace with ACTUAL height of Paper.png
                     sizes="(max-width: 768px) 100vw, 50vw" // Example responsive sizing hint
                  />
                </div>
              </div>
            </div>
             <div className="col-lg-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="industry-item gypsum-industry">
                <div className="industry-content px-4 py-4" data-scroll data-scroll-speed=".05">
                  <h3>Gypsum Board</h3>
                  <p>Taashi's gypsum board starch acts as a core binder and strengthening agent, crucial for maintaining board integrity during production and end-use. It helps improve adhesion between the gypsum core and paper liner.</p>
                </div>
                <div className="industry-image">
                  {/* **FIXED IMAGE PROPS** */}
                  <Image
                    src="/images/Board.png"
                    className="img-fluid mid"
                    alt="Gypsum Board Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={700} // <<-- Replace with ACTUAL width of Board.png
                    height={300} // <<-- Replace with ACTUAL height of Board.png
                     sizes="(max-width: 768px) 100vw, 50vw" // Example responsive sizing hint
                  />
                </div>
              </div>
            </div>
             <div className="col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="industry-item other-industry d-flex flex-column flex-md-row py-4">
                <div className="industry-content flex-grow-1 px-4 py-4" data-scroll data-scroll-speed=".05">
                  <h3>Other Industries</h3>
                  <p>Our specialty starches like dextrines, thin boiling starch, and pregelatinized starch are used in textiles, adhesives, food processing, and foundries for their binding, thickening, and film-forming properties.</p>
                </div>
                <div className="industry-image p-3 p-md-0">
                   {/* **FIXED IMAGE PROPS** */}
                  <Image
                    src="/images/Tape.png"
                    className=""
                    alt="Other Industries Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={500} // <<-- Replace with ACTUAL width of Tape.png
                    height={300} // <<-- Replace with ACTUAL height of Tape.png
                     sizes="(max-width: 768px) 100vw, 50vw" // Example responsive sizing hint
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container about-section text-center py-5" id="about" data-scroll> {/* Add data-scroll */}
           {/* Heading and paragraphs */}
          <h2 className="fadeInUp" data-scroll data-scroll-speed=".1">Taashi Industries LLP</h2>
          <p className="fadeInUp" data-scroll data-scroll-speed=".05">At Taashi Industries LLP, we specialize in the manufacturing of modified starches and industrial-grade adhesives tailored for the needs of packaging, paper, gypsum, and various other industries. Founded with a vision to deliver performance-driven and sustainable starch solutions, our company is based in Morbi, Gujarat, a thriving industrial hub in India.</p>
          <p className="fadeInUp" data-scroll data-scroll-speed=".05">With a focus on quality, consistency, and customization, we serve clients across the country and abroad who rely on us for reliable bonding agents, sizing chemicals, and specialty starches. Our in-house R&D and modern manufacturing plant ensure that every batch meets stringent performance and purity standards. Whether it's a corrugated box plant, a duplex paper mill, or a gypsum board facility, Taashi is the trusted name behind the bond.</p>
        </section>

        {/* Delivery & Shipping Section */}
        <section className="container delivery-shipping-section py-5" id="delivery" data-scroll> {/* Add data-scroll */}
          {/* Heading */}
          <h2 className="mb-4 fadeInUp" data-scroll data-scroll-speed=".1">Delivery & Shipping</h2>
          <div className="row justify-content-start mb-5 fadeInUp" data-scroll data-scroll-speed=".05">
            <div className="col-lg-8">
              <p>We deliver our products across India and internationally, ensuring timely dispatch and safe transit from our facility in Morbi, Gujarat. Shipping methods and charges depend on the order volume and are always discussed in advance for complete transparency.</p>
              <p>We work with trusted logistics partners to ship your order in the most efficient and cost-effective way possible.</p>
            </div>
          </div>
           <div className="row g-4">
             {/* Delivery options */}
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="delivery-option">
                {/* **FIXED IMAGE PROPS** */}
                <Image
                  src="/images/truck-icon.svg"
                  alt="By Road Icon"
                  className="img-fluid mb-3"
                  data-scroll
                  data-scroll-speed=".2"
                   width={300} // <<-- Replace with ACTUAL width of truck-icon.svg (or desired icon size)
                   height={300} // <<-- Replace with ACTUAL height of truck-icon.svg (or desired icon size)
                />
                <h4>By Road</h4>
                <p>We arrange transport via trucks, containerized vehicles, and trailers, with load capacities ranging from 1 to 25 tons, suitable for full truckloads or part-load shipments.</p>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="delivery-option">
                 {/* **FIXED IMAGE PROPS** */}
                <Image
                  src="/images/train-icon.svg"
                  alt="By Rail Icon"
                  className="img-fluid mb-3"
                  data-scroll
                  data-scroll-speed=".2"
                   width={300} // <<-- Replace with ACTUAL width of train-icon.svg (or desired icon size)
                   height={300} // <<-- Replace with ACTUAL height of train-icon.svg (or desired icon size)
                />
                <h4>By Rail</h4>
                <p>For bulk orders, we facilitate dispatch via railway containers and wagons, ensuring cost-effective long-distance delivery.</p>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="delivery-option">
                 {/* **FIXED IMAGE PROPS** */}
                <Image
                  src="/images/factory-icon.svg"
                  alt="Pickup Option Icon"
                  className="img-fluid mb-3"
                  data-scroll
                  data-scroll-speed=".2"
                   width={300} // <<-- Replace with ACTUAL width of factory-icon.svg (or desired icon size)
                   height={300} // <<-- Replace with ACTUAL height of factory-icon.svg (or desired icon size)
                />
                <h4>Pickup Option</h4>
                <p className="mb-0">You can also arrange for self-pickup directly from our manufacturing facility:</p>
                <p className="address-text mt-1">Survey No. 426P1, Bagathala Khakhrāla Road,<br /> Near Na Morbi, Rajkot, Gujarat — 363641, India</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section - Assumed to be outside the Loco Scroll area if any */}
      <footer className="footer-section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="footer-heading">Order Placement & Inquiries</h2>
              <p className="footer-description">We accept orders and provide consultation through phone, email, or WhatsApp. Custom orders and product modifications can be discussed with our team. For detailed pricing, please request our product price list.</p>
              <div className="contact-info">
                <Link href="mailto:info@taashi.biz" className="contact-link email-link">info@taashi.biz</Link>
                <Link href="tel:+918000085885" className="contact-link phone-link">+91 800 008 58 85</Link>
                <Link href="tel:+919825623356" className="contact-link phone-link">+91 982 562 33 56</Link>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Content or empty for spacing */}
            </div>
          </div>
          <div className="row mt-5 footer-bottom">
            <div className="col-md-6 text-center text-md-start">
              <p className="copyright">© 2018 - 2025 Taashi Industries LLC</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="credits">Design & Developed by <a href="https://comsci.tech" target="_blank">Comsci</a></p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}