export interface IUserInputQuery {
  limit: number;
  offset: number;
  sort: String;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  contact: string;
  address?: string;
  isEmailVerified: boolean;
  profilePicture?: string;
}
export interface IPaging {
  endIndex: number;
  hasNextPage: Boolean;
  total: number;
  startIndex: number;
}

export interface IUsers {
  length?: number | undefined;
  Users: IUsersData;
  paging: IPaging;
}

export interface IUsersData {
  __typename: string;
  data: Array<IUser>;
  paging: IPaging;
}

export interface IAuthUserDetail {
  _id: string | null;
  role: string | null;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  contact: string;
  address: string;
}
export interface QueryVariableUser {
  pagingInput: {
    offset: number;
    limit: number;
  };
  query: {
    searchText: string | undefined;
    role?: string[];
  };
}
