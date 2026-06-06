import type { Profile, ProfileId } from "../types";

export const PROFILES: Record<ProfileId, Profile> = {
  hulya: {
    id: "hulya",
    name: "Hülya",
    fullName: "Hülya Tofta",
    role: "Client Advisor · Louis Vuitton, İstinye Park",
    context: "Luxury retail — müşteriler ve yöneticilerle İngilizce iletişim",
    accent: "#9c5a3c",
    available: true,
  },
  alper: {
    id: "alper",
    name: "Alper",
    fullName: "Alper Tofta",
    role: "Mağaza Müdürü · Zuhal Müzik, Akasya AVM",
    context: "Müzik & perakende yöneticiliği",
    accent: "#7a6a48",
    available: false, // 2. fazda açılacak
  },
};

export const PROFILE_LIST = Object.values(PROFILES);
