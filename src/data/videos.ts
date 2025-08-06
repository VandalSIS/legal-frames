// Generate 1000 sample videos with various categories
const categories = [
  "Music", "Entertainment", "Gaming", "Education", "Technology", "Sports", 
  "Travel", "Food", "Lifestyle", "Art", "Science", "News", "Comedy", "Documentary"
];

const channels = [
  { name: "TechReview Pro", avatar: "/placeholder.svg", subscribers: 2500000 },
  { name: "Music Vibes", avatar: "/placeholder.svg", subscribers: 1800000 },
  { name: "Gaming Central", avatar: "/placeholder.svg", subscribers: 3200000 },
  { name: "EduStream", avatar: "/placeholder.svg", subscribers: 890000 },
  { name: "Travel Tales", avatar: "/placeholder.svg", subscribers: 1200000 },
  { name: "Food Adventures", avatar: "/placeholder.svg", subscribers: 950000 },
  { name: "Science Daily", avatar: "/placeholder.svg", subscribers: 1500000 },
  { name: "Comedy Club", avatar: "/placeholder.svg", subscribers: 2100000 },
  { name: "Art Gallery", avatar: "/placeholder.svg", subscribers: 680000 },
  { name: "News Network", avatar: "/placeholder.svg", subscribers: 4500000 }
];

const videoTitles = [
  "Amazing Discovery Changes Everything",
  "Top 10 Tips for Beginners",
  "Ultimate Guide to Success",
  "Behind the Scenes Documentary",
  "Epic Compilation 2024",
  "Live Performance Highlights",
  "Tutorial: Master This Skill",
  "Reaction to Viral Video",
  "Deep Dive Analysis",
  "Quick Tips and Tricks",
  "Complete Walkthrough",
  "Expert Interview Session",
  "Breaking News Update",
  "Funny Moments Collection",
  "Technical Review",
  "Creative Process Revealed",
  "Challenge Accepted",
  "Historical Documentary",
  "Future Predictions",
  "Success Story"
];

const descriptions = [
  "In this comprehensive video, we explore the latest developments and provide detailed insights into this fascinating topic. Join us as we break down complex concepts into easy-to-understand explanations.",
  "Welcome to our channel! Today we're bringing you exclusive content that you won't find anywhere else. Make sure to subscribe and hit the notification bell for more amazing videos.",
  "This educational content is designed to help you learn and grow. We've put together expert knowledge and practical examples to create the ultimate learning experience.",
  "Behind-the-scenes footage reveals the incredible amount of work that goes into creating professional content. See what really happens when the cameras stop rolling.",
  "A carefully curated collection of the best moments, highlights, and unforgettable scenes that will keep you entertained from start to finish."
];

const tags = [
  ["tutorial", "beginner", "howto"], 
  ["review", "tech", "gadgets"], 
  ["music", "live", "concert"], 
  ["gaming", "gameplay", "strategy"], 
  ["education", "learning", "tips"], 
  ["travel", "adventure", "explore"], 
  ["food", "cooking", "recipe"], 
  ["comedy", "funny", "entertainment"], 
  ["science", "research", "discovery"], 
  ["news", "current", "update"]
];

// Function to generate random duration
const generateDuration = () => {
  const minutes = Math.floor(Math.random() * 45) + 1;
  const seconds = Math.floor(Math.random() * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Function to generate random date within last 2 years
const generateDate = () => {
  const now = new Date();
  const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
  const randomTime = twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime());
  return new Date(randomTime);
};

// Generate 1000 videos
export const generateVideos = () => {
  const videos = [];
  
  for (let i = 1; i <= 1000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const titleBase = videoTitles[Math.floor(Math.random() * videoTitles.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const videoTags = tags[Math.floor(Math.random() * tags.length)];
    
    const video = {
      id: `video-${i}`,
      title: `${titleBase} ${category === 'Music' ? '(Official Video)' : category === 'Gaming' ? '(Gameplay)' : category === 'Education' ? '(Tutorial)' : ''}`,
      thumbnail: `/placeholder.svg`,
      duration: generateDuration(),
      views: Math.floor(Math.random() * 5000000) + 1000,
      likes: Math.floor(Math.random() * 200000) + 100,
      dislikes: Math.floor(Math.random() * 5000) + 10,
      uploadDate: generateDate(),
      channel: channel.name,
      channelAvatar: channel.avatar,
      channelSubscribers: channel.subscribers,
      category,
      description,
      tags: videoTags,
      // Some videos have embed URLs (sample YouTube embeds for demo)
      embedUrl: i % 10 === 0 ? `https://www.youtube.com/embed/dQw4w9WgXcQ?si=demo${i}` : undefined
    };
    
    videos.push(video);
  }
  
  return videos;
};

export const videos = generateVideos();