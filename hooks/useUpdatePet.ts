import { Pet } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export type updateInputPet = Omit<Pet, "mascoteroId">

const putPet = async (pet: updateInputPet) => (await fetch('/api/pet', {
    method: "put",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(pet)
})).json();

export default function useUpdatePet(onSuccess: (pet: updateInputPet) => void) {
    return useMutation((pet: updateInputPet) => putPet(pet), {onSuccess});
}
