import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const PropertyFilters = () => {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="grid gap-4 md:grid-cols-5">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dubai">Dubai</SelectItem>
              <SelectItem value="al-haseen">Al Haseen</SelectItem>
              <SelectItem value="dugasta">Dugasta</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500k">Under AED 500k</SelectItem>
              <SelectItem value="500k-1m">AED 500k - 1M</SelectItem>
              <SelectItem value="1m-5m">AED 1M - 5M</SelectItem>
              <SelectItem value="5m+">Above AED 5M</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3+">3+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>

          <Button className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};
