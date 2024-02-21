import { v4 as uuidv4 } from "uuid";

import { client } from "./client";
import { fetchUser } from "./fetchUser";
import { TUser } from "../types/types";

export const saveFn = (id: string, alreadySaved: boolean) => {
  const user: TUser = fetchUser();

  if (!alreadySaved) {
    client
      .patch(id)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [
        {
          _key: uuidv4(),
          userId: user.sub,
          postedBy: {
            _type: "postedBy",
            _ref: user.sub,
          },
        },
      ])
      .commit()
      .then(() => {
        window.location.reload();
      });
  }
};
