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


const Footer = () => {

    return (
        <>
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
};

export default Footer;