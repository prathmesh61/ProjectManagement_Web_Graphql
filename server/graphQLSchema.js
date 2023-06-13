const { gql } = require("graphql-tag");
const ProjectModle = require("./models/ProjectModle");

const { default: mongoose } = require("mongoose");

exports.typeDefs = gql`
  type Project {
    id: ID
    name: String!
    projectName: String!
    phone: Int!
  }
  type Query {
    getProjectList: [Project]
    getProject(id: ID!): Project
  }

  type Mutation {
    updateProject(
      id: ID!
      name: String!
      projectName: String!
      phone: Int!
    ): Project

    addProject(name: String!, projectName: String!, phone: Int!): Project
    deleteProject(id: String): Project
  }
`;

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  });
};

exports.resolvers = {
  Query: {
    getProjectList: async (perent, args) => {
      await connect();
      const result = await ProjectModle.find({});
      return result;
    },

    getProject: async (perent, args) => {
      await connect();
      const result = await ProjectModle.findById(args.id);
      return result;
    },
  },

  Mutation: {
    addProject: async (parent, args) => {
      await connect();
      const result = await ProjectModle.create(args);
      return result;
    },
    updateProject: async (parent, args) => {
      await connect();
      const result = await ProjectModle.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return result;
    },
    deleteProject: async (parent, args) => {
      try {
        await connect();
        const result = await ProjectModle.findByIdAndDelete(args.id);
        return result;
      } catch (error) {
        console.log("Error while delete:", error);
        return false;
      }
    },
  },
};
