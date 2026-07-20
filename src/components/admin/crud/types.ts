export type FieldOption = {
  label: string;
  value: string | number;
};

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "url"
  | "boolean"
  | "select"
  | "file"
  | "tags";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  accept?: string;
  min?: number;
  max?: number;
  step?: number;
  colSpan?: 1 | 2;
  options?: FieldOption[];
  optionsEndpoint?: string;
  optionLabel?: string;
  optionValue?: string;
  initialFrom?: (item: Record<string, unknown>) => unknown;
  trueLabel?: string;
  falseLabel?: string;
};

export type ColumnType =
  | "text"
  | "image"
  | "boolean"
  | "date"
  | "currency"
  | "rating"
  | "qr";

export type ColumnConfig = {
  key: string;
  label: string;
  type?: ColumnType;
  maxLength?: number;
  trueLabel?: string;
  falseLabel?: string;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type CrudConfig = {
  title: string;
  description: string;
  endpoint: string;
  createLabel: string;
  singularLabel: string;
  searchPlaceholder?: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  statusOptions?: FilterOption[];
  defaultValues?: Record<string, unknown>;
  multipart?: boolean;
  updateMethod?: "PATCH" | "POST";
  enableQrRegenerate?: boolean;
  qrEndpointSuffix?: string;
};
