import { useContext } from "react";
import dynamic from "next/dynamic";
import CometChatContext from "../context/CometChatContext";

const  CometChatConversationListInternal = dynamic(() => import("./../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/index").then((mod) => mod.CometChatConversationList), { ssr: false } )
console.log("jhg", CometChatConversationListInternal);

type CometChatConversationListProps = {
    onItemClick: (prop: any) => void
}

export default function CometChatConversationList({ onItemClick }: CometChatConversationListProps) {
    const { user } = useContext(CometChatContext);


    return (<CometChatConversationListInternal onItemClick={onItemClick} />);
}