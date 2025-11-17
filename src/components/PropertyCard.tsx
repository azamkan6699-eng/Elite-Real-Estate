import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Square, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms?: number;
  area: string;
  addedDate: string;
  image: string;
  featured?: boolean;
  roi?: string;
}

export const PropertyCard = ({
  id,
  title,
  location,
  price,
  type,
  bedrooms,
  area,
  addedDate,
  image,
  featured,
  roi,
}: PropertyCardProps) => {
  return (
    <Link to={`/property/${id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <CardHeader className="relative p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-primary text-primary-foreground font-semibold shadow-lg">
              {type}
            </Badge>
            {featured && (
              <Badge className="bg-secondary text-secondary-foreground font-semibold shadow-lg">
                Featured
              </Badge>
            )}
            {roi && (
              <Badge className="bg-accent text-accent-foreground font-semibold shadow-lg">
                ROI {roi}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-bold text-foreground line-clamp-1">
          {title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">{location}</p>
        
        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms} Bed{bedrooms > 1 ? 's' : ''}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{area}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-border px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Added: {addedDate}</span>
        </div>
      </CardFooter>
      </Card>
    </Link>
  );
};
