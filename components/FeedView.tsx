import React from 'react';
import type { Story, Post, User } from '../types';
import { HeartIcon, MessageCircleIcon, ShareIcon, PlusIcon } from '../constants';

interface PostCardProps {
  post: Post;
  onOpenProfileModal: (user: User) => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenSharePost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  likedPostIds: Set<string>;
}

interface FeedViewProps {
  posts: Post[];
  stories: Story[];
  currentUser: User;
  onOpenCreatePost: () => void;
  onOpenCreateStory: () => void;
  onOpenProfileModal: (user: User) => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenSharePost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  likedPostIds: Set<string>;
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
          <div className={`w-16 h-16 rounded-full p-0.5 ${story.viewed ? 'bg-gray-300 dark:bg-zinc-600' : 'bg-gradient-to-tr from-yellow-400 to-primary'}`}>
            <img src={story.user.avatarUrl} alt={story.user.name} className="w-full h-full rounded-full border-2 border-white dark:border-zinc-800" />
          </div>
          <p className="text-xs mt-2 truncate font-medium">{story.user.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const PostCard: React.FC<PostCardProps> = ({ post, onOpenProfileModal, onOpenPostDetail, onOpenSharePost, onToggleLike, likedPostIds }) => {
  const isLiked = likedPostIds.has(post.id);
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full cursor-pointer" onClick={() => onOpenProfileModal(post.user)} />
          <div className="ml-4">
            <p className="font-bold text-deep-gray dark:text-white cursor-pointer" onClick={() => onOpenProfileModal(post.user)}>{post.user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{post.user.username} · {post.timestamp}</p>
          </div>
        </div>
        <div 
          className="text-gray-800 dark:text-gray-300 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
         {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />}
      {post.videoUrl && (
        <video controls src={post.videoUrl} className="w-full h-auto bg-black" />
      )}
      <div className="p-5">
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
          <button onClick={() => onToggleLike(post.id)} className={`flex items-center gap-2 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
            <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{post.likes}</span>
          </button>
          <button onClick={() => onOpenPostDetail(post)} className="flex items-center gap-2 hover:text-accent transition-colors">
            <MessageCircleIcon className="w-6 h-6" />
            <span className="font-medium">{post.commentsData.length}</span>
          </button>
          <button onClick={() => onOpenSharePost(post)} className="flex items-center gap-2 hover:text-green-500 transition-colors">
            <ShareIcon className="w-6 h-6" />
            <span className="font-medium">{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const FeedView: React.FC<FeedViewProps> = ({ posts, stories, currentUser, onOpenCreatePost, onOpenCreateStory, ...postCardHandlers }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Stories stories={stories} onAdd={onOpenCreateStory} onOpenProfileModal={postCardHandlers.onOpenProfileModal} />
      <CreatePostTrigger user={currentUser} onClick={onOpenCreatePost} />
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} {...postCardHandlers} />
        ))}
      </div>
    </div>
  );
};
