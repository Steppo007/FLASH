import type { TagProps } from 'primereact/tag';

export interface KTagProps extends Omit<TagProps, 'severity'> {
  severity: 'success' | 'info' | 'warning' | 'danger' | 'neutral';
}
