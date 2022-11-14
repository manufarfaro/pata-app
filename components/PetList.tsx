import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { Pet } from "@prisma/client";
import { useMemo } from "react";
import PetItem from "./PetItem";

type PetListProp = {
    pets?: Pet[],
    onEdit: (pet: Pet) => void,
    onRemove: (pet: Pet) => void
};

export default function PetList ({ pets, onEdit, onRemove }: PetListProp) {
    const petList = useMemo(() => pets?.map((pet: Pet) => <PetItem key={pet.id} pet={pet} onEdit={onEdit} onRemove={onRemove} />), [pets, onEdit, onRemove]);

    if (!pets?.length) return <p>No hay mascotas</p>;

    return (
        <Stack
            divider={<Divider variant="inset" />}
            sx={{ width: "100%", bgcolor: "background.paper" }}
        >
            {petList}
        </Stack>
    );
}