export default interface UserBo {
  uid: bigint;
  username: string;
  password: string;
  salt: string;
}
