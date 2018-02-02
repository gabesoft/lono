
export type User = {
  _id?: string,
  email: string,
  name: string,
  imageUrl: string,
  admin: boolean,
  disabled: boolean,
  familyName: string,
  givenName: string,
  locale: string,
  updatedAt?: string
};