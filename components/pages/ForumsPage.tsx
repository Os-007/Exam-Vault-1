
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import type { ForumPost } from '../../types';
import { ThumbsUp, MessageSquare, PlusCircle, Tag } from 'lucide-react';

const ForumPostCard: React.FC<{ post: ForumPost, onSelect: () => void }> = ({ post, onSelect }) => {
    return (
        <div onClick={onSelect} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                         <span className="text-sm font-bold text-slate-800 px-3 py-1 bg-slate-100 rounded-full">{post.courseCode}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 hover:text-primary-700">{post.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">{post.author.name}</span>
                </div>
            </div>
            <p className="text-slate-600 mt-2 line-clamp-2">{post.body}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium text-primary-700 bg-primary-100 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
                    <span className="flex items-center gap-1.5"><ThumbsUp size={16} /> {post.upvotes}</span>
                    <span className="flex items-center gap-1.5"><MessageSquare size={16} /> {post.replies.length}</span>
                </div>
            </div>
        </div>
    );
};


const ForumsPage: React.FC = () => {
    const { forumPosts, setView } = useContext(AppContext);

    return (
        <div>
            <div className="bg-white p-6 rounded-xl shadow-md mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Discussion Forums</h1>
                    <p className="text-slate-600 mt-2">Ask questions, share insights, and connect with your peers.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-primary-700 transition">
                    <PlusCircle size={20} />
                    Create Post
                </button>
            </div>
            <div className="space-y-6">
                {forumPosts.map(post => (
                    <ForumPostCard key={post.id} post={post} onSelect={() => setView('forumDetail', post.id)} />
                ))}
            </div>
        </div>
    );
};

export default ForumsPage;
