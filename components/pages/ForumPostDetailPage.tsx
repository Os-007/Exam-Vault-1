
import React, { useContext } from 'react';
import type { ForumPost } from '../../types';
import { AppContext } from '../../App';
import { ArrowLeft, ThumbsUp } from 'lucide-react';

const ForumPostDetailPage: React.FC<{ post: ForumPost }> = ({ post }) => {
    const { user, setView } = useContext(AppContext);

    return (
        <div>
            <button onClick={() => setView('forums')} className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-800 transition mb-6">
                <ArrowLeft size={20} />
                Back to all posts
            </button>

            <div className="bg-white p-8 rounded-xl shadow-md">
                {/* Post Header */}
                <div className="pb-6 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-800 px-3 py-1 bg-slate-100 rounded-full">{post.courseCode}</span>
                    <h1 className="text-3xl font-bold text-slate-900 mt-4">{post.title}</h1>
                    <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full" />
                            <span className="font-semibold text-slate-700">{post.author.name}</span>
                        </div>
                        <span>•</span>
                        <span>Posted on {new Date(post.timestamp).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Post Body */}
                <div className="py-6 prose max-w-none">
                    <p>{post.body}</p>
                </div>

                {/* Post Actions */}
                <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                     <button className="flex items-center gap-2 p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold">
                        <ThumbsUp size={18} />
                        <span>Upvote ({post.upvotes})</span>
                    </button>
                    <div className="flex items-center gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium text-primary-700 bg-primary-100 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Replies Section */}
            <div className="bg-white p-8 rounded-xl shadow-md mt-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Replies ({post.replies.length})</h3>
                
                {/* Add Reply Form */}
                <div className="flex gap-4 items-start pb-6 mb-6 border-b">
                    <img src={user?.avatarUrl} alt={user?.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-grow">
                        <textarea
                            placeholder="Add your reply..."
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition"
                            rows={3}
                        />
                        <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition mt-2">
                            Post Reply
                        </button>
                    </div>
                </div>

                {/* List of Replies */}
                <div className="space-y-6">
                    {post.replies.map(reply => (
                        <div key={reply.id} className="flex gap-4 items-start">
                             <img src={reply.author.avatarUrl} alt={reply.author.name} className="w-10 h-10 rounded-full" />
                             <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-800">{reply.author.name}</p>
                                        <p className="text-xs text-slate-500">{new Date(reply.timestamp).toLocaleString()}</p>
                                    </div>
                                    <button className="flex items-center gap-1.5 p-2 text-sm border rounded-lg hover:bg-slate-100">
                                        <ThumbsUp size={14} /> {reply.upvotes}
                                    </button>
                                </div>
                                <p className="text-slate-700 mt-2">{reply.text}</p>
                             </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ForumPostDetailPage;
