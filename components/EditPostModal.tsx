
import React, { useState, useRef, useEffect } from 'react';
import type { User, Post } from '../types';
import { XIcon } from '../constants';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePost: (postId: string, postData: Partial<Post>) => void;
  post: Post | null;
  user: User;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, onUpdatePost, post, user }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && post) {
      setContent(post.content);
      setTags(post.tags || []);
      if (editorRef.current) {
        editorRef.current.innerHTML = post.content;
      }
    }
  }, [isOpen, post]);

  if (!isOpen || !post) return null;

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
        e.preventDefault();
        if (!tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
        }
        setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleContentChange = () => {
      setContent(editorRef.current?.innerHTML || '');
  };

  const handleSubmit = () => {
    const finalContent = editorRef.current?.innerHTML || '';
    if (finalContent.trim() || tags.length > 0) {
      const postData: Partial<Post> = {
          content: finalContent,
          tags,
      };
      onUpdatePost(post.id, postData);
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
          <h2 className="text-xl font-bold">Edit Post</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start gap-4">
            <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                 <div className="w-full border border-gray-300 dark:border-zinc-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                    <div
                        ref={editorRef}
                        onInput={handleContentChange}
                        contentEditable="true"
                        aria-label="Post content"
                        className="prose dark:prose-invert max-w-none p-3 focus:outline-none"
                        style={{ minHeight: '120px' }}
                    ></div>
                </div>
            </div>
          </div>
          
          {(post.imageUrl || post.videoUrl) && (
             <div className="mt-4 pl-16">
                <div className="relative group p-2 bg-gray-100 dark:bg-zinc-700 rounded-xl">
                    {post.imageUrl ? (
                        <img src={post.imageUrl} alt="Post media" className="w-full max-h-72 object-cover rounded-lg" />
                    ) : (
                        <video src={post.videoUrl} controls className="w-full max-h-72 rounded-lg bg-black"/>
                    )}
                </div>
            </div>
          )}

          <div className="mt-4 pl-16">
              <input 
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags... (press Enter)"
                className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                      <div key={tag} className="flex items-center bg-accent/10 text-accent text-sm font-semibold pl-3 pr-2 py-1 rounded-full">
                          <span>{tag}</span>
                          <button onClick={() => removeTag(tag)} className="ml-1.5 text-accent hover:bg-accent/20 rounded-full"><XIcon className="w-4 h-4" /></button>
                      </div>
                  ))}
              </div>
          </div>

        </div>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-700 flex justify-end">
            <button 
              onClick={handleSubmit} 
              disabled={!content.trim() && tags.length === 0}
              className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm disabled:bg-primary/50 disabled:cursor-not-allowed">
              Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};
