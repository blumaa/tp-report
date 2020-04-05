const graphql = require("graphql");
const _ = require("lodash");
const Place = require("../../models/place");
const Report = require("../../models/Report");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = graphql;

//sample data
// let places = [
//   {
//     id: "1",
//     name: "bingos",
//     googleId: "12345",
//     lat: 41,
//     lng: 13,
//     inStock: true
//   },
//   {
//     id: "2",
//     name: "dingos",
//     googleId: "54321",
//     lat: 41,
//     lng: 13,
//     inStock: false
//   },
//   {
//     id: "3",
//     name: "Rewe",
//     googleId: "22222",
//     lat: 3,
//     lng: 13,
//     inStock: false
//   }
// ];

// var terms = [
//   { location: "location of the Wind", id: "1" },
//   { location: "The Final Empire", id: "2" },
//   { location: "The Long Earth", id: "3" }
// ];

// let reports = [
//   {
//     id: "1",
//     itemName: "toilet paper",
//     status: "inStock",
//     createdAt: "sunday, April 5, 2020, 20:20",
//     googleId: "12345"
//   },
//   {
//     id: "2",
//     itemName: "toilet paper",
//     status: "outOfStock",
//     createdAt: "sunday, April 4, 2020, 8:20",
//     googleId: "54321"
//   },
//   {
//     id: "3",
//     itemName: "toilet paper",
//     status: "inStock",
//     createdAt: "sunday, April 3, 2020, 13:12",
//     googleId: "12345"
//   }
// ];

// define the objects

const TermType = new GraphQLObjectType({
  name: "Term",
  fields: () => ({
    id: { type: GraphQLID },
    location: { type: GraphQLString },
  }),
});

const PlaceType = new GraphQLObjectType({
  name: "Place",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    googleId: { type: GraphQLString },
    lat: { type: GraphQLInt },
    lng: { type: GraphQLInt },
    inStock: { type: GraphQLBoolean },
    reports: {
      type: new GraphQLList(ReportType),
      resolve(parent, args) {
        // return _.filter(reports, { googleId: parent.googleId });
        return Report.find({ placeId: parent.id });
      },
    },
  }),
});

const ReportType = new GraphQLObjectType({
  name: "Report",
  fields: () => ({
    id: { type: GraphQLID },
    itemName: { type: GraphQLString },
    status: { type: GraphQLString },
    place: {
      type: PlaceType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(places, { googleId: parent.googleId });
        return Place.findById(parent.placeId);
      },
    },
  }),
});

// define queries and mutations

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    term: {
      type: TermType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        // console.log(typeof args.id);
        // return _.find(terms, { id: args.id });
      },
    },
    place: {
      type: PlaceType,
      args: { googleId: { type: GraphQLString }, id: { type: GraphQLID} },
      resolve(parent, args) {
        // return _.find(places, { googleId: args.googleId });
        return Place.findById(args.id)
      },
    },
    places: {
      type: new GraphQLList(PlaceType),
      args: { lat: { type: GraphQLInt }, lng: { type: GraphQLInt } },
      resolve(parent, args) {
        // return _.filter(places, { lat: args.lat, lng: args.lng });
        return Place.find({})
      },
    },
    report: {
      type: ReportType,
      args: { id: { type: GraphQLID }, status: { type: GraphQLString } },
      resolve(parent, args) {
        // return _.find(reports, { id: args.id });
        return Report.findById(args.id)
      },
    },
    reports: {
      type: new GraphQLList(ReportType),
      resolve(parent, args) {
        // return reports
        return Report.find({})
      },
    },
  },
});

// mutations

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlace: {
      type: PlaceType,
      args: {
        name: { type: GraphQLString },
        googleId: { type: GraphQLString },
        lat: { type: GraphQLInt },
        lng: { type: GraphQLInt },
        inStock: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        let place = new Place({
          name: args.name,
          googleId: args.googleId,
          lat: args.lat,
          lng: args.lng,
          inStock: args.inStock,
        });
        return place.save();
      },
    },
    addReport: {
      type: ReportType,
      args: {
        itemName: { type: GraphQLString },
        status: { type: GraphQLString },
        placeId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let report = new Report({
          itemName: args.itemName,
          status: args.status,
          placeId: args.placeId,
        });
        return report.save();
      },
    },
  },
});

//export the rootquery

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
