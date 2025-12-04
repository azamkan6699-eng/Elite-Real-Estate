import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  TrendingUp,
  FileCheck,
  Award,
  Building2,
  DollarSign,
  Percent,
  Home,
  Users,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/rendere/renderer";


export const pageContext = {
  pageMeta: {
    title: "Off-Plan Investments",
    description: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors.",
    keywords: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments",
    author: "Sky Elite Real Estate",
    ogTitle: "Luxurious 3-Bedroom Apartment in Downtown Dubai",
    ogDescription: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns.",
    ogType: "website",
    ogUrl: "https://elite-real-estate-five.vercel.app/?v=2",
    ogImage: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    twitterCard: "summary_large_image",
    twitterTitle: "Sky Elite Real Estate | Dubai Property Investment",
    twitterDescription: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas.",
    twitterImage: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2",
    canonical: "https://elite-real-estate-five.vercel.app/?v=2",
    favicon: "/favicon.png"
  }
}



const AlHaseenResidences = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    budget: "",
    message: ""
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Our investment advisor will contact you shortly.");
    setFormData({ fullName: "", email: "", country: "", budget: "", message: "" });
  };

  const scrollToConsultation = () => {
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageShell pageContext={pageContext}>
        <div className="min-h-screen bg-background">
          <Navbar />

          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary via-primary to-secondary py-20 md:py-32 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="container relative mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="mx-auto max-w-4xl text-center">
                <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Al Haseen Residences by Dugasta Properties
                </Badge>

                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  Off-Plan Investments Built on Compliance, Backed by Real Returns You Trust
                </h1>

                <p className="mb-8 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                  Invest smarter, not harder. Explore Dubai's verified off-plan opportunities offering up to 10% Net ROI for 10 years. Fully escrow-protected, with zero maintenance or service fees.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
                  {[
                    { icon: Shield, text: "RERA-Approved Developer" },
                    { icon: FileCheck, text: "Escrow-Protected Project" },
                    { icon: Percent, text: "Tax-Efficient Investment" },
                    { icon: Award, text: "Golden Visa Eligibility" }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <item.icon className="h-6 w-6" />
                      <span className="text-xs md:text-sm text-center">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={scrollToConsultation}
                    className="bg-white text-primary hover:bg-white/90 text-base font-semibold"
                  >
                    <Phone className="h-5 w-5" />
                    Book Free ROI Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base font-semibold"
                    onClick={() => window.open('https://wa.me/971588273634', '_blank')}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat On WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Where Compliance Meets Performance */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl text-primary">
                  Where Compliance Meets Performance
                </h2>
                <p className="mb-12 text-center text-lg text-muted-foreground max-w-3xl mx-auto">
                  At Sky Elite Real Estate, we guide investors toward verified ROI. Our advisory model filters out speculative projects and focuses on compliance-backed, escrow-secured investments that deliver consistent, long-term gains.
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    {
                      icon: TrendingUp,
                      title: "Foresight-Structured Consulting",
                      description: "Personalized investment strategy aligned with your capital goals through the Sky Elite Foresight Framework."
                    },
                    {
                      icon: CheckCircle2,
                      title: "Verified ROI",
                      description: "Developer-audited and escrow-linked. Every return is backed by contractual agreements."
                    },
                    {
                      icon: FileCheck,
                      title: "Complete Transparency",
                      description: "No hidden fees or vague promises. Clear, verified numbers from day one."
                    }
                  ].map((item, index) => (
                    <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-8 text-center">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-primary">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="space-y-6">
                    <Badge className="bg-secondary text-white">
                      <MapPin className="h-3 w-3 mr-1" />
                      Dubai Industrial City
                    </Badge>
                    <h2 className="text-3xl font-bold md:text-5xl text-primary leading-tight">
                      Dubai's Next Growth Zone
                    </h2>
                    <h3 className="text-2xl font-semibold text-foreground">
                      Off-Plan Apartments By Dugasta Properties
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Strategically located in Dubai Industrial City, minutes away from Al Maktoum International Airport and Dubai South, this off-plan property is built for investors seeking stability and value appreciation.
                    </p>
                    <Button size="lg" onClick={scrollToConsultation} className="mt-4">
                      <Phone className="h-5 w-5" />
                      Book Free ROI Consultation
                    </Button>
                  </div>

                  {/* Right Image Area - Premium Design */}
                  <div className="relative">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 shadow-2xl">
                      {/* Premium placeholder with geometric pattern */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4 p-8">
                          <Building2 className="h-24 w-24 mx-auto text-primary/30" />
                          <p className="text-sm text-muted-foreground font-medium">Premium Property Visual</p>
                        </div>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full"></div>
                    </div>
                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white dark:bg-background border-2 border-primary/20 rounded-2xl p-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">RERA Approved</p>
                          <p className="text-sm font-bold text-primary">Verified Project</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Advantages */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl text-primary">
                  Investment Advantages
                </h2>
                <p className="mb-12 text-center text-xl text-muted-foreground">
                  Numbers That Speak for Themselves
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      icon: Percent,
                      title: "10% Net ROI",
                      description: "Fixed annual return for 10 years.",
                      highlight: true
                    },
                    {
                      icon: DollarSign,
                      title: "Zero Service Charges",
                      description: "No deductions, full yield retained.",
                      highlight: true
                    },
                    {
                      icon: Home,
                      title: "No Maintenance Fee",
                      description: "Zero maintenance fee on the property.",
                      highlight: false
                    },
                    {
                      icon: Users,
                      title: "Fully Managed Property",
                      description: "Developer-run management.",
                      highlight: false
                    }
                  ].map((item, index) => (
                    <Card
                      key={index}
                      className={`border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 ${item.highlight ? 'bg-gradient-to-br from-primary to-secondary text-white' : 'bg-white'
                        }`}
                    >
                      <CardContent className="p-6">
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${item.highlight ? 'bg-white/20' : 'bg-gradient-to-br from-primary to-secondary'
                          }`}>
                          <item.icon className={`h-6 w-6 ${item.highlight ? 'text-white' : 'text-white'}`} />
                        </div>
                        <h3 className={`mb-2 text-xl font-bold ${item.highlight ? 'text-white' : 'text-primary'}`}>
                          {item.title}
                        </h3>
                        <p className={item.highlight ? 'text-white/90' : 'text-muted-foreground'}>
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <Button size="lg" onClick={scrollToConsultation}>
                    <Phone className="h-5 w-5" />
                    Book Free ROI Consultation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl text-primary">
                  How It Works
                </h2>
                <p className="mb-12 text-center text-xl text-muted-foreground">
                  A Simplified, Data-Backed Investment Journey
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    {
                      step: "01",
                      title: "Consultation & Strategy",
                      description: "Align your ROI expectations with verified projects.",
                      icon: Phone
                    },
                    {
                      step: "02",
                      title: "Compliance & Contracting",
                      description: "All transactions pass through RERA-regulated escrow accounts.",
                      icon: FileCheck
                    },
                    {
                      step: "03",
                      title: "Completion & ROI Delivery",
                      description: "Receive your property managed, tenanted, and yielding from day one.",
                      icon: TrendingUp
                    }
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        <CardContent className="p-8">
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white">
                              {item.step}
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                              <item.icon className="h-6 w-6 text-secondary" />
                            </div>
                          </div>
                          <h3 className="mb-3 text-xl font-bold text-primary">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <Button size="lg" onClick={scrollToConsultation}>
                    <Phone className="h-5 w-5" />
                    Book Free ROI Consultation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Project Highlights */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl text-primary">
                  Project Highlights
                </h2>
                <p className="mb-12 text-center text-xl text-muted-foreground">
                  Built for Investors, Designed for End-Users
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    {
                      title: "Residences",
                      icon: Home,
                      features: [
                        "7 Studio Layouts",
                        "Built-in Appliances",
                        "Private Balconies",
                        "Modern Finishes"
                      ]
                    },
                    {
                      title: "Investment Edge",
                      icon: TrendingUp,
                      features: [
                        "Zero Service Fee",
                        "Escrow Protected",
                        "Rental Management Ready",
                        "10-Year ROI Guarantee"
                      ]
                    },
                    {
                      title: "Amenities",
                      icon: Building2,
                      features: [
                        "Infinity Pool",
                        "Modern Gym",
                        "Covered Parking",
                        "24/7 Security"
                      ]
                    }
                  ].map((item, index) => (
                    <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-8">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                          <item.icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-primary">{item.title}</h3>
                        <ul className="space-y-3">
                          {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Consultation Form */}
          <section id="consultation" className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-secondary">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="mx-auto max-w-4xl">
                <div className="text-center text-white mb-12">
                  <Badge className="mb-4 bg-white/20 text-white border-white/30">
                    <Calendar className="h-3 w-3 mr-1" />
                    Book Your Consultation
                  </Badge>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    Your Investment Clarity Starts Here
                  </h2>
                  <p className="text-lg text-white/90">
                    Opportunities like these move fast. Let's discuss your investment goals before this project sells out.
                  </p>
                </div>

                <Card className="border-none shadow-2xl">
                  <CardContent className="p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-foreground">
                            Full Name *
                          </label>
                          <Input
                            id="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="country" className="block mb-2 text-sm font-medium text-foreground">
                            Country *
                          </label>
                          <Input
                            id="country"
                            type="text"
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="United Arab Emirates"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label htmlFor="budget" className="block mb-2 text-sm font-medium text-foreground">
                            Investment Budget *
                          </label>
                          <Input
                            id="budget"
                            type="text"
                            required
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            placeholder="AED 500,000 - 1,000,000"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-foreground">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your investment goals..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 text-base font-semibold"
                      >
                        <Phone className="h-5 w-5" />
                        Send My Investment Brief
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        By submitting, you agree to receive investment updates from Sky Elite Real Estate
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </PageShell>

    </>

  );
};

export default AlHaseenResidences;
