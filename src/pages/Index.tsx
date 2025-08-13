import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VideoCard } from "@/components/VideoCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { videos } from "@/data/videos";
import { Search, Filter, TrendingUp, Clock, Eye, ThumbsUp, Grid, List } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 24;

  // Handle video selection with routing
  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
    navigate(`/video/${video.id}`, { replace: true });
    window.scrollTo(0, 0);
  };

  // Handle back button
  const handleBack = () => {
    setSelectedVideo(null);
    navigate("/", { replace: true });
  };

  // Load video from URL
  useEffect(() => {
    if (id) {
      const video = videos.find(v => v.id === id);
      if (video) {
        setSelectedVideo(video);
      }
    } else {
      setSelectedVideo(null);
    }
  }, [id]);

  // Update document title and meta tags
  useEffect(() => {
    if (selectedVideo) {
      // For video pages
      document.title = `${selectedVideo.title} - VideoHub`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `Watch ${selectedVideo.title} by ${selectedVideo.channel}. ${selectedVideo.description}`);
      }
      
      // Update keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", `${selectedVideo.tags.join(", ")}, ${selectedVideo.category}, ${selectedVideo.channel}`);
      }

      // Update OpenGraph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');

      if (ogTitle) ogTitle.setAttribute("content", `${selectedVideo.title} - VideoHub`);
      if (ogDesc) ogDesc.setAttribute("content", `Watch ${selectedVideo.title} by ${selectedVideo.channel}. ${selectedVideo.description}`);
      if (ogImage) ogImage.setAttribute("content", selectedVideo.thumbnail);
      if (ogUrl) ogUrl.setAttribute("content", `${window.location.origin}/video/${selectedVideo.id}`);

      // Update Twitter tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');

      if (twitterTitle) twitterTitle.setAttribute("content", `${selectedVideo.title} - VideoHub`);
      if (twitterDesc) twitterDesc.setAttribute("content", `Watch ${selectedVideo.title} by ${selectedVideo.channel}. ${selectedVideo.description}`);
      if (twitterImage) twitterImage.setAttribute("content", selectedVideo.thumbnail);
    } else {
      // For home page
      document.title = "VideoHub - Watch Amazing Videos";
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", "Discover and watch amazing videos on VideoHub. Find music videos, entertainment, gaming content, and more. High-quality streaming platform for all your video needs.");
      }
      
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", "video platform, music videos, entertainment, gaming videos, streaming, online videos, video sharing");
      }

      // Update OpenGraph tags for homepage
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');

      if (ogTitle) ogTitle.setAttribute("content", "VideoHub - Watch Amazing Videos");
      if (ogDesc) ogDesc.setAttribute("content", "Discover and watch amazing videos on VideoHub. High-quality streaming platform for all your video needs.");
      if (ogUrl) ogUrl.setAttribute("content", window.location.origin);
    }
  }, [selectedVideo]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(videos.map(v => v.category)));
    return ["all", ...cats];
  }, []);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Sort videos
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
        break;
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "liked":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "duration":
        filtered.sort((a, b) => {
          const getDurationInSeconds = (duration: string) => {
            const [minutes, seconds] = duration.split(':').map(Number);
            return minutes * 60 + seconds;
          };
          return getDurationInSeconds(b.duration) - getDurationInSeconds(a.duration);
        });
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Paginate videos
  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage;
    return filteredVideos.slice(startIndex, startIndex + videosPerPage);
  }, [filteredVideos, currentPage]);

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  if (selectedVideo) {
    return <VideoPlayer 
      video={selectedVideo} 
      onBack={handleBack}
      setSelectedVideo={handleVideoSelect}
    />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">V</span>
                </div>
                <h1 className="text-xl font-bold">VideoHub</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-foreground hover:text-primary flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Trending</span>
                </a>
                <a href="#" className="text-foreground hover:text-primary">Subscriptions</a>
                <a href="#" className="text-foreground hover:text-primary">Library</a>
                <a href="#" className="text-foreground hover:text-primary">History</a>
              </nav>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button>Upload</Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="liked">Most Liked</SelectItem>
                  <SelectItem value="duration">Longest</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredVideos.length.toLocaleString()} videos
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <main className="container mx-auto px-4 py-6">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No videos found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className={`grid gap-4 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" 
                : "grid-cols-1"
            }`}>
              {paginatedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={setSelectedVideo}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Stats Bar */}
      <div className="border-t bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">1,000+</div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">500M+</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Streaming</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;