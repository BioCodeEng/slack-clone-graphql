import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Home = () => {
  return (
    <Query
      query={
        gql`
        {
          Users {
            id,
            username
          }
        }
        `}
    >
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

// const usersQuery = gql`
//   {
//     Users {
//       id,
//       username
//     }
//   }
// `;
// export default graphql(usersQuery)(Home);

export default Home;
