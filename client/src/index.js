import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App";
import { StoreContext } from 'redux-react-hook';
import store from './store';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";


const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
  });
  
//   client
//   .query({
//     query: gql`
//     {
//         place(googleId: "313402180f019f5e8518af2be02264af561f9328") {
//           name
//           googleId
//           reports {
//             itemName
//             status
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(  <StoreContext.Provider value={store}>  <ApolloProvider client={client}><App /></ApolloProvider></StoreContext.Provider>, document.getElementById('root'));
