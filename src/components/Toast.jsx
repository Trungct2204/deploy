import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return <div className={`toast ${toast.type}`}><CheckCircle2/><span>{toast.message}</span><X/></div>;
}