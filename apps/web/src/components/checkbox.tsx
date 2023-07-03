export default function Checkbox({ disabled, completed, toggleCompleted }: any) {
  return (
    <input
      disabled={disabled}
      type="checkbox"
      className="p-2 rounded-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-0"
      checked={completed}
      onChange={toggleCompleted}
    />
  );
}
