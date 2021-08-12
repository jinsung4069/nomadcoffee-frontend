export default {
  Mutation: {
    createCoffeeShop: async (_, { name, latitude, longitude }) => {
      try {
        const exist = await prisma.user.findFirst({
          where: {
            OR: [
              {
                name,
              },
            ],
          },
        });
        if (exist) {
          throw Error(
            "Username or Email address alreay exist. User another please."
          );
        }
        const data = {
          name,
          ...(latitude && { latitude }),
          ...(longitude && { longitude }),
        };
        const user = await prisma.CoffeeShop.create({
          data,
        });
        return {
          ok: true,
          id: user.id,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
