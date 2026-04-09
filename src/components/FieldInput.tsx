import type { ChangeEvent } from "react";
import { useRef } from "react";

type FieldInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export const FieldInput = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  helper,
  error,
  required,
  onChange,
  onBlur,
}: FieldInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    const input = inputRef.current;

    if (type === "date" && input) {
      input.focus();

      if (
        typeof (input as HTMLInputElement & { showPicker?: () => void })
          .showPicker === "function"
      ) {
        (input as HTMLInputElement & { showPicker?: () => void }).showPicker();
      }
    }
  };

  const describedBy = error
    ? `${id}-error`
    : helper
      ? `${id}-helper`
      : undefined;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`form-input ${error ? "form-input--error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        required={required}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onBlur={onBlur}
        onDoubleClick={handleDoubleClick}
      />
      {helper && !error && (
        <p id={`${id}-helper`} className="field-helper">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
};
