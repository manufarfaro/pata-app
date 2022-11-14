import React, { useCallback } from "react";
import { IconButton, ListItemIcon, Stack } from "@mui/material";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useGetNearProfesionals from "../hooks/useGetNearProfesionals";
import { Profesional, ProfesionalNearMe } from "../models/Profesional";

type VetItemProps = {
  vet: ProfesionalNearMe
  onClick: (props: {id: string}) => void
}

function VetItem({ vet, onClick }: VetItemProps) {
  const handleClick = useCallback(() => {
    onClick(vet as Profesional);
  }, [onClick, vet]);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={vet?.user?.name!} src={vet?.user?.image!} />
      </ListItemAvatar>
      <ListItemText
        primary={vet?.user?.name}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              A {vet.distance} Km de distancia
            </Typography>
          </>
        }
      />
      <ListItemIcon>
        <IconButton edge="end" aria-label="comments" onClick={handleClick}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}

type VeterinaryListProps = {
  onClickVet: (props: { id: string }) => void
};

export default function VeterinaryList({ onClickVet }: VeterinaryListProps) {
  const { data } = useGetNearProfesionals();

  if (!data?.length) {
    return <p>No hay profesionales disponibles. Pronto vamos a estar por tu área...</p>;
  }

  return (
    <Stack
      divider={<Divider variant="inset" />}
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      {data?.map(profesional => <VetItem onClick={onClickVet} vet={profesional} key={profesional?.id} />)}
    </Stack>
  );
}
