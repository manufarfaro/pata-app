// @ts-nocheck
import { Component } from "react";
import { COMET_CHAT as consts } from "../constants/constants";
import { CometChatUserListWithMessages } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/index";
import { CometChat } from "@cometchat-pro/chat";

export default class CometChatUsersNoSSR extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };
  }
  componentDidMount() {
    /**
      Initialize CometChat
      */
    let appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(consts.REGION)
      .build();
    CometChat.init(consts.APP_ID, appSetting).then(
      () => {
        /**
         *Log in user
         */
        const UID = "SUPERHERO1";
        const authKey = consts.AUTH_KEY;
        CometChat.login(UID, authKey).then(
          (user) => {
            this.setState({ user });
          },
          (error) => {
            console.log("Login failed with exception:", {
              error,
            });
          }
        );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }
  render() {
    /**
        Rendering CometChatUserListWithMessages  component of React UIKit
        **/
    if (this.state.user) {
      return (
        <div style={{ width: "100vw", height: "100vh" }}>
          <CometChatUserListWithMessages />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
