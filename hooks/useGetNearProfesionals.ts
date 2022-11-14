import { useQuery } from "@tanstack/react-query";
import { ProfesionalNearMe } from "../models/Profesional";

const getUserData = async () => (await fetch('/api/profesional/near-me')).json();

export default function useGetNearProfesionals() {
    return useQuery<ProfesionalNearMe[]>(["profesional", "near-me"], getUserData);
}