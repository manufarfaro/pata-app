import { useMutation } from "@tanstack/react-query";

type UpdateAvailabilityProfesionalData = {
    isOnline: boolean;
}

const postUpdateOnlineStatus = async (isOnline: UpdateAvailabilityProfesionalData) => (await fetch('/api/profesional/availability', {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(isOnline)
})).json();

export default function useUpdateProfesionalOnlineStatus(onSuccess: (isOnline: UpdateAvailabilityProfesionalData) => void) {
    return useMutation((isOnline: UpdateAvailabilityProfesionalData) => postUpdateOnlineStatus(isOnline), {onSuccess});
}
