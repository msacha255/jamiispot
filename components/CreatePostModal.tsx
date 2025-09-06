import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MOCK_USERS, XIcon, ImageIcon, BoldIcon, ItalicIcon, UnderlineIcon, ListIcon, ListOrderedIcon, LinkIcon, PaletteIcon } from '../constants';
import type { User } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (content: string, imageUrl?: string, tags?: string[]) => void;
  user: User;
}

const EditorToolbar: React.FC = () => {
    const colorInputRef = useRef<HTMLInputElement>(null);

    const format = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    const handleLink = () => {
        const url = prompt('Enter the URL:');
        if (url) {
            format('createLink', url);
        }
    };
    
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        format('foreColor', e.target.value);
    };

    return (
        <div className="flex items-center flex-wrap gap-1 sm:gap-2 p-2 border-b border-gray-200 dark:border-zinc-700">
            <button title="Bold" onClick={() => format('bold')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"><BoldIcon className="w-5 h-5" /></button>
            <button title="Italic" onClick={() => format('italic')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"><ItalicIcon className="w-5 h-5" /></button>
            <button title="Underline" onClick={() => format('underline')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"><UnderlineIcon className="w-5 h-5" /></button>
            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1 sm:mx-2"></div>
            <button title="Bulleted List" onClick={() => format('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"><ListIcon className="w-5 h-5" /></button>
            <button title="Numbered List" onClick={() => format('insertOrderedList')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"><ListOrderedIcon className="w-5 h-5" /></button>
            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1 sm:mx-2"></div>
            <button title="Add Link" onClick={handleLink} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"><LinkIcon className="w-5 h-5" /></button>
            <button title="Text Color" onClick={() => colorInputRef.current?.click()} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-600"><PaletteIcon className="w-5 h-5" /></button>
            <input type="color" ref={colorInputRef} onChange={handleColorChange} className="w-0 h-0 absolute opacity-0"/>
        </div>
    );
}

const MentionSuggestions: React.FC<{
    users: User[];
    position: { top: number, left: number };
    onSelect: (user: User) => void;
}> = ({ users, position, onSelect }) => {
    if (users.length === 0) return null;

    return ReactDOM.createPortal(
        <div 
            className="absolute z-50 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 w-64 max-h-60 overflow-y-auto"
            style={{ top: position.top, left: position.left }}
        >
            {users.map(user => (
                <div 
                    key={user.id}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                    onClick={() => onSelect(user)}
                >
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                    <div className="ml-3">
                        <p className="font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                    </div>
                </div>
            ))}
        </div>,
        document.body
    );
};


export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onCreatePost, user }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState<User[]>([]);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const [mentionRange, setMentionRange] = useState<Range | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const adjustEditorHeight = () => {
    if (editorRef.current) {
        editorRef.current.style.height = 'auto';
        editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
      if (isOpen) {
          setContent('');
          setImage(null);
          setTags([]);
          setCurrentTag('');
          setShowSuggestions(false);
          if(editorRef.current) {
            editorRef.current.innerHTML = '';
            setTimeout(adjustEditorHeight, 0);
          }
          if(fileInputRef.current) fileInputRef.current.value = '';
      }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
      adjustEditorHeight();
      setContent(editorRef.current?.innerHTML || '');
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
          setShowSuggestions(false);
          return;
      }
      
      const range = selection.getRangeAt(0);
      const node = range.startContainer;
      const offset = range.startOffset;

      if (node.nodeType === Node.TEXT_NODE && node.textContent) {
          const text = node.textContent.slice(0, offset);
          const mentionMatch = text.match(/@(\w*)$/);
          
          if (mentionMatch) {
              const query = mentionMatch[1].toLowerCase();
              const filteredUsers = MOCK_USERS.filter(u => u.name.toLowerCase().includes(query) || u.username.toLowerCase().includes(query));
              
              if (filteredUsers.length > 0) {
                  const tempRange = range.cloneRange();
                  tempRange.setStart(node, mentionMatch.index!);
                  const rect = tempRange.getBoundingClientRect();

                  setSuggestionPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
                  setMentionSuggestions(filteredUsers);
                  setShowSuggestions(true);
                  
                  const mentionTextNode = node;
                  const mentionStartIndex = mentionMatch.index!;
                  const mentionEndIndex = offset;
                  const newRange = document.createRange();
                  newRange.setStart(mentionTextNode, mentionStartIndex);
                  newRange.setEnd(mentionTextNode, mentionEndIndex);
                  setMentionRange(newRange);
              } else {
                  setShowSuggestions(false);
              }
          } else {
              setShowSuggestions(false);
          }
      } else {
          setShowSuggestions(false);
      }
  };

  const handleMentionSelect = (user: User) => {
    if (mentionRange && editorRef.current) {
        const mentionNode = document.createElement('a');
        mentionNode.href = '#';
        mentionNode.className = 'mention';
        mentionNode.textContent = `@${user.name}`;
        mentionNode.setAttribute('data-user-id', user.id);
        mentionNode.contentEditable = 'false';

        mentionRange.deleteContents();
        mentionRange.insertNode(mentionNode);

        const spaceNode = document.createTextNode('\u00A0');
        const newRange = mentionRange.cloneRange();
        newRange.setStartAfter(mentionNode);
        newRange.insertNode(spaceNode);
        newRange.setStartAfter(spaceNode);
        newRange.collapse(true);
        
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(newRange);
        
        editorRef.current.focus();
    }
    setShowSuggestions(false);
    setMentionSuggestions([]);
    setMentionRange(null);
  };

  const handleSubmit = () => {
    const finalContent = editorRef.current?.innerHTML || '';
    if (finalContent.trim() || image || tags.length > 0) {
      onCreatePost(finalContent, image || undefined, tags);
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
          <h2 className="text-xl font-bold">Create Post</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start gap-4">
            <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                 <div className="w-full border border-gray-300 dark:border-zinc-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                    <EditorToolbar />
                    <div
                        ref={editorRef}
                        onInput={handleContentChange}
                        contentEditable="true"
                        aria-label="Post content"
                        data-placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
                        className="prose dark:prose-invert max-w-none p-3 focus:outline-none before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before:dark:text-gray-500 before:pointer-events-none empty:before:block"
                        style={{ minHeight: '120px' }}
                    ></div>
                </div>
            </div>
          </div>
          
          {image && (
             <div className="mt-4 pl-16">
                <div className="relative group p-2 bg-gray-100 dark:bg-zinc-700 rounded-xl">
                    <img src={image} alt="Preview" className="w-full max-h-72 object-cover rounded-lg" />
                    <button 
                        onClick={handleRemoveImage}
                        className="absolute top-4 right-4 p-1.5 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white transition-opacity opacity-0 group-hover:opacity-100" 
                        aria-label="Remove image"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
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

        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-zinc-700">
          <label className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 text-primary" title="Add image">
            <ImageIcon className="w-6 h-6" />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <button 
            onClick={handleSubmit} 
            disabled={!content.trim() && !image && tags.length === 0}
            className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm disabled:bg-primary/50 disabled:cursor-not-allowed">
            Post
          </button>
        </div>
      </div>
      {showSuggestions && <MentionSuggestions users={mentionSuggestions} position={suggestionPosition} onSelect={handleMentionSelect} />}
    </div>
  );
};