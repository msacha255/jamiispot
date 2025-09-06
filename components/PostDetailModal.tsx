import React, { useState } from 'react';
import type { Post, User, Comment } from '../types';
import { XIcon, HeartIcon, MessageCircleIcon, ShareIcon, SendIcon } from '../constants';

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  currentUser: User;
  onAddComment: (postId: string, text: string) => void;
  likedPostIds: Set<string>;
  onToggleLike: (postId: string) => void;
  onOpenShare: (post: Post) => void;
  onToggleArchive: (postId: string) => void;
  onHashtagClick: (hashtag: string) => void;
  onOpenProfile: (user: User) => void;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => (
    <div className="flex items-start gap-3">
        <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full" />
        <div className="flex-1 bg-light-gray dark:bg-zinc-700 p-3 rounded-xl">
            <p className="font-bold text-sm">{comment.user.name}</p>
            <p className="text-gray-800 dark:text-gray-300">{comment.text}</p>
        </div>
    </div>
);

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ 
    isOpen, onClose, post, currentUser, onAddComment, likedPostIds, onToggleLike, onOpenShare 
}) => {
    const [newComment, setNewComment] = useState('');

    if (!isOpen || !post) return null;

    const isLiked = likedPostIds.has(post.id);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(post.id, newComment.trim());
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Post by {post.user.name}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Media */}
                    <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
                        {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="max-w-full max-h-full object-contain" />}
                        {post.videoUrl && <video src={post.videoUrl} controls className="max-w-full max-h-full" />}
                    </div>

                    {/* Content & Comments */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
                           <div className="flex items-center mb-4">
                                <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full" />
                                <div className="ml-4">
                                <p className="font-bold text-deep-gray dark:text-white">{post.user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">@{post.user.username} · {post.timestamp}</p>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        <div className="p-4 flex justify-between items-center text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-700">
                            <button onClick={() => onToggleLike(post.id)} className={`flex items-center gap-2 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
                                <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                                <span className="font-medium">{post.likes}</span>
                            </button>
                            <div className="flex items-center gap-2">
                                <MessageCircleIcon className="w-6 h-6" />
                                <span className="font-medium">{post.commentsData.length}</span>
                            </div>
                            <button onClick={() => onOpenShare(post)} className="flex items-center gap-2 hover:text-green-500 transition-colors">
                                <ShareIcon className="w-6 h-6" />
                                <span className="font-medium">{post.shares}</span>
                            </button>
                        </div>
                        
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {post.commentsData.map(comment => <CommentItem key={comment.id} comment={comment} />)}
                        </div>
                        
                        <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
                            <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
                                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                                <input 
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button type="submit" className="p-2 text-primary rounded-full hover:bg-primary/10">
                                    <SendIcon className="w-6 h-6"/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
