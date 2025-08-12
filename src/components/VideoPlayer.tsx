import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Share, Download, Flag, Eye, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { videos } from "@/data/videos";

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: number;
    likes: number;
    dislikes: number;
    uploadDate: Date;
    channel: string;
    channelAvatar: string;
    channelSubscribers: number;
    category: string;
    description: string;
    tags: string[];
    embedUrl?: string;
  };
  onBack: () => void;
}

export const VideoPlayer = ({ video, onBack }: VideoPlayerProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatSubscribers = (subs: number) => {
    if (subs >= 1000000) return `${(subs / 1000000).toFixed(1)}M`;
    if (subs >= 1000) return `${(subs / 1000).toFixed(1)}K`;
    return subs.toString();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        ← Back to Videos
      </Button>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
            {video.embedUrl ? (
              <iframe
                width="560"
                height="315"
                src={video.embedUrl}
                className="w-full h-full"
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <img src={video.thumbnail} alt={video.title} className="w-32 h-32 object-cover rounded mb-4 mx-auto" />
                  <p>Video Player</p>
                  <p className="text-sm opacity-70">Duration: {video.duration}</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {video.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {formatViews(video.views)} views
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {formatDistanceToNow(video.uploadDate, { addSuffix: true })}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setLiked(!liked);
                    if (disliked) setDisliked(false);
                  }}
                >
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {formatViews(video.likes + (liked ? 1 : 0))}
                </Button>
                <Button
                  variant={disliked ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setDisliked(!disliked);
                    if (liked) setLiked(false);
                  }}
                >
                  <ThumbsDown className="mr-1 h-4 w-4" />
                  {formatViews(video.dislikes + (disliked ? 1 : 0))}
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Flag className="mr-1 h-4 w-4" />
                  Report
                </Button>
              </div>
            </div>

            {/* Channel Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={video.channelAvatar} 
                      alt={video.channel}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{video.channel}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatSubscribers(video.channelSubscribers)} subscribers
                      </p>
                    </div>
                  </div>
                  <Button>Subscribe</Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{video.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

                  {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Videos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {videos
                .filter(v => 
                  v.id !== video.id && // Don't show current video
                  (v.category === video.category || // Same category
                   v.tags.some(tag => video.tags.includes(tag))) // Has matching tags
                )
                .slice(0, 5) // Only show top 5 related videos
                .map((relatedVideo) => (
                <div 
                  key={relatedVideo.id} 
                  className="flex space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded"
                  onClick={() => onBack() && setTimeout(() => setSelectedVideo(relatedVideo), 0)}
                >
                  <div className="w-24 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={relatedVideo.thumbnail} 
                      alt={relatedVideo.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{relatedVideo.channel}</p>
                    <p className="text-xs text-muted-foreground">{formatViews(relatedVideo.views)} views</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};