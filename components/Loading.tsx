"use client";

import React from "react";

export type LoadingProps = {
  mode?: "spinner" | "skeleton" | "inline";
  message?: string;
  count?: number; // skeleton item count
  className?: string;
};

export default function Loading({
  mode = "spinner",
  message,
  count = 3,
  className = "",
}: LoadingProps) {
  if (mode === "skeleton") {
    const items = Array.from({ length: count });
    return (
      <div aria-busy="true" className={`space-y-6 ${className}`} role="status">
        {items.map((_, i) => (
          <div key={i} className="animate-pulse flex flex-col space-y-3">
            <div className="bg-gray-200 dark:bg-gray-700 h-44 rounded-md w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
        {message && <div className="text-sm text-gray-500">{message}</div>}
      </div>
    );
  }

  if (mode === "inline") {
    return (
      <div
        className={`flex items-center space-x-3 ${className}`}
        aria-busy="true"
      >
        <svg
          className="w-5 h-5 animate-spin text-orange-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-sm text-gray-600">{message ?? "Loading..."}</span>
      </div>
    );
  }

  // default spinner full-screen / center
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 ${className}`}
      aria-busy="true"
      role="status"
    >
      <svg
        className="w-12 h-12 animate-spin text-orange-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      {message && <div className="mt-3 text-sm text-gray-600">{message}</div>}
    </div>
  );
}
