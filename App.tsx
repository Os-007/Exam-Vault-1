
import React, { useState, useMemo } from 'react';
import { mockUser, mockResources, mockForumPosts } from './constants';
import type { User, Resource, ForumPost } from './types';
import AuthPage from './components/pages/AuthPage';
import DashboardPage from './components/pages/DashboardPage';
import ResourceDetailPage from './components/pages/ResourceDetailPage';
import ForumsPage from './components/pages/ForumsPage';
import ForumPostDetailPage from './components/pages/ForumPostDetailPage';
import ProfilePage from './components/pages/ProfilePage';
import Header from './components/Header';
import UploadModal from './components/UploadModal';

export type View = 'dashboard' | 'resourceDetail' | 'forums' | 'forumDetail' | 'profile';

export const AppContext = React.createContext<{
  user: User | null;
  resources: Resource[];
  forumPosts: ForumPost[];
  addResource: (resource: Omit<Resource, 'id' | 'author' | 'uploadDate' | 'upvotes' | 'downvotes' | 'comments'>) => void;
  logout: () => void;
  login: (email: string) => void;
  setView: (view: View, id?: string) => void;
}>({
  user: null,
  resources: [],
  forumPosts: [],
  addResource: () => {},
  logout: () => {},
  login: () => {},
  setView: () => {},
});

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts);

  const [view, setViewState] = useState<View>('dashboard');
  const [activeId, setActiveId] = useState<string | null>(null);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const setView = (newView: View, id?: string) => {
    setViewState(newView);
    setActiveId(id || null);
  };

  const login = (email: string) => {
    if (email.endsWith('@unimy.edu.my')) {
      setUser(mockUser);
    } else {
      alert('Invalid university email. Please use a @unimy.edu.my address.');
    }
  };

  const logout = () => {
    setUser(null);
    setView('dashboard');
  };

  const addResource = (resource: Omit<Resource, 'id' | 'author' | 'uploadDate' | 'upvotes' | 'downvotes' | 'comments'>) => {
    if (!user) return;
    const newResource: Resource = {
      ...resource,
      id: `res-${Date.now()}`,
      author: user,
      uploadDate: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };
    setResources(prev => [newResource, ...prev]);
  };

  const selectedResource = useMemo(() => {
    return resources.find(res => res.id === activeId) || null;
  }, [activeId, resources]);
  
  const selectedForumPost = useMemo(() => {
    return forumPosts.find(post => post.id === activeId) || null;
  }, [activeId, forumPosts]);

  const contextValue = {
    user,
    resources,
    forumPosts,
    addResource,
    logout,
    login,
    setView,
  };

  const renderContent = () => {
    switch(view) {
      case 'dashboard':
        return <DashboardPage />;
      case 'resourceDetail':
        return selectedResource && <ResourceDetailPage resource={selectedResource} />;
      case 'forums':
        return <ForumsPage />;
      case 'forumDetail':
        return selectedForumPost && <ForumPostDetailPage post={selectedForumPost} />;
      case 'profile':
        // In a real app, you might look up a user by ID from activeId
        // For this mock, we just show the logged-in user's profile
        return user && <ProfilePage user={user} allResources={resources} />;
      default:
        return <DashboardPage />;
    }
  };

  if (!user) {
    return <AuthPage onLogin={login} />;
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <Header onUploadClick={() => setIsUploadModalOpen(true)} />
        <main className="container mx-auto p-4 md:p-8">
          {renderContent()}
        </main>
        {isUploadModalOpen && (
          <UploadModal
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={addResource}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
