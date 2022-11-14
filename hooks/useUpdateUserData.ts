import { useMutation } from "@tanstack/react-query";
import { Mascotero } from "../models/Mascotero";
import { NewUserInputData } from "../models/NewUserInputData";
import { Profesional } from "../models/Profesional";

const postUserData = async (input: NewUserInputData) => (await fetch('/api/user', {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
})).json();

export default function useUpdateUserData(onSuccess: (userData: Mascotero | Profesional) => void) {
    return useMutation((userData: NewUserInputData) => postUserData(userData), {onSuccess});
}
