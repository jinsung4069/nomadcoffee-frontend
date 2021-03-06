import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { createWriteStream, WriteStream } from "fs";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatarURL },
  { loggedInUser }
) => {
  if (avatarURL){
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const { filename, createReadStream } = await avatarURL;
    const readStream = createReadStream();
    const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
  readStream.pipe(WriteStream);
  }
  
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};