import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Alert, AlertDescription } from "@/components/ui/alert";

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under Rs 5,000", min: 0, max: 5000 },
  { label: "Rs 5,000 - Rs 10,000", min: 5000, max: 10000 },
  { label: "Rs 10,000 - Rs 15,000", min: 10000, max: 15000 },
  { label: "Above Rs 15,000", min: 15000, max: Infinity },
];

const sortOptions = [
  { label: "Latest", value: "created_at" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "price" },
  { label: "Name A-Z", value: "name" },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [categories, setCategories] = useState(["All"]);

  // Build API parameters
  const apiParams = {
    search: searchTerm || undefined,
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    featured: undefined,
    page: 1,
    limit: 24,
    sort: sortBy,
    order: sortOrder
  };

  const { products, loading, error, pagination, updateParams } = useProducts(apiParams);

  // Update API parameters when filters change
  useEffect(() => {
    const newParams = { ...apiParams };
    
    // Handle price range filtering (client-side for now)
    if (selectedPriceRange !== "All") {
      const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
      if (priceRange) {
        newParams.minPrice = priceRange.min;
        newParams.maxPrice = priceRange.max;
      }
    }

    updateParams(newParams);
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy, sortOrder]);

  // Handle sort order for price
  const handleSortChange = (value: string) => {
    if (value === "price") {
      if (sortBy === "price" && sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortBy("price");
        setSortOrder("asc");
      }
    } else {
      setSortBy(value);
      setSortOrder("desc");
    }
  };

  // Filter products by price range (client-side filtering for price ranges)
  const filteredProducts = products.filter(product => {
    if (selectedPriceRange === "All") return true;
    
    const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
    if (!priceRange) return true;
    
    return product.price >= priceRange.min && product.price <= priceRange.max;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">Design Services</h1>
            <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">
              Professional design solutions with transparent pricing and bidding options.
            </p>
          </div>
        </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== "All" || selectedPriceRange !== "All") && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                Search: {searchTerm} ✕
              </Badge>
            )}
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("All")}>
                Category: {selectedCategory} ✕
              </Badge>
            )}
            {selectedPriceRange !== "All" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedPriceRange("All")}>
                Price: {selectedPriceRange} ✕
              </Badge>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert className="mb-6">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading products...</span>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} service{filteredProducts.length !== 1 ? 's' : ''}
              {pagination && ` of ${pagination.totalItems}`}
            </p>
          </div>
        )}

        {/* Products Grid/List */}
        {!loading && filteredProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent className="p-0">
              <p className="text-muted-foreground text-lg mb-4">No services found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedPriceRange("All");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : !loading && (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-6"
          }>
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard 
                  product={product} 
                  className={viewMode === "list" ? "flex flex-row" : ""}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More (Future Enhancement) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Need something custom? Let's discuss your design needs!
            </p>
            <Button variant="whatsapp" className="mt-4" asChild>
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Designs%2C%20I%20need%20a%20custom%20design%20solution."
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Custom Quote
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
