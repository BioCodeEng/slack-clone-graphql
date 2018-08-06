import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const usersQuery = gql`
  {
    Users {
      id,
      username
    }
  }
`;

const Home = () => {
  return (
    <Query query={usersQuery}>
      {({ loading, error, data }) => {
        const { Users: users } = data;
        if (loading) {
          return (
            <div>
              loading
            </div>
          );
        }
        return (
          <div>
            {users.map(user => (
              <div key={user.id}>
                {user.username}
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

// const Home = ({ data: { loading, Users: users, error } }) => {
//   if (loading) {
//     return (
//       <div>
//         loading
//       </div>
//     );
//   }
//   return (
//     <div>
//       {users.map(user => (
//         <div key={user.id}>
//           {user.username}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default graphql(usersQuery)(Home);

export default Home;
