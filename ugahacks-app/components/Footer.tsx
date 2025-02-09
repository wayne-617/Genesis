'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <h1>Genesis</h1>
            <hr />
            <nav>
                <a className="link link-hover text-white" onClick={() => router.push('/')}>Home</a>
            </nav>
            <nav>
                <a className="link link-hover text-white" onClick={() => router.push('/pages/about')}>About us</a>
            </nav>
            <nav>
                <h6 className="footer-title">Socials</h6>
                <a className="link link-hover text-white" href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></a>
                <a className="link link-hover text-white" href="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} /></a>
                <a className="link link-hover text-white" href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></a>
                <a className="link link-hover text-white" href="https://www.github.com/"><FontAwesomeIcon icon={faGithub} /></a>
                <a className="link link-hover text-white">Contact</a>
            </nav>
        </footer>
    );
};

export default Navbar;