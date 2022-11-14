import dynamic from "next/dynamic";
import { useCallback, useContext, useState } from "react";
import styled from "@emotion/styled";
import { CircularProgress, Switch } from "@mui/material";
import { Profesional } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import CometChatContext from "../context/CometChatContext";
import useUpdateProfesionalOnlineStatus from "../hooks/useUpdateProfesionalOnlineStatus";
import useUserData, { userDataCacheKey } from "../hooks/useUserData";
import ChatDialog from "./ChatDialog";

const  CometChatConversationList = dynamic(() => import("../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/Chats/CometChatConversationList/index").then((mod) => mod.CometChatConversationList), { ssr: false } )

const ProfesionalSectionsContainer = styled.section`
  width: 100%;
  text-align: left;
`;

const SwitchStatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function ProfesionalHome() {
  const queryClient = useQueryClient();
  const { data } = useUserData();
  const { user } = useContext(CometChatContext);
  const [chatDialogOpen, setChatDialogOpen] = useState<boolean>(false);
  const [userToChat, setUserToChat] = useState<any>(undefined);
  const { mutate, isLoading } = useUpdateProfesionalOnlineStatus(() => {
    queryClient.invalidateQueries([userDataCacheKey]);
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    mutate({ isOnline : checked });
  }, [mutate]);

  const handleCloseChatDialog = useCallback(() => {
    setUserToChat(undefined);
    setChatDialogOpen(false);
  }, [setUserToChat, setChatDialogOpen]);

  const handleOpenChatDialog = useCallback((prop: any) => {
    setUserToChat(prop);
    setChatDialogOpen(true);
  }, []);

  if (!(data as Profesional)?.profesionalVerified) {
    return (<p>Todavia estamos verificando tu cuenta, puede tardar hasta 24hs en verificarse.</p>);
  }

  return (
    <ProfesionalSectionsContainer>
      <h1>Disponible</h1>
      <SwitchStatusContainer>
        <Switch
          checked={(data as Profesional)?.isOnline}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          disabled={isLoading}
        />
        {isLoading && <CircularProgress size="1.5rem"  />}
      </SwitchStatusContainer>
      {user && <CometChatConversationList onItemClick={handleOpenChatDialog} />}
      <ChatDialog isOpen={chatDialogOpen} user={userToChat} onClose={handleCloseChatDialog} />
    </ProfesionalSectionsContainer>
  );
}
