import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, CheckCircle2, Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState } from "react";
import type { Post, Story } from "../data";

// --- Components ---

interface StoryCircleProps {
  story: Story;
  onClick: () => void;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({ story, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 shrink-0 p-1 group"
      id={`story-${story.id}`}
    >
      <div className="relative p-[2.5px] rounded-full story-gradient shadow-lg">
        <div className="p-[2.5px] bg-black rounded-full">
          <img
            src={story.avatar}
            alt={story.username}
            className="w-16 h-16 rounded-full object-cover grayscale-0 group-active:scale-95 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>
        {story.type === "video" && (
          <div className="absolute bottom-1 right-1 p-1 bg-red-600 rounded-full border-2 border-black">
            <Play size={10} fill="white" className="text-white" />
          </div>
        )}
      </div>
      <span className="text-[11px] text-zinc-300 font-medium truncate w-20 text-center">
        {story.username.replace("@", "")}
      </span>
    </button>
  );
};

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = (e?: React.MouseEvent | React.TouchEvent) => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto bg-black mb-10 md:mb-16"
      id={`post-${post.id}`}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <img src={post.userAvatar} alt="" className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm cursor-pointer">{post.username}</span>
            {post.isVerified && <CheckCircle2 size={14} className="text-blue-500 fill-blue-500" />}
          </div>
        </div>
        <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
      </div>

      {/* Post Image */}
      <div className="relative aspect-square w-full bg-zinc-900 overflow-hidden" onDoubleClick={() => toggleLike()}>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart
              size={24}
              className={`cursor-pointer transition-colors ${liked ? "fill-red-500 text-red-500" : "text-white"}`}
              onClick={() => toggleLike()}
            />
            <MessageCircle size={24} className="cursor-pointer" />
            <Send size={24} className="cursor-pointer" />
          </div>
          <Bookmark size={24} className="cursor-pointer" />
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-2">
          {likeCount.toLocaleString()} curtidas
        </div>

        {/* Caption */}
        <div className="mb-2">
             <h2 className="font-bold text-lg leading-tight mb-2 uppercase tracking-wide italic">{post.title}</h2>
             <p className="text-sm">
                <span className="font-semibold mr-2">{post.username}</span>
                <span className="text-gray-400">#noticia #urgente #absurdo</span>
             </p>
        </div>

        {/* Comments Preview */}
        <button className="text-gray-400 text-sm mb-2 block">Ver todos os {post.comments.length} comentários</button>

        {post.comments.slice(0, 2).map((comment) => (
          <div key={comment.id} className="text-sm mb-1">
            <span className="font-semibold mr-2">{comment.username}</span>
            <span className="text-gray-200">{comment.text}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
};

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  if (story.type === "video") {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col md:p-10">
        <button onClick={onClose} className="absolute top-4 right-4 z-[60] p-2 text-white bg-black/50 rounded-full">
          <X size={24} />
        </button>
        <div className="flex-1 flex flex-col items-center justify-center relative bg-zinc-950 p-4 md:rounded-2xl">
          <div className="mb-6 text-center max-w-md">
             <h3 className="text-2xl font-bold text-red-500 mb-2">{story.groupName}</h3>
             <p className="text-gray-300 italic">{story.description}</p>
          </div>
          <div className="w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden border border-zinc-800">
             <iframe
                src={`${story.videoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
             />
          </div>
           <div className="mt-8 p-4 bg-zinc-900/50 rounded-xl max-w-md w-full border border-white/5">
              <p className="text-sm text-gray-400 text-center uppercase tracking-widest font-semibold">Espaço Publicitário</p>
              <div className="h-20 flex items-center justify-center font-mono text-zinc-600">ANUNCIE AQUI O SEU ABSURDO</div>
           </div>
        </div>
      </div>
    );
  }

  const photos = story.photos || [];

  const nextPhoto = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (photoIndex < photos.length - 1) {
      setPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-[60] p-2 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors">
          <X size={24} />
        </button>

        <div className="relative w-full max-w-[420px] aspect-[9/16] md:aspect-[9/16] bg-zinc-900 md:rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
           {/* Progress Bars */}
           <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5">
             {photos.map((_, i) => (
                <div key={i} className="h-[2px] flex-1 bg-white/20 overflow-hidden rounded-full">
                    <motion.div
                       initial={{ width: 0 }}
                       animate={{ width: i === photoIndex ? "100%" : i < photoIndex ? "100%" : "0%" }}
                       transition={{ duration: 5, ease: "linear" }}
                       className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                       onAnimationComplete={() => {
                          if (i === photoIndex && photoIndex < photos.length - 1) {
                             nextPhoto();
                          }
                       }}
                    />
                </div>
             ))}
           </div>

           {/* User Header */}
           <div className="absolute top-8 left-4 z-20 flex items-center gap-3">
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                <img src={story.avatar} className="w-8 h-8 rounded-full border border-black" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm leading-tight drop-shadow-md">{story.username}</span>
                <span className="text-white/70 text-[10px] font-medium drop-shadow-md">Patrocinado</span>
              </div>
           </div>

           {/* Navigation overlays */}
           <div className="absolute inset-0 z-10 flex">
              <div className="w-1/3 h-full cursor-pointer" onClick={() => prevPhoto()} />
              <div className="w-2/3 h-full cursor-pointer" onClick={() => nextPhoto()} />
           </div>

           {/* Carousel */}
           <AnimatePresence mode="wait">
              <motion.div
                key={photoIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                  {photos[photoIndex].isTitleSlide ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black p-10 text-center">
                       <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="w-24 h-24 mb-6 rounded-full p-1 bg-gradient-to-r from-red-500 to-orange-500"
                       >
                          <img src={story.avatar} alt="" className="w-full h-full rounded-full border-4 border-black object-cover" />
                       </motion.div>
                       <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                          {story.groupName}
                       </h2>
                       <div className="h-1 w-20 bg-red-600 mx-auto mb-6" />
                       <p className="text-gray-400 font-mono text-sm uppercase tracking-[0.2em]">Exclusivo AbsurdoGram</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center bg-black">
                      <div className="w-full aspect-[4/5] relative shadow-2xl overflow-hidden border-y border-zinc-900">
                        <img
                          src={photos[photoIndex].url}
                          alt=""
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {photos[photoIndex].caption && (
                         <div className="p-8 pb-32 w-full">
                            <p className="text-white text-xl font-bold italic text-center drop-shadow-xl leading-relaxed">
                              "{photos[photoIndex].caption}"
                            </p>
                         </div>
                      )}
                    </div>
                  )}
              </motion.div>
           </AnimatePresence>

           {/* Reply Input (Mock) */}
           <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-3 items-center">
              <div className="flex-1 h-10 rounded-full border border-white/20 bg-transparent px-4 flex items-center text-white/50 text-xs">
                Enviar mensagem...
              </div>
              <Heart size={24} className="text-white" />
              <Send size={24} className="text-white" />
           </div>

           {/* Desktop Arrows */}
           <div className="hidden md:block">
              {photoIndex > 0 && (
                <button onClick={() => prevPhoto()} className="absolute left-[-70px] top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full text-white z-20 transition-all border border-white/5">
                  <ChevronLeft size={32} />
                </button>
              )}
              {photoIndex < photos.length - 1 && (
                <button onClick={() => nextPhoto()} className="absolute right-[-70px] top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full text-white z-20 transition-all border border-white/5">
                  <ChevronRight size={32} />
                </button>
              )}
           </div>
        </div>
    </div>
  );
};

