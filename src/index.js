const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

// async function main() {
//   // Create a new link
//   const newLink = await prisma.createLink({
//     url: "www.prisma.io",
//     description: "Prisma replaces traditional ORMs"
//   });
//   console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

//   // Read all links from the database and print them to the console
//   const allLinks = await prisma.links();
//   console.log(allLinks);
// }

// main().catch(e => console.error(e));

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => context.prisma.links
    // link: (parent, arg) => {
    //   const result = links.find(link => link.id === arg.id);
    //   return result;
    // }
  },
  Mutation: {
    post: (root, arg, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
    // updateLink: (parent, arg) => {
    //   const index = links.findIndex(link => link.id === arg.id);
    //   links[index] = arg;
    //   return links[index];
    // },
    // deleteLink: (parent, arg) => {
    //   const index = links.findIndex(link => link.id === arg.id);
    //   console.log(index);
    //   const link = links[index];
    //   links.splice(index, 1);
    //   console.log("updatedLinkArray", links);
    //   return link;
    // }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
