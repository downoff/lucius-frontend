import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                 <div className="max-w-3xl mx-auto prose prose-invert lg:prose-xl">
                    <h1>Terms of Service</h1>
                    <p>Last updated: August 1, 2025</p>
                    
                    <h2>1. Introduction</h2>
                    <p>Welcome to Lucius AI ("we," "us," or "our"). By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.</p>

                    <h2>2. Use of Our Services</h2>
                    <p>You must be at least 18 years old to use our services. You are responsible for your account and any activity that occurs through it. You agree to use our services in compliance with all applicable laws.</p>

                    <h2>3. Subscriptions and Payments</h2>
                    <p>Some of our services are offered on a subscription basis. By purchasing a subscription, you agree to pay the specified fees. All payments are handled through our third-party payment processor, Stripe.</p>

                    <h2>4. Termination</h2>
                    <p>We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason, including if you breach these Terms.</p>
                    
                    <p><em>This is a template. It is strongly recommended that you consult with a legal professional to draft a comprehensive Terms of Service agreement for your specific business.</em></p>
                </div>
            </main>
            <Footer />
        </div>
    );
}