import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAysnc = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAysnc(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(stroedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = stroedPassword.split('.');
    const buf = (await scryptAysnc(suppliedPassword, salt, 64)) as Buffer;


  return buf.toString('hex') === hashedPassword;
  }
}