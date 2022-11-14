import { Pet } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export type InputPet = Omit<Pet, "id" | "mascoteroId">;

const postPet = async (pet: InputPet) => (await fetch('/api/pet', {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(pet)
})).json();

export default function useCreatePet(onSuccess: (pet: InputPet) => void) {
    return useMutation((pet: InputPet) => postPet(pet), {onSuccess});
}
