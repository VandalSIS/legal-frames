// Generate 1000 sample videos with various categories
const categories = [
  "Music", "Entertainment", "Gaming", "Education", "Technology", "Sports", 
  "Travel", "Food", "Lifestyle", "Art", "Science", "News", "Comedy", "Documentary","Amateur"
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

// Generate videos list with real videos
export const generateVideos = () => {
  // List of real videos
  const videos = [
    {
      id: 'afro-house-1',
      title: 'AFRO HOUSE MIX WITH: Keinamusik, HUGEL, Adam Port',
      thumbnail: 'https://img.youtube.com/vi/0AT-PGwZI3w/maxresdefault.jpg',
      duration: '1:00:00',
      views: 2500000,
      likes: 75000,
      dislikes: 200,
      uploadDate: new Date('2024-02-12'),
      channel: 'Music Mix',
      channelAvatar: '/placeholder.svg',
      channelSubscribers: 1000000,
      category: 'Music',
      description: 'Sunset Set at NOBU Bangkok featuring the best Afro House tracks',
      tags: ['afro house', 'music mix', 'keinamusik', 'hugel', 'adam port', 'sunset set'],
      embedUrl: 'https://www.youtube.com/embed/0AT-PGwZI3w?si=D3Kcv75EeuVKehDn'
    },
    // Add more real videos here
  ];

  // Add the featured videos at the beginning
  const featuredVideos = [
    {
      id: 'featured-1',
      title: 'Busty girlfriend helped cum on her friend\'s ass',
      thumbnail: 'https://pix-cdn77.phncdn.com/c6371/videos/202508/06/18352515/original_18352515.mp4/plain/ex:1:no/bg:0:0:0/rs:fit:320:180/vts:662?hash=pvGMuBH3yo-xRnD3z1v-CwHioLQ=&validto=4891363200',
      duration: '00:15:00',
      views: 2500000,
      likes: 75000,
      dislikes: 200,
      uploadDate: new Date('2024-02-12'),
      channel: 'Amateur',
      channelAvatar: '/placeholder.svg',
      channelSubscribers: 1000000,
      category: 'Music',
      description: 'Enjoy this amazing AFRO HOUSE MIX featuring top artists like KABZA DE SMALL, MAJOR LEAGUE DJZ, UNCLE WAFFLES, and DBN GOGO.',
      tags: ['afro house', 'music mix', 'kabza de small', 'major league djz'],
      embedUrl: 'https://www.pornhub.com/embed/6892ed7b9b471'
    },
    {
      id: 'featured-2',
      title: 'Hot Stepsis Silent Challenge — $1000 on the Line, But I Fucked the Moans Out of Her',
      thumbnail: 'https://pix-cdn77.phncdn.com/c6251/videos/202507/24/17028735/original/01984101-8b41-7839-a127-4ec25b34cf2a.jpg/plain/rs:fit:320:180?hash=skOgRed5WWMFj1OdBmN4txKxvjQ=&validto=4891363200',
      duration: '3:33',
      views: 1200000,
      likes: 85000,
      dislikes: 300,
      uploadDate: new Date('2024-02-12'),
      channel: 'Rick Astley',
      channelAvatar: '/placeholder.svg',
      channelSubscribers: 2000000,
      category: 'Amateur',
      description: 'The classic music video that started it all',
      tags: ['music', 'classic', 'rick astley'],
      embedUrl: 'https://www.pornhub.com/embed/67e59752d2b98'
    }
  ];

  return [...featuredVideos, ...videos];
};

export const videos = generateVideos();


