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
}

export interface Notification {
    id: string;
    user: User;
    type: 'like' | 'comment' | 'follow' | 'post';
    content: string;
    timestamp: string;
    isRead: boolean;
}


export type View = 'feed' | 'discover' | 'messages' | 'notifications' | 'profile' | 'settings' | 'community-detail';