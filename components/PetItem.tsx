import { EditAttributesOutlined, EditSharp, KeyboardArrowRight, RemoveCircleOutline } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Pet } from "@prisma/client";
import { useCallback } from "react";

type PetItemProp = {
    pet: Pet;
    onEdit: (pet: Pet) => void,
    onRemove: (pet: Pet) => void
}

export default function PetItem ({ pet, onEdit, onRemove }: PetItemProp) {
    const handleEdit = useCallback(() => {
        onEdit(pet);
    }, [onEdit, pet]);
    const handleRemove = useCallback(() => {
        onRemove(pet);
    }, [onRemove, pet]);
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={pet.name} src={pet.name} />
            </ListItemAvatar>
            <ListItemText
            primary= {pet.name}
            secondary={
                <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    <>
                        {pet.type} - {pet.race} - {new Date(pet.birthDate).toISOString().substring(0,10)} - {pet.details}
                    </>
                </Typography>
            }
            />
            <ListItemIcon>
            <IconButton edge="end" aria-label="editar mascota" onClick={handleEdit}>
                <EditSharp />
            </IconButton>
            <IconButton sx={{ marginLeft: "1rem" }} edge="end" aria-label="borrar mascota" onClick={handleRemove}>
                <RemoveCircleOutline />
            </IconButton>
            </ListItemIcon>
        </ListItem>
    );
}