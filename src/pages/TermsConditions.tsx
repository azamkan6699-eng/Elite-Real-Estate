import { Navbar } from '@/components/Navbar'
import React, { useEffect } from 'react'
import { Footer } from '@/components/Footer';
import { useParams } from 'react-router-dom';

export default function TermsConditions() {

    const { id } = useParams();

    // Scroll to top whenever component mounts or route changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);

    return (
        <>
            <div>
                <Navbar />
                <Terms />
                <Footer />

            </div>
        </>

    )
}





function Terms() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground py-16 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Terms &amp; Conditions</h1>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                    Welcome to Our Terms &amp; Conditions
                </h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                    These Terms &amp; Conditions govern your access to and use of our real estate investment platform in the UAE. By accessing our site, booking a consultation, or investing through us, you agree to these terms.
                </p>

                {/* Section 1 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        1. Services We Provide
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        We offer professional consulting and support services for investment in off-plan, secondary, and rental properties across the UAE. Our featured project, StudioX Apartments in Dubai Industrial City by Dugasta Properties, comes with a guaranteed 10% net ROI for 10 years.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        2. Investment Disclaimer
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Real estate investments carry inherent risks. While we provide expert guidance and support throughout the process, we do not offer any financial guarantees beyond what is contractually provided by the property developers. Always perform due diligence before committing.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        3. Consultation &amp; Booking
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        By booking a consultation, you consent to being contacted by our advisors for investment-related discussions. We prioritize personalized assistance based on your goals and preferences.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        4. StudioX Specific Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        StudioX apartments are marketed with high-yield returns, flexible payment plans, and no maintenance fees. Full legal guidance is provided for contracts and ownership transfers. Ensure you read and understand the offer document and payment schedule before investing.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        5. Ownership &amp; Listings
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        If you choose to list your property with us, your ownership details and contact information may be used for listing and resale purposes as authorized by you.
                    </p>
                </div>

                {/* Section 6 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        6. Intellectual Property
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        All branding, website content, images, and marketing materials are owned by our company and may not be reproduced without permission.
                    </p>
                </div>

                {/* Section 7 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        7. Privacy &amp; Data Use
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Your privacy is important to us. We collect personal data only to enhance your experience and will never sell or share your information without consent. Please refer to our{' '}
                        <a href="privacy.html" className="text-blue-600 hover:text-blue-800 underline">
                            Privacy Policy
                        </a>{' '}
                        for more.
                    </p>
                </div>

                {/* Section 8 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        8. Limitation of Liability
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        We are not responsible for any loss, damages, or consequences resulting from decisions made based on information provided through our platform. All services are provided "as-is."
                    </p>
                </div>

                {/* Section 9 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#2a416f] mb-4">
                        9. Changes to Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        We reserve the right to modify these Terms at any time. Updates will be reflected on this page. Continued use of the site implies your acceptance of these updates.
                    </p>
                </div>
            </div>
        </div>
    );
}
