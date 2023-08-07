import type { FormData } from 'hooks/useFormData';

export interface TabsProps {
  id: number;
  value: number;
  disableField: boolean;
  pacientData?: FormData;
}
