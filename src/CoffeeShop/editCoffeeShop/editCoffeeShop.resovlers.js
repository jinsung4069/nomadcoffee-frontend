import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../CoffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                category: true,
              },
            },
          },
        });
        if (!oldShop) {
          return {
            ok: false,
            error: "CoffeeShop not found.",
          };
        }
        const Shop = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            categories: {
              disconnect: oldShop.categories,
              connectOrCreate: processCategories(category),
            },
          },
        });
        console.log(Shop);
      }
    ),
  },
};
