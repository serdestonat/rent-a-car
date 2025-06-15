// components/WarningModal.tsx
"use client";

export const WarningModal = ({
  isOpen,
  message,
  type = "warning", // 'success' veya 'warning'
  onClose,
}: {
  isOpen: boolean;
  message: string;
  type?: "success" | "warning";
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const iconConfig = {
    warning: {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      ),
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
      iconColor: "text-yellow-500 dark:text-yellow-400",
    },
    success: {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-500 dark:text-green-400",
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-xl animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <div className={`${iconConfig[type].bgColor} p-3 rounded-full`}>
            <svg
              className={`w-8 h-8 ${iconConfig[type].iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {iconConfig[type].icon}
            </svg>
          </div>

          <p className="text-center text-lg font-medium text-neutral-800 dark:text-neutral-200">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
