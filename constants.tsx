import React from 'react';
import type { User, Post, Story, Conversation, Message, Community, Notification } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Doe',
  username: 'alexdoe',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  coverUrl: 'https://picsum.photos/seed/cover1/1000/300',
  bio: 'Explorer, developer, and coffee enthusiast. Building cool things and sharing my journey.',
  badges: ['Pioneer', 'Top Contributor', 'Globetrotter'],
  profileCompleteness: 85,
};

export const MOCK_USERS: User[] = [
  MOCK_USER,
  { id: 'u2', name: 'Jane Smith', username: 'janesmith', avatarUrl: 'https://picsum.photos/seed/user2/100/100', badges: [], profileCompleteness: 0 },
  { id: 'u3', name: 'Sam Wilson', username: 'samwilson', avatarUrl: 'https://picsum.photos/seed/user3/100/100', badges: [], profileCompleteness: 0 },
  { id: 'u4', name: 'Maria Garcia', username: 'mariagarcia', avatarUrl: 'https://picsum.photos/seed/user4/100/100', badges: [], profileCompleteness: 0, isPrivate: true },
  { id: 'u5', name: 'Kenji Tanaka', username: 'kenjitanaka', avatarUrl: 'https://picsum.photos/seed/user5/100/100', badges: [], profileCompleteness: 0 },
  { id: 'u6', name: 'Aisha Diallo', username: 'aishadiallo', avatarUrl: 'https://picsum.photos/seed/user6/100/100', badges: [], profileCompleteness: 0 },
  { id: 'u7', name: 'Ethan Carter', username: 'ethancarter', avatarUrl: 'https://picsum.photos/seed/user7/100/100', badges: [], profileCompleteness: 0 },
];

export const MOCK_STORIES: Story[] = MOCK_USERS.map((user, i) => ({
  id: `s${i + 1}`,
  user,
  imageUrl: `https://picsum.photos/seed/story${i}/200/300`,
  viewed: i > 2,
}));

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: MOCK_USERS[1],
    content: '<strong>Just reached the summit!</strong> The view from up here is <em>absolutely breathtaking.</em><br><ul><li>#hiking</li><li>#adventure</li><li>#nature</li></ul>',
    imageUrl: 'https://picsum.photos/seed/post1/600/400',
    likes: 125,
    comments: 23,
    shares: 8,
    timestamp: '2h ago',
  },
  {
    id: 'p2',
    user: MOCK_USERS[2],
    content: 'Spent the weekend building this fun little side project with React and Tailwind. It\'s amazing what you can create in a couple of days!',
    likes: 302,
    comments: 45,
    shares: 15,
    timestamp: '5h ago',
  },
  {
    id: 'p3',
    user: MOCK_USERS[3],
    content: 'My new travel buddy for the trip to Southeast Asia! Any recommendations for must-see places in Vietnam? 🇻🇳',
    imageUrl: 'https://picsum.photos/seed/post3/600/800',
    likes: 543,
    comments: 102,
    shares: 22,
    timestamp: '1d ago',
  },
];

const LAST_MESSAGE: Message = { id: 'm_last', sender: MOCK_USERS[1], text: "Hey, are you free for a call tomorrow?", timestamp: "10:30 AM" }

export const MOCK_CONVERSATIONS: Conversation[] = [
    { id: 'c1', participants: [MOCK_USER, MOCK_USERS[1]], lastMessage: LAST_MESSAGE, unreadCount: 2 },
    { id: 'c2', participants: [MOCK_USER, MOCK_USERS[2]], lastMessage: { ...LAST_MESSAGE, text: 'Sounds good!', sender: MOCK_USER }, unreadCount: 0 },
    { id: 'c3', participants: [MOCK_USER, MOCK_USERS[3]], lastMessage: { ...LAST_MESSAGE, text: 'Check out this link: ...' }, unreadCount: 0 },
    { id: 'c4', participants: [MOCK_USER, MOCK_USERS[4]], lastMessage: { ...LAST_MESSAGE, text: 'Happy birthday!! 🎉' }, unreadCount: 5 },
];

export const MOCK_COMMUNITIES: Community[] = [
    { id: 'comm1', name: 'Tech Enthusiasts', description: 'A vibrant community for tech lovers to discuss the latest gadgets, software, and industry trends.', coverUrl: 'https://picsum.photos/seed/comm1/600/200', memberCount: 12345, isMember: true, members: MOCK_USERS.slice(0,5), posts: MOCK_POSTS.slice(0,2) },
    { id: 'comm2', name: 'Book Club', description: 'Share your favorite reads and discover new authors with fellow bookworms.', coverUrl: 'https://picsum.photos/seed/comm2/600/200', memberCount: 5872, isMember: false, members: MOCK_USERS.slice(2,6), posts: MOCK_POSTS.slice(1,3) },
    { id: 'comm3', name: 'Outdoor Adventures', description: 'For hikers, campers, and nature lovers. Share trails and tips.', coverUrl: 'https://picsum.photos/seed/comm3/600/200', memberCount: 8912, isMember: false, members: MOCK_USERS.slice(1,4), posts: MOCK_POSTS.slice(0,1) },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', user: MOCK_USERS[1], type: 'follow', content: 'started following you.', timestamp: '2d ago', isRead: false },
    { id: 'n2', user: MOCK_USERS[2], type: 'like', content: 'liked your post.', timestamp: '3d ago', isRead: false },
    { id: 'n3', user: MOCK_USERS[3], type: 'comment', content: 'commented on your post: "This looks amazing!"', timestamp: '4d ago', isRead: true },
];

export const JamiiSpotFullLogo: React.FC<{ className?: string }> = ({ className }) => (
    <img 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABjcAAASzCAYAAAC3zQZvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGgAAP+lSURBVHhe7J0FnBRF2sdn9929d+9dlh3ZXXd3sbu7sRsYYLA7sIsIiCCIiIsgIKKAsiCCiLsoiICIiLvo7sR993FmZ7u7O7MLsrs7+f2+5/vO7Mzs7OzuTM/83pnhGceYccYZZ5xxxxl/Hvg/5pwxJxxsxxlnnHGGedSYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/GDbjjDPPGHeeeSAYccYZZ5xxxxn/" 
        alt="JamiiSpot Logo" 
        className={className} 
    />
);


// Icons
export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
export const CompassIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);
export const MessageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.12l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
export const MessageCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
);
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
export const MoreHorizontalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
);
export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);
export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
);
export const BoldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
);
export const ItalicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
);
export const UnderlineIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
);
export const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);
export const ListOrderedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
);
export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);