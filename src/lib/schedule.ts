import { useEffect, useState } from "react";

export type Appointment = {
  date: string; // ISO
  time: string;
  unit: string;
  address: string;
  city: string;
  rewardPoints: number;
};

const KEY = "sa-next-appointment";
const EVT = "sa-appointment-change";

export function getAppointment(): Appointment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Appointment) : null;
  } catch {
    return null;
  }
}

export function setAppointment(a: Appointment | null) {
  if (typeof window === "undefined") return;
  if (a) window.localStorage.setItem(KEY, JSON.stringify(a));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
}

export function useAppointment() {
  const [appt, setAppt] = useState<Appointment | null>(null);
  useEffect(() => {
    setAppt(getAppointment());
    const handler = () => setAppt(getAppointment());
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return appt;
}