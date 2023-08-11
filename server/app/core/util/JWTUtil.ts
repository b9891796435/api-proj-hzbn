import * as ssri from 'ssri';
import * as jwt from 'jsonwebtoken';

// 生成密码摘要
export function integrity(plain: string): string {
  return ssri.create().update(plain).digest()
    .toString();
}

// 校验密码摘要
export function verify(plain: string, integrity: string): boolean {
  return ssri.checkData(plain, integrity);
}

// 生成token
export function createToken(
  uid: bigint,
  secret: string,
  expiresIn: string,
): string {
  const token = jwt.sign(
    {
      uid,
    },
    secret,
    {
      expiresIn,
    },
  );
  return token;
}
