import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useMediaQuery } from "react-responsive";


const MovieDetailsSkeleton = () => {
    const isMobile = useMediaQuery({ maxWidth: 640 });
    return (
        <>
            {/* ================= HERO SECTION ================= */}
            <SkeletonTheme baseColor="#1f1f1f" highlightColor="#2a2a2a">

                <div className="relative h-[85vh] bg-black pb-120 pt-120 md:py-70">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/20"></div>

                    <div className="relative z-10 flex h-full items-center px-6 md:px-16 lg:px-36">
                        <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full">

                            {/* Poster Skeleton */}
                            <Skeleton
                                height={330}
                                width={220}
                                borderRadius={12}
                                baseColor="#1f1f1f"
                                highlightColor="#2a2a2a"
                            />

                            {/* Info Skeleton */}
                            <div className="flex-1 space-y-4">
                                <Skeleton height={42} width="70%" baseColor="#1f1f1f" />
                                <Skeleton height={20} width="50%" />

                                {/* Meta */}
                                <div className="flex gap-4 mt-4">
                                    <Skeleton height={16} width={60} />
                                    <Skeleton height={16} width={60} />
                                    <Skeleton height={16} width={80} />
                                </div>

                                {/* Genres */}
                                <div className="flex gap-2 mt-4">
                                    {Array(3)
                                        .fill(0)
                                        .map((_, i) => (
                                            <Skeleton
                                                key={i}
                                                height={26}
                                                width={80}
                                                borderRadius={999}
                                            />
                                        ))}
                                </div>

                                {/* Overview */}
                                <div className="space-y-2 mt-6">
                                    <Skeleton height={14} width="100%" />
                                    <Skeleton height={14} width="95%" />
                                    <Skeleton height={14} width="90%" />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 mt-8">
                                    <Skeleton height={48} width={140} />
                                    <Skeleton height={48} width={200} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= ABOUT SECTION ================= */}
                <div className="px-6 md:px-16 lg:px-36 py-14">

                    <Skeleton height={32} width={120} className="mb-6" />

                    <div className="flex flex-col md:flex-row gap-10">

                        {/* Backdrop Skeleton */}
                        <Skeleton

                            height={isMobile ? 200 : 280}
                            width={isMobile ? "100%" : 480}
                            borderRadius={12}
                        />

                        {/* Info Skeleton */}
                        <div className="flex-1 space-y-3">
                            <Skeleton height={16} width="60%" />
                            <Skeleton height={16} width="55%" />
                            <Skeleton height={16} width="50%" />
                            <Skeleton height={16} width="65%" />

                            <div className="pt-4 space-y-2">
                                <Skeleton height={14} width="100%" />
                                <Skeleton height={14} width="95%" />
                                <Skeleton height={14} width="90%" />
                            </div>
                        </div>
                    </div>

                    {/* ================= CAST SECTION ================= */}
                    <div className="mt-16">
                        <Skeleton height={32} width={120} className="mb-6" />

                        <div className="flex gap-6 overflow-x-hidden">
                            {Array(8)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className="min-w-30 text-center space-y-2">
                                        <Skeleton
                                            height={100}
                                            width={100}
                                            circle
                                        />
                                        <Skeleton height={14} width={80} />
                                        <Skeleton height={12} width={60} />
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* ================= VIDEO PLAYER ================= */}
                    <div className="mt-20 flex justify-center">
                        <Skeleton
                            height={320}
                            width="100%"
                            borderRadius={12}
                            className="max-w-5xl"
                        />
                    </div>

                </div>
            </SkeletonTheme>

        </>
    );
};

export default MovieDetailsSkeleton;
