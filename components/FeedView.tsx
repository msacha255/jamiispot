import React from 'react';
import type { Story, Post, User, FeedItem, Event } from '../types';
import { HeartIcon, MessageCircleIcon, ShareIcon, PlusIcon, CalendarIcon, MapPinIcon, MoreHorizontalIcon, ArchiveIcon, EditIcon } from '../constants';

const ParsedContent: React.FC<{ content: string, onHashtagClick: (hashtag: string) => void }> = ({ content, onHashtagClick }) => {
    const parts = content.split(/(#\w+)/g);
    return (
        <p>
            {parts.map((part, index) => {
                if (part.startsWith('#')) {
                    return (
                        <a key={index} href="#" onClick={(e) => { e.preventDefault(); onHashtagClick(part); }} className="text-accent font-semibold hover:underline">
                            {part}
                        </a>
                    );
                }
                return <span key={index} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br />') }}></span>;
            })}
        </p>
    );
};


interface PostCardProps {
  post: Post;
  currentUser: User;
  onOpenProfileModal: (user: User) => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenSharePost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  likedPostIds: Set<string>;
  onToggleArchive: (postId: string) => void;
  onHashtagClick: (hashtag: string) => void;
  onOpenEditPost: (post: Post) => void;
}

interface EventCardProps {
  event: Event;
  onCommunitySelect: (id: string) => void;
  onOpenProfileModal: (user: User) => void;
  onOpenEventDetail: (event: Event) => void;
}

interface FeedViewProps {
  feedItems: FeedItem[];
  stories: Story[];
  currentUser: User;
  onOpenCreatePost: () => void;
  onOpenCreateStory: () => void;
  onOpenProfileModal: (user: User) => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenSharePost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  likedPostIds: Set<string>;
  onCommunitySelect: (id: string) => void;
  onToggleArchive: (postId: string) => void;
  onHashtagClick: (hashtag: string) => void;
  onOpenEventDetail: (event: Event) => void;
  onOpenEditPost: (post: Post) => void;
}

const CreatePostTrigger: React.FC<{ user: User, onClick: () => void }> = ({ user, onClick }) => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
    <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
    <button 
      onClick={onClick}
      className="flex-1 text-left bg-light-gray dark:bg-zinc-700 border-none rounded-lg p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
    >
      {`What's on your mind, ${user.name.split(' ')[0]}?`}
    </button>
    <button 
      onClick={onClick}
      className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm hidden sm:block">
      Post
    </button>
  </div>
);

const Stories: React.FC<{ stories: Story[], onAdd: () => void, onOpenProfileModal: (user: User) => void }> = ({ stories, onAdd, onOpenProfileModal }) => (
  <div className="mb-6">
    <div className="flex space-x-4 overflow-x-auto pb-4">
      <div className="flex-shrink-0 text-center w-20">
        <button 
          onClick={onAdd}
          className="w-16 h-16 rounded-full bg-white dark:bg-zinc-700 border-2 border-dashed border-gray-400 dark:border-zinc-500 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition">
          <PlusIcon className="w-8 h-8"/>
        </button>
        <p className="text-xs mt-2 font-medium">Add Story</p>
      </div>
      {stories.map(story => (
        <div key={story.id} className="flex-shrink-0 text-center w-20 cursor-pointer" onClick={() => onOpenProfileModal(story.user)}>
          <div className={`w-16 h-16 rounded-full p-0.5 transition-all ${story.viewed ? 'bg-gray-300 dark:bg-zinc-600' : 'bg-gradient-to-tr from-yellow-400 to-primary'}`}>
            <img src={story.user.avatarUrl} alt={story.user.name} className="w-full h-full rounded-full border-2 border-white dark:border-zinc-800" />
          </div>
          <p className="text-xs mt-2 truncate font-medium">{story.user.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onOpenProfileModal, onOpenPostDetail, onOpenSharePost, onToggleLike, likedPostIds, onToggleArchive, onHashtagClick, onOpenEditPost }) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const isLiked = likedPostIds.has(post.id);
  const isOwnPost = post.user.id === currentUser.id;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between">
            <div className="flex items-center mb-4">
              <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full cursor-pointer" onClick={() => onOpenProfileModal(post.user)} />
              <div className="ml-4">
                <p className="font-bold text-deep-gray dark:text-white cursor-pointer" onClick={() => onOpenProfileModal(post.user)}>{post.user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{post.user.username} · {new Date(post.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
            {isOwnPost && (
                 <div className="relative">
                    <button onClick={() => setIsOptionsOpen(p => !p)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700">
                        <MoreHorizontalIcon className="w-5 h-5"/>
                    </button>
                    {isOptionsOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border dark:border-zinc-700 z-10 py-1 animate-modal-content">
                             <button onClick={() => { onOpenEditPost(post); setIsOptionsOpen(false); }} className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800">
                                <EditIcon className="w-5 h-5"/> Edit Post
                            </button>
                             <button onClick={() => { onToggleArchive(post.id); setIsOptionsOpen(false); }} className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800">
                                <ArchiveIcon className="w-5 h-5"/> Archive Post
                            </button>
                        </div>
                    )}
                 </div>
            )}
        </div>
        <div className="text-gray-800 dark:text-gray-300">
          <ParsedContent content={post.content} onHashtagClick={onHashtagClick} />
        </div>
      </div>
      {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />}
      {post.videoUrl && (
        <video controls src={post.videoUrl} className="w-full h-auto bg-black" />
      )}
      <div className="p-5">
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
          <button onClick={() => onToggleLike(post.id)} className={`flex items-center gap-2 hover:text-red-500 transition-colors group ${isLiked ? 'text-red-500' : ''}`}>
            <HeartIcon className={`w-6 h-6 transition-transform group-hover:scale-110 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{post.likes}</span>
          </button>
          <button onClick={() => onOpenPostDetail(post)} className="flex items-center gap-2 hover:text-accent transition-colors group">
            <MessageCircleIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="font-medium">{post.commentsData.length}</span>
          </button>
          <button onClick={() => onOpenSharePost(post)} className="flex items-center gap-2 hover:text-green-500 transition-colors group">
            <ShareIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="font-medium">{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const EventCard: React.FC<EventCardProps> = ({ event, onCommunitySelect, onOpenProfileModal, onOpenEventDetail }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300" onClick={() => onOpenEventDetail(event)}>
    <div className="p-5">
      <div className="flex items-center mb-4">
        <img src={event.creator.avatarUrl} alt={event.creator.name} className="w-12 h-12 rounded-full cursor-pointer" onClick={(e) => { e.stopPropagation(); onOpenProfileModal(event.creator); }} />
        <div className="ml-4">
          <p className="font-bold text-deep-gray dark:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); onOpenProfileModal(event.creator); }}>{event.creator.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            posted an event in <span className="font-semibold text-primary cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); onCommunitySelect(event.communityId); }}>{event.communityName}</span>
          </p>
        </div>
      </div>
      <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary w-20 h-20 rounded-lg flex-shrink-0">
            <span className="text-sm font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
            <span className="text-3xl font-bold">{new Date(event.date).getDate()}</span>
          </div>
          <div>
            <h4 className="font-bold text-lg">{event.title}</h4>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
              <CalendarIcon className="w-4 h-4"/>
              <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long' })} at {event.time}</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <MapPinIcon className="w-4 h-4"/>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        {event.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">{event.description}</p>}
      </div>
    </div>
  </div>
);

export const FeedView: React.FC<FeedViewProps> = ({ feedItems, stories, currentUser, onOpenCreatePost, onOpenCreateStory, onCommunitySelect, onOpenEventDetail, ...postCardHandlers }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Stories stories={stories} onAdd={onOpenCreateStory} onOpenProfileModal={postCardHandlers.onOpenProfileModal} />
      <CreatePostTrigger user={currentUser} onClick={onOpenCreatePost} />
      <div className="space-y-6">
        {feedItems.map(item => {
          switch (item.type) {
            case 'post':
              return <PostCard key={item.id} post={item} currentUser={currentUser} {...postCardHandlers} />;
            case 'event':
              return <EventCard key={item.id} event={item} onCommunitySelect={onCommunitySelect} onOpenProfileModal={postCardHandlers.onOpenProfileModal} onOpenEventDetail={onOpenEventDetail} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};