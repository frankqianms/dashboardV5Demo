/**
 * Retrive sample data
 * @returns data for list widget
 */
import {TeamsUserCredentialContext} from "../internal/singletonContext";
import {
  createMicrosoftGraphClientWithCredential,
  TeamsUserCredential,
} from "@microsoft/teamsfx";
import { ListModel } from "../models/listModel";
import { loginAction } from "../internal/login";

export const getListData = async (): Promise<ListModel[]> => {
  await loginAction(["User.Read"]);
  let credential = TeamsUserCredentialContext.getInstance().getCredential();
  const graphClient = createMicrosoftGraphClientWithCredential(credential, [
    "User.Read",
  ]);
  const me = await graphClient.api("/me").get();
  return [
    {
      id: me.id,
      title: me.displayName,
      content: me.mail,
    },
  ];
  // {
  //   id: "id1",
  //   title: "Lorem ipsum",
  //   content: "Lorem ipsum dolor sit amet",
  // },
  // {
  //   id: "id2",
  //   title: "Lorem ipsum",
  //   content: "Lorem ipsum dolor sit amet",
  // },
  // {
  //   id: "id3",
  //   title: "Lorem ipsum",
  //   content: "Lorem ipsum dolor sit amet",
  // },
}
