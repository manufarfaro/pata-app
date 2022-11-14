import dynamic from "next/dynamic";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { Pet } from "@prisma/client";
import styled from "@emotion/styled";
import useForceUpdate from "../hooks/useForceUpdate";
const CometChatMessages = dynamic(
  () =>
    import(
      "../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/Messages/CometChatMessages/index"
    ).then((mod) => mod.CometChatMessages),
  { ssr: false }
);

type ChatDialogProps = {
  isOpen: boolean;
  user: any;
  pets?: Pet[];
  onClose: () => void;
  onClickSendPetInfo?: (user: any, pet: Pet) => void;
};

const PetInfoShareLegend = styled.div`
  max-width: 30%;
  font-size: 0.75rem;
  padding-left: 1rem;
  justify-items: center;
`;

export default function ChatDialog({
  isOpen,
  user,
  pets,
  onClose,
  onClickSendPetInfo,
}: ChatDialogProps) {
  const { forceValue, forceUpdate } = useForceUpdate(); // Used to force a rerender into ChatMessages

  const handlerClickSendPetInfo = (pet: Pet) => {
    if (onClickSendPetInfo) {
      onClickSendPetInfo(user, pet);
      forceUpdate();
    }
  };

  const hasPets = !!pets?.length;

  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen scroll="paper">
      <DialogTitle>
        Conversación con {user?.name || user?.user?.name}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "65px",
          alignItems: "stretch",
        }}
      >
        <DialogContentText>
          {hasPets && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "rgba(20,20,20,0.04)",
                border: "1px solid #eaeaea",
                borderRadius: "5px",
                justifyItems: "center",
              }}
            >
              <PetInfoShareLegend>
                Comparti la ficha de tu mascota al profesional
              </PetInfoShareLegend>
              <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
                <Stack direction="row" spacing={2}>
                  {pets?.map((pet) => (
                    <Chip
                      key={pet.id}
                      avatar={<Avatar>{pet.name.substring(0, 1)}</Avatar>}
                      label={pet?.name}
                      onClick={() => handlerClickSendPetInfo(pet)}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          )}
        </DialogContentText>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <CometChatMessages
            key={forceValue}
            chatWithUser={user?.uid || user?.user?.id}
          />
        </Box>
        <Box sx={{ fontSize: ".5rem" }}>
          Estas conversaciones se auditan para tu seguridad, ante cualquier
          problema podés comunicarte con nosotros mediante el servicio de
          soporte.
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Salir</Button>
      </DialogActions>
    </Dialog>
  );
}
