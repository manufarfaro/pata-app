import { createContext, ReactNode, useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { User } from "@prisma/client";
import { Mascotero } from "../models/Mascotero";
import { Profesional } from "../models/Profesional";

type CometChatContextData = {
    user: any
};

type CometChatProviderProps = {
    children: ReactNode;
};

const cometChatContextDefaultValue: CometChatContextData = {
    user: undefined
};

const CometChatContext = createContext<CometChatContextData>(cometChatContextDefaultValue);

const appID = process.env["COMETCHAT_APP_ID"] || "";
const region = process.env["COMETCHAT_REGION"] || "";
const authKey = process.env["COMETCHAT_AUTH_KEY"] || "";

function CometChatProvider ({ children }: CometChatProviderProps) {
    const { data } = useUserData();
    const [user, setUser] = useState<any>();


    const initCometChat = async (cometChat: any, sessionUser: User) => {
        const appSetting = new cometChat.
            AppSettingsBuilder()
                .subscribePresenceForAllUsers()
                .setRegion(region)
                .build();

        await cometChat.init(appID, appSetting);

        const cometUser = new cometChat.User(sessionUser.id);
        cometUser.setName(sessionUser.name!);

        try {
            setUser(await cometChat.login(sessionUser.id, authKey));
        } catch (error) {
            setUser(await cometChat.createUser(cometUser, authKey));
        }
    }

    useEffect(() => {
        window.CometChat = require('@cometchat-pro/chat').CometChat;
        const sessionUser = (data as Mascotero | Profesional)?.user?.name ? (data as Mascotero | Profesional)?.user : data as User;

        if (data && !user && sessionUser) {
            initCometChat(window.CometChat, sessionUser);
        }
    }, [data, user]);

    return <CometChatContext.Provider value={{ user }} ><>{children}</></CometChatContext.Provider> ;
}

const CometChatConsumer = CometChatContext.Consumer;

export {
    CometChatContext as default,
    CometChatProvider,
    CometChatConsumer
};