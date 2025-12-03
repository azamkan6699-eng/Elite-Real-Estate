import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';


const blogPosts = [
  {
    id: 1,
    title: "Why DMCC is Emerging as the Crypto & Commodities Bridge",
    excerpt: "Within the heart of Dubai, the Dubai Multi Commodities Centre (DMCC) is transforming commerce. Originally a go...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "November 7, 2025",
    readTime: "5 min read",
    category: "Crypto & Investment"
  },
  {
    id: 2,
    title: "Best Areas to Invest in Dubai 2025: Dubai South Tops the List",
    excerpt: "Why Dubai? A Global Investment Magnet Dubai has certainly established its reputation as one of the most d...",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    author: {
      name: "Tallal Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tallal",
      initials: "TK"
    },
    date: "October 10, 2025",
    readTime: "7 min read",
    category: "Investment Guide"
  },
  {
    id: 3,
    title: "Why 2025 Is the Perfect Year for Singaporean Investors to Back Dubai",
    excerpt: "Dubai's growth is hard to ignore. It has quickly become one of the top places to live and invest in the world...",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 28, 2025",
    readTime: "6 min read",
    category: "International Investment"
  },
  {
    id: 4,
    title: "Tokenized Real Estate: How Chinese Investors Are Betting on Dubai",
    excerpt: "The future of real estate isn't around the corner; it's already unfolding. In May 2025 alone, Dubai recorded o...",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 28, 2025",
    readTime: "8 min read",
    category: "Blockchain & Real Estate"
  },
  {
    id: 5,
    title: "Short term rental profits surge in Dubai for Nigerian investors",
    excerpt: "The splendor of the skyline of Dubai is more than reassuring, opportunities overflow in that place. Those opp...",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 12, 2025",
    readTime: "5 min read",
    category: "Rental Market"
  },
  {
    id: 6,
    title: "Why UK and Gulf Investors Are Flocking to Dubai in 2025",
    excerpt: "Dubai is among the best places to visit in 2025. It has busy streets, thrumming cities, and the highest...",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK"
    },
    date: "August 9, 2025",
    readTime: "6 min read",
    category: "Market Trends"
  }
];

const PropertyDetails = () => {
  const { id } = useParams();

  // Scroll to top whenever component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Our Blog</title>
        <link rel="icon" href="/favicon.png" />

        {/* <!-- SEO Meta --> */}
        <meta name="description"
          content="Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors." />
        <meta name="keywords"
          content="Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments" />
        <meta name="author" content="Sky Elite Real Estate" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:title" content=" Luxurious 3-Bedroom Apartment in Downtown Dubai" />
        <meta property="og:description"
          content="Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elite-real-estate-five.vercel.app/?v=2" />
        <meta property="og:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* <!-- Twitter Card --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sky Elite Real Estate | Dubai Property Investment" />
        <meta name="twitter:description"
          content="Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas." />
        <meta name="twitter:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />

        {/* <!-- Canonical --> */}
        <link rel="canonical" href="https://elite-real-estate-five.vercel.app/?v=2" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="max-w-3xl">
              <h1 className="inline-block pb-3 leading-[1.1] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Our Blog
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Stay updated with the latest insights, trends, and expert analysis on Dubai's real estate market.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  <Link to={`/blog/${post.id}`}>
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {post.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {post.author.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="group/btn" asChild>
                      <Link to={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PropertyDetails;