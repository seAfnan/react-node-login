import { create } from "zustand";

interface NotificationStore {
  notif: string;
  setNotif: (message: string) => void;
}

const notificationStore = create<NotificationStore>((set) => ({
  notif: "",
  setNotif: (msg) => set(() => ({ notif: msg })),
}));

export default notificationStore;
