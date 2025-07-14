"use client"; // Add this directive at the very top

import { useState, useEffect } from 'react'; // Import the useState hook
import Header from './components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from "gsap"; // Import core GSAP
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // Import ScrollTrigger plugin

export default function HomePage() {
  
  useEffect(() => {
    // ** FIX: Register the ScrollTrigger plugin BEFORE using any of its methods **
    // This needs to happen after the plugin is imported but before you call
    // ScrollTrigger.batch(), ScrollTrigger.create(), etc.
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Animation Setup ---
    // Set the initial state for elements with 'fadeInUp' class
    gsap.set(".fadeInUp", { y: "30%", opacity: 0 });

    // Use ScrollTrigger.batch to animate elements as they come into view
    // Apply 'once: true' so the animation doesn't repeat when scrolling back up
    ScrollTrigger.batch(".fadeInUp", {
      onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.5, stagger: 0.2, y: 0 }),
      // Add a start point so it triggers when the element is partially visible
      start: "top 100%", // Triggers when the top of the element enters 80% from the top of the viewport
      once: true, // Ensures the animation only happens once per element
      // markers: true // Uncomment this line temporarily to visualize trigger points
    });

    // --- Locomotive Scroll Setup ---
    // Initialize Locomotive Scroll asynchronously, typically after DOM is ready.
    // Check if 'window' is defined to ensure code only runs client-side.
    (async () => {
      if (typeof window !== 'undefined') {
         try {
           const LocomotiveScroll = (await import('locomotive-scroll')).default;
           const locomotiveScroll = new LocomotiveScroll();

           // NOTE: If you want GSAP's ScrollTrigger to work correctly with
           // Locomotive Scroll, you'll usually need a ScrollTrigger scrollerProxy setup.
           // Your current GSAP/ScrollTrigger usage (.set and .batch on a default scroller)
           // doesn't necessarily *require* it, but if you build more complex interactions
           // that track the scroll progress within the Locomotive container, you'll need it.
           // Example (adjust `scroller` selector if needed):
           /*
           ScrollTrigger.scrollerProxy("body", { // Replace "body" with your LocomotiveScroll container selector if different
               scrollTop(value) {
                   if (arguments.length) {
                       locomotiveScroll.scrollTo(value, {duration: 0, disableLerp: true}); // set scroll position immediately
                   }
                   return locomotiveScroll.scroll.instance.scroll.y; // get current scroll position
               },
               getBoundingClientRect() {
                   return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
               }
           });
           // Call ScrollTrigger.refresh() whenever the layout changes
           ScrollTrigger.refresh();
           */

           // You might want to keep track of the locomotiveScroll instance
           // in a ref or state if you need to call methods like .destroy() later for cleanup.
         } catch (e) {
            console.error("Failed to load or initialize Locomotive Scroll:", e);
         }
      }
    })();

    // --- Cleanup Function ---
    // Important to kill ScrollTrigger instances when the component unmounts
    // to prevent memory leaks and unwanted behavior.
    return () => {
      // Kill all ScrollTrigger instances created by this effect
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // If you kept a reference to locomotiveScroll, destroy it here too.
      // e.g., if you had `const locoscrollRef = useRef(null);` and stored it there.
      // if (locoscrollRef.current) locoscrollRef.current.destroy();
    };

  }, []); // Empty dependency array ensures effect runs only once on mount

  // You also need to ADD the class "fadeInUp" to the elements you want
  // to animate into view using the batch method defined in the useEffect.

  return (
    <>
      {/* Ensure your Header handles necessary props if required, e.g., scrolling */}
      <Header />

      <main className="mt-5 pt-5">
        {/* Hero Section */}
        {/* Add fadeInUp class to the heading */}
        <section className="hero-section text-center pt-5">
          <h1 className="fadeInUp" data-scroll data-scroll-speed=".2" >Innovating Starch for Industrial Performance</h1>
          {/* Add fadeInUp to image */}
          <Image src="/images/Hero.png" className="mt-4 fadeInUp" alt="Industrial buildings" data-scroll data-scroll-speed=".6" />
        </section>

        {/* Products Section */}
        <section className="container products-section py-5" id="products">
          {/* Add fadeInUp class to the section heading */}
          <h2 className="text-center mb-5 fadeInUp">Products</h2>
          <div className="row g-4">
            {/* Add fadeInUp to product items - Adjust as needed, maybe add to each item div or just the main h3 */}
            <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Pasting Gum</h3>
                <ul>
                  <li>T-Past 20</li>
                  <li>T-Past 25</li>
                  <li>T-Past 30</li>
                  <li>T-Past 25S</li>
                  <li>T-Past 25G</li>
                </ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Corrugation Gum</h3>
                <ul>
                  <li>T-Corru (With Chemical)</li>
                  <li>T-Corru (Without Chemical)</li>
                </ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Auto Plant Gum</h3>
                <ul>
                  <li>T Pack 25</li>
                  <li>T Pack 50</li>
                </ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="product-item">
                <h6>Paper Industry</h6>
                <h3>Kraft</h3>
                <ul>
                  <li>Oxidised Starch</li>
                </ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="product-item">
                <h6>Packaging Corrugated Box</h6>
                <h3>Duplex</h3>
                <ul>
                  <li>Oxidised Starch</li>
                  <li>Cationic Starch</li>
                  <li>Spray Starch</li>
                </ul>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="product-item">
                <h6>Gypsum Board</h6>
                <h3>Gypsum Board Starch</h3>
                <ul>
                  <li>T Pack 25</li>
                  <li>T Pack 50</li>
                </ul>
              </div>
            </div>
             <div className="col-12 fadeInUp">
              <div className="product-item">
                <h6>Other</h6>
                <h3>Other Products</h3>
                <ul>
                  <li>White Dextrine</li>
                  <li>Yellow Dextrine</li>
                  <li>Thin Boiling Starch</li>
                  <li>Pregelatinized Starch</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="container industries-section py-5" id="industries">
           {/* Add fadeInUp class to the section heading */}
          <h2 className="text-center mb-5 fadeInUp">Industries Served</h2>
          <div className="row g-4">
             {/* Add fadeInUp to industry items */}
            <div className="col-12 fadeInUp">
              <div className="industry-item package-industry d-flex flex-column flex-md-row py-4">
                <div className="industry-content flex-grow-1 px-4 py-4">
                  <h3>Packaging Corrugated Box</h3>
                  <p>Taashi's starch-based adhesives are essential for pasting and corrugation processes,
                    ensuring strong bonding, high-speed machinability, and durability in carton
                    manufacturing. Our specialized gums support both manual and automatic packaging lines.
                  </p>
                </div>
                <div className="industry-image p-3 p-md-0">
                  <Image src="/images/Box.png" className="img-fluid" alt="Packaging Corrugated Box Example" />
                </div>
              </div>
            </div>
             <div className="col-lg-6 col-12 fadeInUp">
              <div className="industry-item paper-industry py-4">
                <div className="industry-content px-4 py-4">
                  <h3>Paper Industry</h3>
                  <p>Our modified starches improve paper strength, surface sizing, and printability, serving
                    Kraft and duplex paper mills with tailored formulations like oxidized and cationic
                    starch. These enhance fiber bonding, coating uniformity, and ink absorption.</p>
                </div>
                <div className="industry-image">
                  <Image src="/images/Paper.png" className="img-fluid mid" alt="Paper Industry Example" />
                </div>
              </div>
            </div>
             <div className="col-lg-6 col-12 fadeInUp">
              <div className="industry-item gypsum-industry py-4">
                <div className="industry-content px-4 py-4">
                  <h3>Gypsum Board</h3>
                  <p>Taashi's gypsum board starch acts as a core binder and strengthening agent, crucial for
                    maintaining board integrity during production and end-use. It helps improve adhesion
                    between the gypsum core and paper liner.</p>
                </div>
                <div className="industry-image">
                  <Image src="/images/Board.png" className="img-fluid mid" alt="Gypsum Board Example" />
                </div>
              </div>
            </div>
             <div className="col-12 fadeInUp">
              <div className="industry-item other-industry d-flex flex-column flex-md-row py-4">
                <div className="industry-content flex-grow-1 px-4 py-4">
                  <h3>Other Industries</h3>
                  <p>Our specialty starches like dextrines, thin boiling starch, and pregelatinized starch are
                    used in textiles, adhesives, food processing, and foundries for their binding,
                    thickening, and film-forming properties.</p>
                </div>
                <div className="industry-image p-3 p-md-0">
                  <Image src="/images/Tape.png" className="img-fluid" alt="Other Industries Example" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container about-section text-center py-5" id="about">
           {/* Add fadeInUp class to the heading */}
          <h2 className="fadeInUp">Taashi Industries LLP</h2>
           {/* Add fadeInUp to paragraphs - you might want stagger/delay adjusted */}
          <p className="fadeInUp">At Taashi Industries LLP, we specialize in the manufacturing of modified starches and industrial-grade
            adhesives tailored for the needs of packaging, paper, gypsum, and various other industries. Founded with
            a vision to deliver performance-driven and sustainable starch solutions, our company is based in Morbi,
                Gujarat, a thriving industrial hub in India.</p>
          <p className="fadeInUp">With a focus on quality, consistency, and customization, we serve clients across the country and abroad
                who rely on us for reliable bonding agents, sizing chemicals, and specialty starches. Our in-house R&D
                and modern manufacturing plant ensure that every batch meets stringent performance and purity standards.
                Whether it's a corrugated box plant, a duplex paper mill, or a gypsum board facility, Taashi is the
                trusted name behind the bond.</p>
        </section>

        {/* Delivery & Shipping Section */}
        <section className="container delivery-shipping-section py-5" id="delivery">
          {/* Add fadeInUp class to the heading */}
          <h2 className="mb-4 fadeInUp">Delivery & Shipping</h2>
          <div className="row justify-content-start mb-5 fadeInUp"> {/* You can wrap content in fadeInUp */}
            <div className="col-lg-8">
              <p>We deliver our products across India and internationally, ensuring timely dispatch and safe
                transit from our facility in Morbi, Gujarat. Shipping methods and charges depend on the order
                volume and are always discussed in advance for complete transparency.</p>
              <p>We work with trusted logistics partners to ship your order in the most efficient and
                cost-effective way possible.</p>
            </div>
          </div>
           <div className="row g-4">
             {/* Add fadeInUp to delivery options */}
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="delivery-option">
                <Image src="/images/truck-icon.svg" alt="By Road Icon" className="img-fluid mb-3" />
                <h4>By Road</h4>
                <p>We arrange transport via trucks, containerized vehicles, and trailers, with load capacities
                    ranging from 1 to 25 tons, suitable for full truckloads or part-load shipments.</p>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="delivery-option">
                <Image src="/images/train-icon.svg" alt="By Rail Icon" className="img-fluid mb-3" />
                <h4>By Rail</h4>
                <p>For bulk orders, we facilitate dispatch via railway containers and wagons, ensuring
                    cost-effective long-distance delivery.</p>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp">
              <div className="delivery-option">
                <Image src="/images/factory-icon.svg" alt="Pickup Option Icon" className="img-fluid mb-3" />
                <h4>Pickup Option</h4>
                <p className="mb-0">You can also arrange for self-pickup directly from our manufacturing facility:
                </p>
                <p className="address-text mt-1">Survey No. 426P1, Bagathala Khakhrāla Road,<br /> Near Na Morbi,
                    Rajkot, Gujarat — 363641, India</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      {/* Footers are usually static, might not need fadeInUp */}
      <footer className="footer-section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="footer-heading">Order Placement & Inquiries</h2>
              <p className="footer-description">We accept orders and provide consultation through phone, email, or
                WhatsApp. Custom orders and product modifications can be discussed with our team. For detailed
                pricing, please request our product price list.</p>
              <div className="contact-info">
                <Link href="mailto:info@taashi.biz" className="contact-link email-link">info@taashi.biz</Link>
                <Link href="tel:+918000085885" className="contact-link phone-link">+91 800 008 58 85</Link>
                <Link href="tel:+919825623356" className="contact-link phone-link">+91 982 562 33 56</Link>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Content or empty for spacing if design requires */}
            </div>
          </div>
          <div className="row mt-5 footer-bottom">
            <div className="col-md-6 text-center text-md-start">
              <p className="copyright">© 2018 - 2025 Taashi Industries LLC</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="credits">Design & Developed by <a href="https://comsci.tech" target="_blank">Comsci</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}