import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, User, Message } from '../types';
import { SearchIcon, MessageIcon, PaperclipIcon, MicIcon, SendIcon, XIcon } from '../constants';

interface MessagingViewProps {
    conversations: Conversation[];
    currentUser: User;
    onSendMessage: (conversationId: string, message: { text?: string; imageUrl?: string; audioUrl?: string; }) => void;
    activeConversationIdParam?: string;
}

const ConversationItem: React.FC<{ conversation: Conversation; isActive: boolean; onClick: () => void; currentUser: User; }> = ({ conversation, isActive, onClick, currentUser }) => {
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id)!;
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    
    const getLastMessageText = () => {
        if (!lastMessage) return "No messages yet";
        if (lastMessage.text) return lastMessage.text;
        if (lastMessage.imageUrl) return "Photo";
        if (lastMessage.audioUrl) return "Voice message";
        return "";
    }

    return (
        <div
            onClick={onClick}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-primary/10' : 'hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
        >
            <div className="relative">
                <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-12 h-12 rounded-full" />
                {conversation.unreadCount > 0 && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary ring-2 ring-white dark:ring-zinc-800"></span>}
            </div>
            <div className="ml-4 flex-1 overflow-hidden">
                <p className="font-bold text-deep-gray dark:text-white truncate">{otherParticipant.name}</p>
                <p className={`text-sm ${conversation.unreadCount > 0 ? 'text-gray-800 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'} truncate`}>{getLastMessageText()}</p>
            </div>
            {conversation.unreadCount > 0 && <div className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{conversation.unreadCount}</div>}
        </div>
    );
};

const MessageBubble: React.FC<{ message: Message; isOwn: boolean }> = ({ message, isOwn }) => {
    const bubbleClasses = isOwn ? 'bg-primary text-white self-end' : 'bg-light-gray dark:bg-zinc-700 self-start';
    if (message.imageUrl) {
        return <img src={message.imageUrl} alt="Sent" className={`max-w-xs rounded-lg shadow-md ${isOwn ? 'self-end' : 'self-start'}`} />
    }
    if (message.audioUrl) {
        return (
            <div className={`flex items-center gap-2 p-2 rounded-lg shadow-md ${bubbleClasses}`}>
                <audio controls src={message.audioUrl} className="w-56 h-10" />
            </div>
        );
    }
    return <div className={`p-3 rounded-lg shadow-md max-w-lg ${bubbleClasses}`}>{message.text}</div>
};

export const MessagingView: React.FC<MessagingViewProps> = ({ conversations, currentUser, onSendMessage, activeConversationIdParam }) => {
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [textMessage, setTextMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordingIntervalRef = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initialId = activeConversationIdParam || (conversations.length > 0 ? conversations[0].id : null);
        if (conversations.some(c => c.id === initialId)) {
            setActiveConversationId(initialId);
        } else if (conversations.length > 0) {
            setActiveConversationId(conversations[0].id);
        } else {
            setActiveConversationId(null);
        }
    }, [activeConversationIdParam, conversations]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConversationId, conversations]);

    if (conversations.length === 0) {
        return (
             <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-zinc-800 rounded-xl shadow-sm items-center justify-center">
                <div className="text-center text-gray-500">
                    <MessageIcon className="w-16 h-16 mx-auto mb-4"/>
                    <h2 className="text-xl font-bold">No Messages</h2>
                    <p>Start a new conversation to see it here.</p>
                </div>
            </div>
        )
    }

    const activeConversation = conversations.find(c => c.id === activeConversationId);
    
    const handleSendText = () => {
        if (textMessage.trim() && activeConversationId) {
            onSendMessage(activeConversationId, { text: textMessage.trim() });
            setTextMessage('');
        }
    };
    
    const handleImageSend = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0] && activeConversationId){
            const reader = new FileReader();
            reader.onload = (event) => {
                onSendMessage(activeConversationId, { imageUrl: event.target?.result as string });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.start();
            setIsRecording(true);
            recordingIntervalRef.current = window.setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            
            const audioChunks: Blob[] = [];
            mediaRecorderRef.current.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorderRef.current.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                if (activeConversationId) {
                    onSendMessage(activeConversationId, { audioUrl });
                }
                stream.getTracks().forEach(track => track.stop());
            });
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        if (recordingIntervalRef.current) {
            clearInterval(recordingIntervalRef.current);
        }
        setRecordingTime(0);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    if (!activeConversation) {
      return (
        <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-zinc-800 rounded-xl shadow-sm items-center justify-center">
          <div className="text-center text-gray-500">
            <MessageIcon className="w-16 h-16 mx-auto mb-4"/>
            <h2 className="text-xl font-bold">Select a conversation</h2>
            <p>Choose a conversation from the list to start chatting.</p>
          </div>
        </div>
      );
    }

    const otherParticipant = activeConversation.participants.find(p => p.id !== currentUser.id)!;

    return (
        <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-zinc-700 flex-col hidden md:flex">
                <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-display font-bold">Messages</h2>
                     <div className="relative mt-4">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {conversations.map(convo => (
                        <ConversationItem
                            key={convo.id}
                            conversation={convo}
                            isActive={convo.id === activeConversationId}
                            onClick={() => setActiveConversationId(convo.id)}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </div>

            {/* Chat Screen */}
            <div className="w-full md:w-2/3 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-zinc-700 flex items-center">
                    <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-10 h-10 rounded-full" />
                    <p className="ml-3 font-bold text-lg">{otherParticipant.name}</p>
                </div>
                <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
                    {activeConversation.messages.map(msg => <MessageBubble key={msg.id} message={msg} isOwn={msg.sender.id === currentUser.id} />)}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                    {isRecording ? (
                        <div className="flex items-center justify-between bg-light-gray dark:bg-zinc-700 rounded-full py-2 px-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="font-mono">{formatTime(recordingTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={stopRecording} className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded-full"><XIcon className="w-6 h-6"/></button>
                                <button onClick={stopRecording} className="p-2 bg-primary text-white rounded-full"><SendIcon className="w-6 h-6"/></button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex items-center gap-2">
                             <button onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-500 hover:text-primary rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"><PaperclipIcon className="w-6 h-6"/></button>
                             <input type="file" ref={fileInputRef} onChange={handleImageSend} accept="image/*" className="hidden"/>
                            <input type="text" value={textMessage} onChange={e => setTextMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendText()} placeholder="Type a message..." className="flex-1 bg-light-gray dark:bg-zinc-700 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"/>
                            {textMessage ? (
                                <button onClick={handleSendText} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                                    <SendIcon className="w-5 h-5" />
                                </button>
                            ) : (
                                <button onClick={startRecording} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    <MicIcon className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
