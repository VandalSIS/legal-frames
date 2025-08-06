import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Clock, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: number;
    likes: number;
    uploadDate: Date;
    channel: string;
    channelAvatar: string;
    category: string;
    embedUrl?: string;
  };
  onClick: (video: any) => void;
}

export const VideoCard = ({ video, onClick }: VideoCardProps) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video bg-muted">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-primary/90 rounded-full p-3">
              <Play className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
          {video.duration}
        </div>
        <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
          {video.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <img 
            src={video.channelAvatar} 
            alt={video.channel}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm leading-5 mb-1 overflow-hidden" style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">{video.channel}</p>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {formatViews(video.views)}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="mr-1 h-3 w-3" />
                {formatViews(video.likes)}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {formatDistanceToNow(video.uploadDate, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};