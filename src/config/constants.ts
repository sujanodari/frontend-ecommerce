const superAdmin: string = process.env.SUPER_ADMIN as string;
const admin: string = process.env.ADMIN as string;

export default {
  roles: {
    superAdmin,
    admin,
  },
};
