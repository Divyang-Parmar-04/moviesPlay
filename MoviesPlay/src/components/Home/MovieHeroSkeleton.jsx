import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieHeroSkeleton = () => {
  return (
    <div className="relative h-screen w-full bg-[#0f0f0f]">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-16 lg:px-36">
        <div className="max-w-2xl w-full">
          
          {/* Brand */}
          <Skeleton
            width={120}
            height={16}
            baseColor="#1f1f1f"
            highlightColor="#2a2a2a"
          />

          {/* Title */}
          <div className="mt-4 space-y-3">
            <Skeleton
              height={48}
              width="90%"
              baseColor="#1f1f1f"
              highlightColor="#2a2a2a"
            />
            <Skeleton
              height={48}
              width="70%"
              baseColor="#1f1f1f"
              highlightColor="#2a2a2a"
            />
          </div>

          {/* Meta */}
          <div className="flex gap-4 mt-5">
            <Skeleton width={60} height={14} baseColor="#1f1f1f" highlightColor="#2a2a2a" />
            <Skeleton width={40} height={14} baseColor="#1f1f1f" highlightColor="#2a2a2a" />
            <Skeleton width={120} height={14} baseColor="#1f1f1f" highlightColor="#2a2a2a" />
          </div>

          {/* Overview */}
          <div className="mt-6 space-y-3">
            <Skeleton height={14} width="100%" baseColor="#1f1f1f" highlightColor="#2a2a2a" />
            <Skeleton height={14} width="95%" baseColor="#1f1f1f" highlightColor="#2a2a2a" />
            <Skeleton height={14} width="90%" baseColor="#1f1f1f" highlightColor="#2a2a2a" />
            <Skeleton height={14} width="80%" baseColor="#1f1f1f" highlightColor="#2a2a2a" />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <Skeleton
              width={140}
              height={44}
              borderRadius={6}
              baseColor="#1f1f1f"
              highlightColor="#2a2a2a"
            />
            <Skeleton
              width={170}
              height={44}
              borderRadius={6}
              baseColor="#1f1f1f"
              highlightColor="#2a2a2a"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeroSkeleton;
