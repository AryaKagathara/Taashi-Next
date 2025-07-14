// src/app/components/Header.js
"use client"; // Add this directive if not already present

import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/Logo.svg";
import downArrow from '@/../public/images/dropdown-arrow.svg';
import { useState, useEffect } from 'react';

// Ensure you have the correct path to your CSS file
// import "../css/style.css";
// Recommendation: Use CSS Modules or import global styles in app/layout.js
// import styles from './Header.module.css'; // Example for CSS Modules


const Header = () => {

    // This state controls the mobile menu visibility based on the 'slide' class
    const [menuBtn, setMenuBtn] = useState(false);

    // Handler to toggle the mobile menu (used by the hamburger icon button)
    const menuHandler = () => {
      // console.log("Toggling menu, current state:", menuBtn);
      setMenuBtn(!menuBtn);
      // Optional: Add/remove a class to body to prevent background scroll when menu is open
      // if (typeof document !== 'undefined') {
      //    document.body.classList.toggle('no-scroll', !menuBtn);
      // }
    }

    // *** NEW: Handler to CLOSE the mobile menu (used by clicking a navigation link) ***
    const closeMobileMenu = () => {
      // console.log("Link clicked, closing menu.");
      setMenuBtn(false); // Set the state to false to hide the menu
       // Optional: Remove the no-scroll class from body
      // if (typeof document !== 'undefined') {
      //    document.body.classList.remove('no-scroll');
      // }
       // Allow the default Link behavior (scrolling to section) to happen
    };


    // --- Existing unrelated state/effects ---
    // You have an unused isMobileMenuOpen state, you can remove it.
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Remove this line

    // Keep existing languageDropdown state and handler if used elsewhere (not in provided JSX)
    const [languageDropdown, setLanguageDropdown] = useState(false);
    const languageHandler = () => {
      setLanguageDropdown(!languageDropdown);
    }

    // Keep existing scrolling effect if you need to change header style based on scroll
    const [scrolling, setScrolling] = useState(false);
    useEffect(() => {
      // Check if running in browser environment
      if (typeof window === 'undefined') return;

      let lastScroll = 0;

      const handleScroll = () => {
        const currentScroll = window.scrollY;

         // Avoid changing header style based on scroll when mobile menu is open
         // This prevents weird behavior if your CSS transforms the header when 'scrolling' class is applied
         // while the menu is also transformed/positioned by the 'slide' class.
         if (menuBtn) return;


        // Logic to determine if scrolling down (and add 'scrolling' class) or up
        if (currentScroll > lastScroll && currentScroll > 50) { // Added threshold > 50 to avoid flicker at very top
          setScrolling(true); // Add your class for scrolling down
        } else {
          setScrolling(false); // Remove scrolling class (scrolling up or at top)
        }

        lastScroll = currentScroll;
      };

      // Add the scroll listener
      window.addEventListener("scroll", handleScroll);

      // Cleanup the listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };

       // Dependency array: Re-run effect if menuBtn changes so handleScroll captures current state
       // Or, modify handleScroll to not need menuBtn in its closure
       // Adding menuBtn means the listener might be re-attached - subtle difference.
       // A common pattern is to keep the listener static but check a ref for state.
       // Let's keep it simple for now, re-adding is okay if state changes are infrequent.
    }, [menuBtn]); // <-- Added menuBtn as a dependency so the handleScroll callback can see the current menuBtn state


    return (
        <>
            {/* Apply 'scrolling' class based on state (existing logic) */}
            {/* Add a class like 'mobile-menu-open' when the mobile menu is open for distinct header styles */}
            {/* Using 'menuBtn' directly to determine 'mobile-menu-open' class */}
            <header className={`header ${scrolling ? "scrolling" : ""} ${menuBtn ? "mobile-menu-open" : ""}`}> {/* Added conditional class */}
                <div className="header_wrap">
                    <div className="container">
                        <div className="main_header">
                            {/* Logo - Optional: close menu if clicked when open */}
                            <div className="header_logo">
                                <Link href="/" onClick={closeMobileMenu}>
                                    <Image src={Logo} alt="Company Logo" quality={100} priority={true} /> {/* Add priority for LCP */}
                                </Link>
                            </div>

                            {/* Mobile menu toggle button (hamburger icon) */}
                            {/* Add the 'active' class when menuBtn is true */}
                            {/* Add onClick to the menuHandler */}
                            <div className={`menu-toggler ${menuBtn ? 'active' : ''}`} onClick={menuHandler}>
                               {/* Assuming your CSS draws the hamburger lines within menu-toggler-icon */}
                               {/* If you were using an image that switches, you'd swap it here based on menuBtn */}
                               <Image src={downArrow} alt="Comsci Technologies Logo - Design & Development Agency" quality={100} />
                            </div>

                            {/* Navigation Bar - This is the collapsable mobile menu content */}
                            {/* Use menuBtn state to apply the 'slide' class, which your CSS uses to show/hide it */}
                            <div className={`navigation_bar ${menuBtn ? 'slide' : ''}`}>
                                {/* Mobile logo within the slide-in menu - optional to close on click */}
                                <div className="mobile_header_logo">
                                    <Link href="/" onClick={closeMobileMenu}>
                                         <Image src={Logo} alt="Company Mobile Logo" quality={100} priority={true} />
                                    </Link>
                                </div>
                                <div className="navigation_wrap">
                                    <div className="nav-bar">
                                        <ul>
                                            {/* *** Add onClick={closeMobileMenu} to EACH <Link> inside the mobile menu *** */}
                                            <li><Link href="#products" onClick={closeMobileMenu}>Products</Link></li>
                                            <li>
                                                <Link href="#industries" onClick={closeMobileMenu}>Industries</Link>
                                            </li>
                                            <li><Link href="#about" onClick={closeMobileMenu}>About Us</Link></li>
                                            <li><Link href="#delivery" onClick={closeMobileMenu}>Delivery</Link></li>
                                            {/* Add other links similarly */}
                                        </ul>
                                    </div>
                                     {/* Assuming this button is also inside the collapsable mobile menu */}
                                    <div className="header_btn">
                                         {/* *** Add onClick={closeMobileMenu} to the Contact Us button *** */}
                                        <Link href="#contact" className='btn btn-md' onClick={closeMobileMenu}>Contact Us</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;