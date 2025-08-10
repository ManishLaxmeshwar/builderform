export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  passwordRule?: boolean; // min 8 chars, at least one number
}

export interface DerivedFieldConfig {
  parentIds: string[];
  formula: string; // JS expression or logic string
}

export interface FormField {
  required: any;
  id: string;
  type: FieldType;
  label: string;
  defaultValue?: string | number | boolean;
  options?: string[];
  validations: ValidationRules;
  derived?: DerivedFieldConfig;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}
