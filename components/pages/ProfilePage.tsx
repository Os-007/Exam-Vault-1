
import React, { useMemo, useContext } from 'react';
import type { User, Resource } from '../../types';
import { AppContext } from '../../App';
import ResourceCard from '../ResourceCard';
import { Award, UploadCloud, Calendar } from 'lucide-react';

interface ProfilePageProps {
  user: User;
  allResources: Resource[];
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user, allResources }) => {
    const { setView } = useContext(AppContext);
    
    const userResources = useMemo(() => {
        return allResources.filter(resource => resource.author.id === user.id);
    }, [allResources, user.id]);

    return (
        <div>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-primary-500" />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-slate-900">{user.name}</h1>
                        <p className="text-slate-600 mt-2 max-w-xl">{user.bio}</p>
                        <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Joined on {new Date(user.joinDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard icon={<Award size={24}/>} label="Reputation Points" value={user.points.toLocaleString()} />
                <StatCard icon={<UploadCloud size={24}/>} label="Total Uploads" value={userResources.length} />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">My Uploads</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userResources.length > 0 ? (
                        userResources.map(resource => (
                            <ResourceCard key={resource.id} resource={resource} onSelect={() => setView('resourceDetail', resource.id)} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-md">
                            <p className="text-slate-500">You haven't uploaded any resources yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
