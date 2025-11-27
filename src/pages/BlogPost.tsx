import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, Share2, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const blogPosts = [
  {
    id: 1,
    title: "Why DMCC is Emerging as the Crypto & Commodities Bridge",
    excerpt: "Within the heart of Dubai, the Dubai Multi Commodities Centre (DMCC) is transforming commerce. Originally a go...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK",
      bio: "Real estate investment expert with over 10 years of experience in Dubai's property market. Specialized in crypto and blockchain real estate investments."
    },
    date: "November 7, 2025",
    readTime: "5 min read",
    category: "Crypto & Investment",
    content: {
      intro: "Within the heart of Dubai, the Dubai Multi Commodities Centre (DMCC) is transforming commerce. Originally a gold and diamond trading hub, DMCC has evolved into a global business district that bridges traditional commodities with cutting-edge digital assets.",
      sections: [
        {
          heading: "The Evolution of DMCC",
          subheading: "From Traditional to Digital",
          paragraphs: [
            "DMCC has undergone a remarkable transformation over the past decade. What started as a specialized free zone for precious metals and commodities trading has become one of the world's most forward-thinking business districts.",
            "Today, DMCC hosts over 21,000 companies from 170+ countries, making it the world's largest free zone by the number of companies. This diverse ecosystem creates unique opportunities for innovation and collaboration across traditional and digital sectors."
          ]
        },
        {
          heading: "Why Crypto Companies Choose DMCC",
          subheading: "Regulatory Clarity and Infrastructure",
          paragraphs: [
            "The UAE's progressive stance on cryptocurrency regulation has made DMCC an attractive destination for crypto businesses. The Virtual Assets Regulatory Authority (VARA) provides clear guidelines that give companies the confidence to operate and innovate.",
            "DMCC's Crypto Centre, launched in 2021, offers specialized support for blockchain and cryptocurrency companies. From licensing to networking, the centre provides comprehensive services tailored to the unique needs of digital asset businesses.",
            "The infrastructure in DMCC is second to none. High-speed connectivity, state-of-the-art office spaces, and proximity to other financial institutions create an ideal environment for crypto companies to thrive."
          ]
        },
        {
          heading: "Investment Opportunities",
          subheading: "Real Estate Meets Digital Assets",
          paragraphs: [
            "The intersection of real estate and cryptocurrency at DMCC creates fascinating investment opportunities. Properties in the area are increasingly being purchased using digital assets, and some developers are even offering tokenized real estate investments.",
            "Office spaces in DMCC have seen significant appreciation, driven by the influx of high-value crypto and fintech companies. For investors, this represents a unique opportunity to participate in the growth of both physical infrastructure and the digital economy.",
            "The average rental yields in DMCC range from 7-9%, which is attractive compared to many global business districts. Add to this the potential for capital appreciation, and DMCC becomes a compelling investment destination."
          ]
        },
        {
          heading: "The Future Outlook",
          subheading: "What's Next for DMCC",
          paragraphs: [
            "DMCC continues to invest heavily in infrastructure and services. Recent announcements include expansions of the Crypto Centre and new initiatives to attract Web3 and metaverse companies.",
            "The integration of traditional commodities trading with digital assets is just beginning. As blockchain technology matures, we can expect to see more innovative applications that leverage DMCC's unique position at the intersection of these worlds.",
            "For investors and businesses alike, DMCC represents a rare opportunity to be part of a transformation that's reshaping global commerce. Whether you're interested in real estate, commodities, or digital assets, DMCC offers a platform for growth and innovation."
          ]
        }
      ],
      conclusion: "DMCC's evolution from a commodities trading hub to a global crypto and business centre showcases Dubai's vision for the future. As the lines between traditional and digital assets continue to blur, DMCC stands at the forefront of this transformation, offering unprecedented opportunities for forward-thinking investors and businesses."
    }
  },
  {
    id: 2,
    title: "Best Areas to Invest in Dubai 2025: Dubai South Tops the List",
    excerpt: "Why Dubai? A Global Investment Magnet Dubai has certainly established its reputation as one of the most d...",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    author: {
      name: "Tallal Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tallal",
      initials: "TK",
      bio: "Dubai property market analyst focusing on emerging investment opportunities and growth areas."
    },
    date: "October 10, 2025",
    readTime: "7 min read",
    category: "Investment Guide"
  },
  {
    id: 3,
    title: "Why 2025 Is the Perfect Year for Singaporean Investors to Back Dubai",
    excerpt: "Dubai's growth is hard to ignore. It has quickly become one of the top places to live and invest in the world...",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
    author: {
      name: "Muhammad Shahbaz Khan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
      initials: "MSK",
      bio: "Real estate investment expert with over 10 years of experience in Dubai's property market."
    },
    date: "August 28, 2025",
    readTime: "6 min read",
    category: "International Investment"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id)) || blogPosts[0];
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate</title>
        <link rel="icon" href="/favicon.png" />

        {/* SEO Meta */}
        <meta
          name="description"
          content="Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors."
        />
        <meta
          name="keywords"
          content="Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments"
        />
        <meta name="author" content="Sky Elite Real Estate" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Luxurious 3-Bedroom Apartment in Downtown Dubai" />
        <meta
          property="og:description"
          content="Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elite-real-estate-five.vercel.app/?v=2" />
        <meta property="og:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sky Elite Real Estate | Dubai Property Investment" />
        <meta
          name="twitter:description"
          content="Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas."
        />
        <meta name="twitter:image" content="https://elite-real-estate-five.vercel.app/share-image.jpg?v=2" />

        {/* Canonical */}
        <link rel="canonical" href="https://elite-real-estate-five.vercel.app/?v=2" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <article className="flex-1">
          <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
              <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>

              <div className="max-w-4xl">
                <div className="mb-4">
                  <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">Investment Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative sm:w-full md:h-[400px] lg:h-[500px] overflow-hidden px-[28px] sm:px-[97px] ">
            <img src={post.image}
              alt={post.title}
              className="object-cover rounded-md w-[700px] h-[] sm:h-[100%] sm:w-[100%]" />
          </div>

          {/* Article Content */}
          <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              {post.content && (
                <div className="space-y-8">
                  <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
                    {post.content.intro}
                  </p>

                  <Separator className="my-8" />

                  {/* Article Sections */}
                  {post.content.sections.map((section, index) => (
                    <section key={index} className="space-y-6 scroll-mt-24" id={`section-${index}`}>
                      <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {section.heading}
                        </h2>
                        {section.subheading && (
                          <h3 className="text-xl md:text-2xl font-semibold text-muted-foreground">
                            {section.subheading}
                          </h3>
                        )}
                      </div>

                      <div className="space-y-4">
                        {section.paragraphs.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-base md:text-lg leading-relaxed text-foreground/80">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {index < post.content.sections.length - 1 && (
                        <Separator className="my-8" />
                      )}
                    </section>
                  ))}

                  {/* Conclusion */}
                  <div className="bg-muted/50 rounded-lg p-6 md:p-8 border border-border/50 space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      Final Thoughts
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                      {post.content.conclusion}
                    </p>
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <Card className="mt-12 border-2 border-primary/10">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                        {post.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold text-foreground">About {post.author.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {post.author.bio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="bg-muted/30 py-12 md:py-16">
              <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>

                      <CardHeader>
                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>

                      <CardFooter className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{relatedPost.readTime}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group/btn" asChild>
                          <Link to={`/blog/${relatedPost.id}`}>
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
          )}
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
