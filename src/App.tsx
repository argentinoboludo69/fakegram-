import { useState, useEffect, useRef } from 'react';
import { INITIAL_STORIES, INITIAL_POSTS, generateMorePosts, type Post, type Story } from './data';
import { StoryCircle, PostCard, StoryViewer } from './components/AbsurdoComponents';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, PlusSquare, Play, Search, Home, User } from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, []); // Only run once on mount

  const loadMorePosts = () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setLoading(true);

    setTimeout(() => {
      setPosts((prev) => {
        const newPosts = generateMorePosts(prev.length, 5);
        return [...prev, ...newPosts];
      });
      setLoading(false);
      isLoadingRef.current = false;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-lg border-b border-zinc-900 px-4 h-14 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-logo tracking-wide cursor-pointer">
          AbsurdoGram
        </h1>
        <div className="flex items-center gap-5">
           <Heart size={24} className="cursor-pointer" />
           <MessageCircle size={24} className="cursor-pointer" />
        </div>
      </header>

      <main className="w-full max-w-xl mx-auto pb-20">
        {/* Stories Tray */}
        <section className="py-4 border-b border-zinc-900 mb-2 overflow-hidden bg-black">
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 scroll-smooth">
            {INITIAL_STORIES.map((story) => (
              <StoryCircle
                key={story.id}
                story={story}
                onClick={() => setActiveStory(story)}
              />
            ))}
          </div>
        </section>

        {/* Feed */}
        <section className="px-0">
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
        </section>

        {/* Loading Spiner for Infinite Scroll */}
        <div 
          ref={observerTarget} 
          className="w-full py-12 flex justify-center items-center"
        >
          {loading && (
             <div className="w-6 h-6 border-2 border-zinc-600 border-t-zinc-200 rounded-full animate-spin" />
          )}
        </div>
      </main>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <StoryViewer 
                story={activeStory} 
                onClose={() => setActiveStory(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-900 px-6 h-14 flex justify-between items-center z-40 max-w-xl mx-auto backdrop-blur-xl bg-opacity-95">
          <Home size={26} className="cursor-pointer" />
          <Search size={26} className="cursor-pointer text-zinc-400" />
          <PlusSquare size={26} className="cursor-pointer text-zinc-400" />
          <Play size={26} className="cursor-pointer text-zinc-400" />
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1.5px] cursor-pointer">
             <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-[1px]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/da/Choquei.jpg" 
                  className="w-full h-full rounded-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
             </div>
          </div>
      </nav>
    </div>
  );
}
