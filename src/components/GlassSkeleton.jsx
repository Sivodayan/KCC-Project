import React from 'react';

/**
 * GlassSkeleton Primitive
 * Flexible frosted glass skeleton block with animated shimmer highlight.
 */
export function GlassSkeleton({
  className = '',
  variant = 'light', // 'light' | 'dark' | 'emerald'
  rounded = 'rounded-xl',
  style = {}
}) {
  const surfaceClass =
    variant === 'dark'
      ? 'glass-surface-dark glass-shimmer-dark'
      : variant === 'emerald'
      ? 'glass-surface-emerald glass-shimmer'
      : 'glass-surface glass-shimmer';

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`${surfaceClass} ${rounded} ${className} relative overflow-hidden select-none pointer-events-none`}
    />
  );
}

/**
 * GlassEventSkeleton
 * Full-fidelity frosted glass skeleton replicating the layout of Facebook Post embed cards
 * in SchoolEvents while the iframe is loading from the network.
 */
export function GlassEventSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-10 w-full h-full p-4 flex flex-col justify-between glass-surface glass-swipe-diagonal rounded-3xl overflow-hidden pointer-events-none transition-opacity duration-500 ease-out"
    >
      {/* Specular top light streak */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-pale to-transparent opacity-80" />

      {/* Header: Avatar + Author + Timestamp */}
      <div className="flex items-center gap-3">
        {/* Avatar circle with emerald glass glow */}
        <div className="w-10 h-10 rounded-full glass-surface-emerald glass-shimmer shrink-0 border border-white/60 shadow-xs" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-32 rounded-full glass-surface glass-shimmer" />
          <div className="h-2 w-20 rounded-full glass-surface glass-shimmer opacity-70" />
        </div>
        {/* Subtle Facebook logo shimmer */}
        <div className="w-6 h-6 rounded-full glass-surface glass-shimmer opacity-60 shrink-0" />
      </div>

      {/* Post Text Description lines */}
      <div className="space-y-2 my-3">
        <div className="h-2.5 w-full rounded-full glass-surface glass-shimmer" />
        <div className="h-2.5 w-5/6 rounded-full glass-surface glass-shimmer" />
        <div className="h-2.5 w-2/3 rounded-full glass-surface glass-shimmer opacity-80" />
      </div>

      {/* Main Media Block (Photo / Video Area) */}
      <div className="relative flex-1 w-full min-h-[200px] rounded-2xl glass-surface-emerald glass-shimmer overflow-hidden border border-white/60 shadow-inner flex items-center justify-center">
        {/* Subtle glass emblem icon in media center */}
        <div className="w-12 h-12 rounded-2xl glass-surface glass-pulse border border-white/80 shadow-md flex items-center justify-center text-brand-forest/60">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Footer Actions: Like, Comment, Share Skeleton */}
      <div className="pt-3 border-t border-brand-pale/40 flex items-center justify-around">
        <div className="h-5 w-16 rounded-full glass-surface glass-shimmer" />
        <div className="h-5 w-20 rounded-full glass-surface glass-shimmer" />
        <div className="h-5 w-16 rounded-full glass-surface glass-shimmer" />
      </div>
    </div>
  );
}

/**
 * GlassCardSkeleton
 * Generic multi-purpose card skeleton for media grids and previews.
 */
export function GlassCardSkeleton({ height = 'h-48', className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`glass-surface glass-swipe-diagonal rounded-2xl p-4 flex flex-col gap-3 overflow-hidden ${height} ${className} pointer-events-none`}
    >
      <div className="w-full flex-1 rounded-xl glass-surface-emerald glass-shimmer" />
      <div className="space-y-1.5">
        <div className="h-3 w-3/4 rounded-full glass-surface glass-shimmer" />
        <div className="h-2 w-1/2 rounded-full glass-surface glass-shimmer opacity-70" />
      </div>
    </div>
  );
}

/**
 * GlassRouteLoader
 * Full route loading view shown during React Suspense page transitions.
 * Combines top sweeping progress line with frosted skeleton page wireframe.
 */
export function GlassRouteLoader() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col relative overflow-hidden bg-brand-white/80">
      {/* Top running route bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-30 glass-route-bar" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 flex-1 flex flex-col">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-20 rounded-full glass-surface glass-shimmer" />
          <span className="text-slate-300">/</span>
          <div className="h-4 w-32 rounded-full glass-surface glass-shimmer opacity-70" />
        </div>

        {/* Page Header Hero skeleton */}
        <div className="text-center max-w-2xl mx-auto space-y-3 w-full py-4">
          <div className="h-10 w-3/4 mx-auto rounded-2xl glass-surface-emerald glass-shimmer" />
          <div className="h-4 w-1/2 mx-auto rounded-full glass-surface glass-shimmer opacity-75" />
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          <div className="h-80 rounded-3xl glass-surface glass-shimmer p-4 flex flex-col gap-3">
            <div className="h-44 rounded-2xl glass-surface-emerald glass-shimmer" />
            <div className="h-4 w-3/4 rounded-full glass-surface glass-shimmer mt-2" />
            <div className="h-3 w-1/2 rounded-full glass-surface glass-shimmer opacity-70" />
          </div>
          <div className="h-80 rounded-3xl glass-surface glass-shimmer p-4 flex flex-col gap-3 hidden md:flex">
            <div className="h-44 rounded-2xl glass-surface-emerald glass-shimmer" />
            <div className="h-4 w-3/4 rounded-full glass-surface glass-shimmer mt-2" />
            <div className="h-3 w-1/2 rounded-full glass-surface glass-shimmer opacity-70" />
          </div>
          <div className="h-80 rounded-3xl glass-surface glass-shimmer p-4 flex flex-col gap-3 hidden lg:flex">
            <div className="h-44 rounded-2xl glass-surface-emerald glass-shimmer" />
            <div className="h-4 w-3/4 rounded-full glass-surface glass-shimmer mt-2" />
            <div className="h-3 w-1/2 rounded-full glass-surface glass-shimmer opacity-70" />
          </div>
        </div>
      </div>
    </div>
  );
}
