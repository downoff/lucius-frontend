import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto prose prose-invert lg:prose-xl">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: August 1, 2025</p>

                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account (e.g., name, email address). We also collect information automatically when you use our services (e.g., log information).</p>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

                    <h2>3. Information Sharing</h2>
                    <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., with our payment processor, Stripe) or as required by law.</p>
                    
                    <p><em>This is a template. It is strongly recommended that you consult with a legal professional to draft a comprehensive Privacy Policy for your specific business.</em></p>
                </div>
            </main>
            <Footer />
        </div>
    );
}