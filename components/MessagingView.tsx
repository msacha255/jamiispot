
import React, { useState } from 'react';
import type { Conversation } from '../types';
import { MOCK_CONVERSATIONS, MOCK_USER } from '../constants';
import { SearchIcon } from '../constants';

const ConversationItem: React.FC<{ conversation: Conversation; isActive: boolean; onClick: () => void }> = ({ conversation, isActive, onClick }) => {
    const otherParticipant = conversation.participants.find(p => p.id !== MOCK_USER.id)!;
    return (
        <div
            onClick={onClick}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-primary/10' : 'hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
        >
            <div className="relative">
                <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-12 h-12 rounded-full" />
                {conversation.unreadCount > 0 && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary ring-2 ring-white dark:ring-zinc-800"></span>}
            </div>
            <div className="ml-4 flex-1">
                <p className="font-bold text-deep-gray dark:text-white">{otherParticipant.name}</p>
                <p className={`text-sm ${conversation.unreadCount > 0 ? 'text-gray-800 dark:text-gray-200 font-semibold' : 'text-gray-500 dark:text-gray-400'} truncate`}>{conversation.lastMessage.text}</p>
            </div>
            {conversation.unreadCount > 0 && <div className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{conversation.unreadCount}</div>}
        </div>
    );
};

export const MessagingView: React.FC = () => {
    const [activeConversationId, setActiveConversationId] = useState(MOCK_CONVERSATIONS[0].id);
    const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId)!;
    const otherParticipant = activeConversation.participants.find(p => p.id !== MOCK_USER.id)!;

    return (
        <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-zinc-700 flex flex-col">
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
                    {MOCK_CONVERSATIONS.map(convo => (
                        <ConversationItem
                            key={convo.id}
                            conversation={convo}
                            isActive={convo.id === activeConversationId}
                            onClick={() => setActiveConversationId(convo.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Chat Screen */}
            <div className="w-2/3 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-zinc-700 flex items-center">
                    <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-10 h-10 rounded-full" />
                    <p className="ml-3 font-bold text-lg">{otherParticipant.name}</p>
                </div>
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {/* Mocked messages */}
                    <div className="flex justify-start"><div className="bg-light-gray dark:bg-zinc-700 rounded-lg p-3 max-w-lg">Hey, how's it going?</div></div>
                    <div className="flex justify-end"><div className="bg-primary text-white rounded-lg p-3 max-w-lg">Pretty good! Just working on a new project. You?</div></div>
                    <div className="flex justify-start"><div className="bg-light-gray dark:bg-zinc-700 rounded-lg p-3 max-w-lg">Same here. Hey, are you free for a call tomorrow?</div></div>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                    <div className="relative">
                    <input type="text" placeholder="Type a message..." className="w-full bg-light-gray dark:bg-zinc-700 rounded-full py-3 px-5 pr-14 focus:outline-none focus:ring-2 focus:ring-primary"/>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
