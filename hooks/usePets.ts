import { Pet } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getPets = async () => (await fetch('/api/pet')).json();

export const petsCacheKey = "Pets";

export default function usePets() {
    return useQuery<Pet[]>([petsCacheKey], getPets);
}