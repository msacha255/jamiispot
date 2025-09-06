export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  email?: string;
  password?: string;
  coverUrl?: string;
  bio?: string;
  badges: string[];
  profileCompleteness: number;
  isPrivate?: boolean;
  isVerified?: boolean;
  interests?: string[];
  skills?: string[];
  location?: string;
  country?: string;
  showFlag?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  latitude?: number;
  longitude?: number;
  followers?: number;
  following?: number;
  joinDate?: string;
  birthday?: string;
  showBirthday?: boolean;
}

export interface Story {
  id: string;
  user: User;
  type: 'image' | 'video' | 'text';
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
  backgroundColor?: string;
  viewed: boolean;
}

export interface Comment {
    id: string;
    user: User;
    text: string;
    timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  shares: number;
  timestamp: string;
  commentsData: Comment[];
  privacy?: 'public' | 'friends' | 'private';
  scheduledTime?: string;
  location?: string;
  mediaQuality?: 'standard' | 'high';
  isArchived?: boolean;
  tags?: string[];
}

export interface Message {
    id: string;
    sender: User;
    text?: string;
    imageUrl?: string;
    audioUrl?: string;
    timestamp: string;
}

export interface Conversation {
    id: string;
    participants: User[];
    messages: Message[];
    unreadCount: number;
}

export interface Event {
    id: string;
    communityId: string;
    communityName: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    creator: User;
}

export type FeedItem = (Post & { type: 'post' }) | (Event & { type: 'event' });

export interface Community {
    id: string;
    name: string;
    description: string;
    coverUrl: string;
    memberCount: number;
    members: User[];
    posts: Post[];
    events: Event[];
    isMember: boolean;
    category: string;
    privacy: 'public' | 'private';
    admins: string[]; // array of user IDs
}

export interface Notification {
    id: string;
    user: User;
    type: 'like' | 'comment' | 'follow' | 'post';
    content: string;
    timestamp: string;
    isRead: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Permissions {
    camera: boolean;
    location: boolean;
    microphone: boolean;
    notifications: boolean;
}

export interface LoginSession {
    id: string;
    device: string;
    location: string;
    ip: string;
    timestamp: string;
    isCurrent?: boolean;
}

export type View = 'feed' | 'discover' | 'messages' | 'notifications' | 'profile' | 'settings' | 'community-detail' | 'edit-profile' | 'marketplace';