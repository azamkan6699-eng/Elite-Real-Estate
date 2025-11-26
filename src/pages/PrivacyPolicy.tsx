import { Navbar } from '@/components/Navbar'
import React, { useEffect } from 'react'
import { Shield, Settings, Share2, Cookie, Lock, UserCheck, RefreshCw } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {

  const { id } = useParams();

  // Scroll to top whenever component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate</title>
      </Helmet>
      <div>
        <Navbar />
        <Privacy />
        <Footer />
      </div>
    </>

  )
}







function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Privacy Policy</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Our Commitment to Your Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          At our UAE-based real estate investment company, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or engage with our services.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <Shield className="text-[#2a416f]" size={28} />
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We collect personal information that you voluntarily provide when you:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Book a consultation or request property investment advice</li>
            <li>Subscribe to newsletters or special offers</li>
            <li>List your property for resale or rental</li>
            <li>Contact our advisors for inquiries</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            This may include your name, phone number, email address, investment preferences, and other relevant data.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <Settings className="text-[#2a416f]" size={28} />
            2. How We Use Your Data
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Your information is used to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Personalize property recommendations and consultations</li>
            <li>Send important updates about your investment process</li>
            <li>Communicate exclusive real estate opportunities</li>
            <li>Enhance our website and services based on user feedback</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            We do not sell or rent your personal data to any third parties.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <Share2 className="text-[#2a416f]" size={28} />
            3. Data Sharing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may share your information with trusted third-party partners such as property developers or legal teams only as required to process your investment or property ownership.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <Cookie className="text-[#2a416f]" size={28} />
            4. Cookies & Analytics
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our website uses cookies to enhance your experience. These cookies help us understand how users interact with the site and allow us to improve content, speed, and usability.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <Lock className="text-[#2a416f]" size={28} />
            5. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We take strong security measures to safeguard your data, including encryption and restricted access to authorized personnel only. Your data is stored securely and handled with utmost confidentiality.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <UserCheck className="text-[#2a416f]" size={28} />
            6. Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, update, or request deletion of your personal data at any time. To make such requests, please contact us via email.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <RefreshCw className="text-[#2a416f]" size={28} />
            7. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Please revisit this page periodically for any updates.
          </p>
        </div>
      </div>
    </div>
  );
}
