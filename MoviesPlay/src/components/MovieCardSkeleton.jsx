import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCardSkeleton = () => {
  return (
    <div className="w-37.5">
      
      {/* Poster Skeleton */}
      <Skeleton
        height={225}
        className="rounded-md"
        baseColor="#1f1f1f"
        highlightColor="#2a2a2a"
      />

      {/* Title Skeleton */}
      <div className="mt-2 space-y-2">
        <Skeleton
          height={14}
          width="100%"
          baseColor="#1f1f1f"
          highlightColor="#2a2a2a"
        />
        <Skeleton
          height={14}
          width="70%"
          baseColor="#1f1f1f"
          highlightColor="#2a2a2a"
        />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
