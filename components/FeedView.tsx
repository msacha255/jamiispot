
import React from 'react';
import type { Story, Post, User } from '../types';
import { MOCK_STORIES, MOCK_POSTS, MOCK_USER } from '../constants';
import { HeartIcon, MessageCircleIcon, ShareIcon, PlusIcon } from '../constants';

const CreatePost: React.FC<{ user: User }> = ({ user }) => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm mb-6">
    <div className="flex items-start gap-4">
      <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
      <textarea
        placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
        className="flex-1 bg-light-gray dark:bg-zinc-700 border-none rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
        rows={2}
      />
    </div>
    <div className="flex justify-end mt-4">
      <button className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
        Post
      </button>
    </div>
  </div>
);

const Stories: React.FC<{ stories: Story[] }> = ({ stories }) => (
  <div className="mb-6">
    <div className="flex space-x-4 overflow-x-auto pb-4">
      <div className="flex-shrink-0 text-center w-20">
        <button className="w-16 h-16 rounded-full bg-white dark:bg-zinc-700 border-2 border-dashed border-gray-400 dark:border-zinc-500 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition">
          <PlusIcon className="w-8 h-8"/>
        </button>
        <p className="text-xs mt-2 font-medium">Add Story</p>
      </div>
      {stories.map(story => (
        <div key={story.id} className="flex-shrink-0 text-center w-20">
          <div className={`w-16 h-16 rounded-full p-0.5 ${story.viewed ? 'bg-gray-300 dark:bg-zinc-600' : 'bg-gradient-to-tr from-yellow-400 to-primary'}`}>
            <img src={story.user.avatarUrl} alt={story.user.name} className="w-full h-full rounded-full border-2 border-white dark:border-zinc-800" />
          </div>
          <p className="text-xs mt-2 truncate font-medium">{story.user.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
    <div className="p-5">
      <div className="flex items-center mb-4">
        <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <p className="font-bold text-deep-gray dark:text-white">{post.user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{post.user.username} · {post.timestamp}</p>
        </div>
      </div>
      <p className="mb-4 text-gray-800 dark:text-gray-300">{post.content}</p>
    </div>
    {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-auto" />}
    <div className="p-5">
      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
        <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
          <HeartIcon className="w-6 h-6" />
          <span className="font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-accent transition-colors">
          <MessageCircleIcon className="w-6 h-6" />
          <span className="font-medium">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
          <ShareIcon className="w-6 h-6" />
          <span className="font-medium">{post.shares}</span>
        </button>
      </div>
    </div>
  </div>
);

export const FeedView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Stories stories={MOCK_STORIES} />
      <CreatePost user={MOCK_USER} />
      <div className="space-y-6">
        {MOCK_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
