'use client';
import { useEffect } from 'react';
import { track } from '@/services/analytics';
export function ProjectView({ slug }: { slug: string }) {
  useEffect(() => {
    track('project_view', { projectId: slug });
  }, [slug]);
  return null;
}
