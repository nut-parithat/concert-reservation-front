interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  rows?: number;
}

export default function TextArea({
  label,
  placeholder,
  value = "",
  onChange,
  error,
  rows = 5,
}: Props) {
  return (
    <div className="w-full mb-7">
      {label && <label className="block text-sm mb-2">{label}</label>}

      <div
        className={`flex items-start border rounded-md px-3 py-2 bg-white ${
          error ? "border-red-500" : "border-black"
        }`}
      >
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none text-[16px] resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
