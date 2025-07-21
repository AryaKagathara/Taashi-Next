
"use client"; 

import { useState, useEffect } from 'react'; 
import Header from './components/Header';
import Footer from './components/Footer'; 
import Image from 'next/image'; 
import Link from 'next/link';
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; 

export default function HomePage() {
  
  useEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger);
     console.log("ScrollTrigger registered."); 

    gsap.set(".fadeInUp", { y: "30%", opacity: 0 });
     console.log("Initial fadeInUp state set."); 

    ScrollTrigger.batch(".fadeInUp", {
      onEnter: batch => {
        console.log(`Batch .fadeInUp entering view (${batch.length} elements)`); 
        gsap.to(batch, {
          opacity: 1,
          duration: .8,
          delay: 0.5,
          stagger: 0.2,
          y: 0,
          ease: "power2.out" 
         })
      },
      
      start: "top 80%", 
      once: true, 
      
    });
    console.log("ScrollTrigger batch setup complete (using default scroller)."); 

    const initBasicLocomotive = async () => {
      if (typeof window !== 'undefined') {
         try {
           
           const LocomotiveScroll = (await import('locomotive-scroll')).default;
           console.log("Locomotive Scroll module imported."); 

           const locomotiveScroll = new LocomotiveScroll();
           console.log("Locomotive Scroll initialized (basic)."); 

         } catch (e) {
            console.error("Failed to load or initialize basic Locomotive Scroll:", e);
             
         }
      }
    };

     initBasicLocomotive();

    return () => {
       console.log("Running cleanup."); 
       
       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        console.log("ScrollTrigger instances killed."); 

    };

  }, []); 

  return (
    <>
      <Header />
      <main className="mt-5 pt-5">
        <section className="hero-section text-center pt-5" data-scroll> {/* Add data-scroll */}
          <h1 className="fadeInUp" data-scroll data-scroll-speed=".2" >Innovating Starch for Industrial Performance</h1>
          <Image
            src="/images/Hero.webp"
            className="mt-4 fadeInUp"
            alt="Industrial buildings"
            data-scroll
            data-scroll-speed=".6"
            width={800} 
            height={800} 
          />
        </section>

        <section className="container products-section py-5" id="products" data-scroll> {/* Add data-scroll */}
          <h2 className="text-center mb-5 fadeInUp" data-scroll data-scroll-speed=".1">Products</h2> {/* data-scroll-speed optional here */}
          <div className="row g-4">
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

        <section className="container industries-section py-5" id="industries" data-scroll> {/* Add data-scroll */}
          <h2 className="text-center mb-5 fadeInUp" data-scroll data-scroll-speed=".1">Industries Served</h2>
          <div className="row g-4">
            <div className="col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="industry-item package-industry d-flex flex-column flex-md-row py-4">
                <div className="industry-content flex-grow-1 px-4 py-4" data-scroll data-scroll-speed=".05"> {/* Inner parallax */}
                  <h3>Packaging Corrugated Box</h3>
                  <p>Taash&apos;s starch-based adhesives are essential for pasting and corrugation processes, ensuring strong bonding, high-speed machinability, and durability in carton manufacturing. Our specialized gums support both manual and automatic packaging lines.</p>
                </div>
                <div className="industry-image p-3 p-md-0">
                  <Image
                    src="/images/Box.webp"
                    className="img-fluid" 
                    alt="Packaging Corrugated Box Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={500} 
                    height={400} 
                     sizes="(max-width: 768px) 100vw, 50vw" 
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
                  <Image
                    src="/images/Paper.webp"
                    className="" 
                    alt="Paper Industry Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={700} 
                    height={300} 
                     sizes="(max-width: 768px) 100vw, 50vw" 
                  />
                </div>
              </div>
            </div>
             <div className="col-lg-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="industry-item gypsum-industry">
                <div className="industry-content px-4 py-4" data-scroll data-scroll-speed=".05">
                  <h3>Gypsum Board</h3>
                  <p>Taashi&apos;s gypsum board starch acts as a core binder and strengthening agent, crucial for maintaining board integrity during production and end-use. It helps improve adhesion between the gypsum core and paper liner.</p>
                </div>
                <div className="industry-image">
                  <Image
                    src="/images/Board.webp"
                    className="img-fluid mid"
                    alt="Gypsum Board Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={700} 
                    height={300} 
                     sizes="(max-width: 768px) 100vw, 50vw" 
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
                  <Image
                    src="/images/Tape.webp"
                    className=""
                    alt="Other Industries Example"
                    data-scroll
                    data-scroll-speed=".2"
                    width={500} 
                    height={300} 
                     sizes="(max-width: 768px) 100vw, 50vw" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container about-section text-center py-5" id="about" data-scroll> {/* Add data-scroll */}
          <h2 className="fadeInUp" data-scroll data-scroll-speed=".1">Taashi Industries LLP</h2>
          <p className="fadeInUp" data-scroll data-scroll-speed=".05">At Taashi Industries LLP, we specialize in the manufacturing of modified starches and industrial-grade adhesives tailored for the needs of packaging, paper, gypsum, and various other industries. Founded with a vision to deliver performance-driven and sustainable starch solutions, our company is based in Morbi, Gujarat, a thriving industrial hub in India.</p>
          <p className="fadeInUp" data-scroll data-scroll-speed=".05">With a focus on quality, consistency, and customization, we serve clients across the country and abroad who rely on us for reliable bonding agents, sizing chemicals, and specialty starches. Our in-house R&D and modern manufacturing plant ensure that every batch meets stringent performance and purity standards. Whether it&apos;s a corrugated box plant, a duplex paper mill, or a gypsum board facility, Taashi is the trusted name behind the bond.</p>
        </section>

        <section className="container delivery-shipping-section py-5" id="delivery" data-scroll> {/* Add data-scroll */}
          <h2 className="mb-4 fadeInUp" data-scroll data-scroll-speed=".1">Delivery & Shipping</h2>
          <div className="row justify-content-start mb-5 fadeInUp" data-scroll data-scroll-speed=".05">
            <div className="col-lg-8">
              <p>We deliver our products across India and internationally, ensuring timely dispatch and safe transit from our facility in Morbi, Gujarat. Shipping methods and charges depend on the order volume and are always discussed in advance for complete transparency.</p>
              <p>We work with trusted logistics partners to ship your order in the most efficient and cost-effective way possible.</p>
            </div>
          </div>
           <div className="row g-4">
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="delivery-option">
                <Image
                  src="/images/truck-icon.svg"
                  alt="By Road Icon"
                  className="img-fluid mb-3"
                  data-scroll
                  data-scroll-speed=".2"
                   width={300} 
                   height={300} 
                />
                <h4>By Road</h4>
                <p>We arrange transport via trucks, containerized vehicles, and trailers, with load capacities ranging from 1 to 25 tons, suitable for full truckloads or part-load shipments.</p>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="delivery-option">
                <Image
                  src="/images/train-icon.svg"
                  alt="By Rail Icon"
                  className="img-fluid mb-3"
                  data-scroll
                  data-scroll-speed=".2"
                   width={300} 
                   height={300} 
                />
                <h4>By Rail</h4>
                <p>For bulk orders, we facilitate dispatch via railway containers and wagons, ensuring cost-effective long-distance delivery.</p>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-12 fadeInUp" data-scroll data-scroll-speed=".1">
              <div className="delivery-option">
                <Image
                  src="/images/factory-icon.svg"
                  alt="Pickup Option Icon"
                  className="img-fluid mb-3"
                  data-scroll
                  data-scroll-speed=".2"
                   width={300} 
                   height={300} 
                />
                <h4>Pickup Option</h4>
                <p className="mb-0">You can also arrange for self-pickup directly from our manufacturing facility:</p>
                <p className="address-text mt-1">Survey No. 426P1, Bagathala Khakhrāla Road,<br /> Near Na Morbi, Rajkot, Gujarat — 363641, India</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}