import React, { useState, useRef } from 'react';
import type { User } from '../types';
import { ChevronLeftIcon, XIcon, COUNTRIES, XSocialIcon, LinkedinIcon, GithubIcon, CakeIcon, SUGGESTED_INTERESTS, SUGGESTED_SKILLS } from '../constants';

interface EditProfileViewProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void;
    onCancel: () => void;
}

interface TagInputProps {
    label: string;
    tags: string[];
    setTags: (tags: string[]) => void;
    color: 'primary' | 'accent';
    suggestions?: string[];
}

const TagInput: React.FC<TagInputProps> = ({ label, tags, setTags, color, suggestions }) => {
    const [currentTag, setCurrentTag] = useState('');

    const colorClasses = {
        primary: {
            container: 'bg-orange-100 dark:bg-primary/20 text-primary dark:text-orange-300',
            removeHover: 'hover:bg-primary/20 dark:hover:bg-primary/30',
        },
        accent: {
            container: 'bg-accent/10 dark:bg-accent/20 text-accent dark:text-blue-300',
            removeHover: 'hover:bg-accent/20 dark:hover:bg-accent/30',
        }
    };
    const selectedColor = colorClasses[color];

    const addTag = (tag: string) => {
        if (tag.trim() && !tags.includes(tag.trim())) {
            setTags([...tags, tag.trim()]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault();
            addTag(currentTag);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSuggestionClick = (suggestion: string) => {
        addTag(suggestion);
    };
    
    const availableSuggestions = suggestions?.filter(s => !tags.includes(s)) || [];

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input 
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Add ${label.toLowerCase()}... (press Enter)`}
                className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                     <div key={tag} className={`flex items-center ${selectedColor.container} text-sm font-semibold pl-3 pr-1 py-1 rounded-full`}>
                        <span>{tag}</span>
                        <button 
                            onClick={() => removeTag(tag)} 
                            className={`ml-1.5 p-0.5 rounded-full transition-colors ${selectedColor.removeHover}`}
                            aria-label={`Remove ${tag}`}
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            {availableSuggestions.length > 0 && (
                 <div className="mt-3 border-t border-gray-200 dark:border-zinc-700 pt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {availableSuggestions.map(suggestion => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="bg-gray-200 dark:bg-zinc-600 text-sm px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-zinc-500 transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const BirthdaySelector: React.FC<{ value: string; onChange: (value: string) => void;}> = ({ value, onChange }) => {
    const [year, month, day] = value ? value.split('-').map(v => parseInt(v, 10)) : [undefined, undefined, undefined];
    
    const handleDateChange = (part: 'year' | 'month' | 'day', val: number) => {
        const newDate = new Date(year || new Date().getFullYear(), (month-1) || 0, day || 1);
        if (part === 'year') newDate.setFullYear(val);
        if (part === 'month') newDate.setMonth(val - 1);
        if (part === 'day') newDate.setDate(val);
        onChange(newDate.toISOString().split('T')[0]);
    };

    const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const selectClasses = "w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none";

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Birthday</label>
            <div className="grid grid-cols-3 gap-2">
                <select value={month || ''} onChange={(e) => handleDateChange('month', parseInt(e.target.value))} className={selectClasses} aria-label="Month">
                    <option value="" disabled>Month</option>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select value={day || ''} onChange={(e) => handleDateChange('day', parseInt(e.target.value))} className={selectClasses} aria-label="Day">
                    <option value="" disabled>Day</option>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={year || ''} onChange={(e) => handleDateChange('year', parseInt(e.target.value))} className={selectClasses} aria-label="Year">
                    <option value="" disabled>Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
        </div>
    );
};


export const EditProfileView: React.FC<EditProfileViewProps> = ({ user, onUpdateUser, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        bio: user.bio || '',
        location: user.location || '',
        country: user.country || '',
        birthday: user.birthday || '',
        socialLinks: {
            twitter: user.socialLinks?.twitter || '',
            linkedin: user.socialLinks?.linkedin || '',
            github: user.socialLinks?.github || '',
        }
    });
    const [showFlag, setShowFlag] = useState(user.showFlag || false);
    const [showBirthday, setShowBirthday] = useState(user.showBirthday || false);
    const [interests, setInterests] = useState(user.interests || []);
    const [skills, setSkills] = useState(user.skills || []);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatarUrl);
    const [coverPreview, setCoverPreview] = useState<string | null>(user.coverUrl || null);

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value,
            }
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'avatar') {
                    setAvatarPreview(reader.result as string);
                } else {
                    setCoverPreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedUser: User = {
            ...user,
            ...formData,
            avatarUrl: avatarPreview || user.avatarUrl,
            coverUrl: coverPreview || user.coverUrl,
            interests,
            skills,
            showFlag,
            showBirthday,
        };
        onUpdateUser(updatedUser);
    };
    
    const FormSection: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
        <div className="p-6 space-y-6">
            <h2 className="text-lg font-bold border-b border-gray-200 dark:border-zinc-700 pb-2">{title}</h2>
            {children}
        </div>
    );
    
    const SocialInput: React.FC<{name: 'twitter' | 'linkedin' | 'github', value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ name, value, onChange }) => {
        const icons = {
            twitter: <XSocialIcon className="w-5 h-5 text-gray-400" />,
            linkedin: <LinkedinIcon className="w-5 h-5 text-gray-400" />,
            github: <GithubIcon className="w-5 h-5 text-gray-400" />
        };
        return (
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icons[name]}</span>
                <input 
                    type="text" 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    placeholder={`https://${name}.com/username`}
                    className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" 
                />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                <div className="p-4 flex items-center border-b border-gray-200 dark:border-zinc-700">
                    <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 mr-2">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold font-display">Edit Profile</h1>
                </div>

                <div className="relative">
                    <div className="h-48 bg-cover bg-center bg-gray-200 dark:bg-zinc-700" style={{ backgroundImage: `url(${coverPreview})` }}>
                        <button onClick={() => coverInputRef.current?.click()} className="absolute inset-0 w-full h-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white font-semibold">
                            Change Cover Photo
                        </button>
                        <input type="file" accept="image/*" ref={coverInputRef} onChange={(e) => handleFileChange(e, 'cover')} className="hidden" />
                    </div>
                    <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                        <div className="relative group">
                             <img src={avatarPreview || ''} alt="Avatar" className="w-28 h-28 rounded-full border-4 border-white dark:border-zinc-800 object-cover" />
                             <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 w-full h-full rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-semibold text-sm">
                                Change
                             </button>
                             <input type="file" accept="image/*" ref={avatarInputRef} onChange={(e) => handleFileChange(e, 'avatar')} className="hidden" />
                        </div>
                    </div>
                </div>
                
                <div className="pt-16 divide-y divide-gray-200 dark:divide-zinc-700">
                    <FormSection title="Bio">
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                         <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                            <input type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                         <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                            <textarea name="bio" id="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                    </FormSection>

                    <FormSection title="Interests">
                        <TagInput label="Interests" tags={interests} setTags={setInterests} color="primary" suggestions={SUGGESTED_INTERESTS} />
                    </FormSection>

                     <FormSection title="Professional Skills">
                        <TagInput label="Skills" tags={skills} setTags={setSkills} color="accent" suggestions={SUGGESTED_SKILLS} />
                    </FormSection>

                    <FormSection title="Social Links">
                        <SocialInput name="twitter" value={formData.socialLinks.twitter} onChange={handleSocialChange} />
                        <SocialInput name="linkedin" value={formData.socialLinks.linkedin} onChange={handleSocialChange} />
                        <SocialInput name="github" value={formData.socialLinks.github} onChange={handleSocialChange} />
                    </FormSection>

                    <FormSection title="Other Settings">
                         <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                            <input type="text" name="location" id="location" value={formData.location} onChange={handleInputChange} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                         <div>
                            <BirthdaySelector value={formData.birthday} onChange={(val) => setFormData(p => ({...p, birthday: val}))} />
                             <div className="flex items-center mt-3">
                                <button
                                    onClick={() => setShowBirthday(!showBirthday)}
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${showBirthday ? 'bg-primary' : 'bg-gray-300 dark:bg-zinc-600'}`}
                                >
                                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${showBirthday ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Show birthday on profile</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">National Flag Badge</label>
                            <select name="country" id="country" value={formData.country} onChange={handleInputChange} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none">
                                <option value="">Select Country</option>
                                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                            </select>
                            <div className="flex items-center mt-3">
                                <button
                                    onClick={() => setShowFlag(!showFlag)}
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${showFlag ? 'bg-primary' : 'bg-gray-300 dark:bg-zinc-600'}`}
                                >
                                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${showFlag ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Show flag on profile</span>
                            </div>
                        </div>
                    </FormSection>
                </div>

                <div className="p-6 flex flex-col-reverse sm:flex-row justify-end gap-4 border-t border-gray-200 dark:border-zinc-700">
                    <button onClick={onCancel} className="bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Save Changes</button>
                </div>
            </div>
        </div>
    );
};