"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export type EmptyStateProps = {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: { label: string; onClick?: () => void } | null;
  className?: string;
};

export default function EmptyState({
  title = "No items found",
  message = "Try adjusting your filters or try again later.",
  icon,
  action = null,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[60vh] px-4 text-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 text-gray-400">
        {icon ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        )}
      </div>

      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
        {title}
      </h2>
      <p className="mt-1 text-sm sm:text-base text-gray-500 max-w-md">
        {message}
      </p>

      {action && (
        <div className="mt-6">
          <Button onClick={action.onClick}>{action.label}</Button>
        </div>
      )}
    </div>
  );
}
