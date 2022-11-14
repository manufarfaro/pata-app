import dynamic from "next/dynamic";
import { Suspense, useCallback, useContext, useState } from "react";
import styled from "@emotion/styled";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PetList from "./PetList";
import VeterinaryList from "./VeterinaryList";
import PetDialog from "./PetDialog";
import { Pet } from "@prisma/client";
import usePets, { petsCacheKey } from "../hooks/usePets";
import useRemovePet from "../hooks/useRemovePet";
import { useQueryClient } from "@tanstack/react-query";
import CometChatContext from "../context/CometChatContext";
import ChatDialog from "./ChatDialog";
import useForceUpdate from "../hooks/useForceUpdate";
const  CometChatConversationList = dynamic(() => import("../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/Chats/CometChatConversationList/index").then((mod) => mod.CometChatConversationList), { ssr: false } );

const MascoteroSectionsContainer = styled.section`
  width: 100%;
  text-align: left;
  padding: 1rem 0;
`;

const PetTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    width: auto;
  }
`;

export default function MascoterosHome() {
  const { forceUpdate, forceValue } = useForceUpdate();
  const queryClient = useQueryClient();
  const { data } = usePets();
  const { user } = useContext(CometChatContext);
  const [petDialogOpen, setpetDialogOpen] = useState<boolean>(false);
  const [chatDialogOpen, setChatDialogOpen] = useState<boolean>(false);
  const [userToChat, setUserToChat] = useState<any>(undefined);
  const [editPetMode, setEditPetMode] = useState<boolean>(false);
  const [defaultValuePet, setDefaultValuePet] = useState<Pet | undefined>();
  const removePetMutation = useRemovePet(() => {
    queryClient.invalidateQueries([petsCacheKey])
  });

  const toggleNewPetDialog = useCallback(() => {
    setDefaultValuePet(undefined);
    setEditPetMode(false);
    setpetDialogOpen(prevState => !prevState);
  }, [setDefaultValuePet, setEditPetMode, setpetDialogOpen]);

  const handleCloseChatDialog = useCallback(() => {
    setUserToChat(undefined);
    setChatDialogOpen(false);
  }, [setUserToChat, setChatDialogOpen]);

  const handleOpenChatDialog = useCallback((prop: any) => {
    setUserToChat(prop);
    setChatDialogOpen(true);
  }, []);

  const handleEditPet = useCallback((pet: Pet) => {
    setDefaultValuePet(pet);
    setEditPetMode(true);
    setpetDialogOpen(true);
  }, [setpetDialogOpen, setEditPetMode]);

  const handleRemovePet = useCallback((pet: Pet) => {
    removePetMutation.mutate(pet);
  }, [removePetMutation]);

  const handleSendPetInfo = useCallback(async (user: any, pet: Pet) => {
      const cometChat = (await import("@cometchat-pro/chat")).CometChat;  
      const message = `Ficha Mascota:
  - Nombre: ${pet.name}
  - Tipo: ${pet.type}
  - Raza: ${pet.race}
  - Fecha de Nacimiento: ${new Date(pet.birthDate).toISOString().substring(0, 10)}
  - Detalles: ${pet.details}`;

      const receiverType: string = cometChat.RECEIVER_TYPE.USER;
      let textMessage = new cometChat.TextMessage((user?.uid || user?.userId), message, receiverType);
      await cometChat.sendMessage(textMessage);
      forceUpdate();
  }, []);

  return (
    <MascoteroSectionsContainer>
      <>
        <PetTitleContainer>
          <h1>
            Mascotas
          </h1>
          <IconButton
            sx={{ marginY: "1rem" }}
            color="primary"
            aria-label="nueva mascota"
            onClick={toggleNewPetDialog}
          >
            <AddCircleOutlineOutlined />
          </IconButton>
        </PetTitleContainer>
        <PetDialog
          isOpen={petDialogOpen}
          isEdit={editPetMode}
          defaultValue={defaultValuePet}
          onClose={toggleNewPetDialog}
        />
        <PetList
          pets={data}
          onEdit={handleEditPet}
          onRemove={handleRemovePet}
        />

          {user && <CometChatConversationList key={forceValue} onItemClick={handleOpenChatDialog} />}

        <h1>Profesionales cerca tuyo</h1>
        <VeterinaryList onClickVet={handleOpenChatDialog} />

        <ChatDialog isOpen={chatDialogOpen} user={userToChat} pets={data} onClickSendPetInfo={handleSendPetInfo} onClose={handleCloseChatDialog} />
      </>
    </MascoteroSectionsContainer>
  );
}
