import { useId } from 'react';

export default function useIdOrFallback(id?: string): string {
  const fallbackId = useId();
  return id ?? fallbackId;
}
