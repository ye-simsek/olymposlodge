import { type ReactNode } from 'react';
import ClientOnly from '@/components/ClientOnly';
import CookieConsent from '@/components/CookieConsent';
import ChatWidget from '@/components/ChatWidget';
import ScrollReveal from '@/components/ScrollReveal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <ClientOnly>
                <CookieConsent />
                <ChatWidget />
                <ScrollReveal />
            </ClientOnly>
        </>
    );
}
