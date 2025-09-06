export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
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
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  viewed: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  imageUrl?: string;
  tags?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

export interface Message {
    id: string;
    sender: User;
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: string;
    participants: User[];
    lastMessage: Message;
    unreadCount: number;
}

export interface Community {
    id: string;
    name: string;
    description: string;
    coverUrl: string;
    memberCount: number;
    members: User[];
    posts: Post[];
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


export type View = 'feed' | 'discover' | 'messages' | 'notifications' | 'profile' | 'settings' | 'community-detail' | 'edit-profile';