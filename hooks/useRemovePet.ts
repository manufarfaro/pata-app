import { Pet } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const deletePet = async (pet: Pet) => (await fetch('/api/pet', {
    method: "Delete",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(pet)
})).json();

export default function useRemovePet(onSuccess: (pet: Pet) => void) {
    return useMutation((pet: Pet) => deletePet(pet), {onSuccess});
}
