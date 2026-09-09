import { useCart } from "../context/CartContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div key={toast.id} className={`toast-card toast-${toast.type || "info"}`}>
            <div className="toast-icon">
              {isSuccess && <CheckCircle2 size={18} />}
              {isError && <AlertCircle size={18} />}
              {!isSuccess && !isError && <Info size={18} />}
            </div>
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
