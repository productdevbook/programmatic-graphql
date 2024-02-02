/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { User } from './graph-backend/resolvers/User';
import    { users as Query_users } from './graph-backend/resolvers/Query/users';
import    { user as Query_user } from './graph-backend/resolvers/Query/user';
    export const resolvers: Resolvers = {
      Query: { users: Query_users,user: Query_user },
      
      
      User: User
    }