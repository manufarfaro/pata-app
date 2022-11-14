import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Mascotero } from "../models/Mascotero";
import { Profesional } from "../models/Profesional";

const getUserData = async () => (await fetch('/api/user')).json();

export const userDataCacheKey = "userData";

export default function useUserData() {
    return useQuery<User | Profesional | Mascotero>([userDataCacheKey], getUserData);
}