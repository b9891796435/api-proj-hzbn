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

// 校验token
export async function verifyToken(token: string, secret: string) {
  try {
    return await promisifiedVerify(token, secret);
  } catch (err) {
    return null;
  }
}

async function promisifiedVerify(
  token: string,
  secret: string,
): Promise<bigint> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload.uid as bigint);
    });
  });
}
