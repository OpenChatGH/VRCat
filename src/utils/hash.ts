import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async hash(password: string): Promise<string> {
    const salt = "vrchat";
    const hashedPasswordBuffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${hashedPasswordBuffer.toString('hex')}`;
  }

  static async verify(storedHash: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedHash.split('.');
    const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');
    const suppliedPasswordBuffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return timingSafeEqual(hashedPasswordBuffer, suppliedPasswordBuffer);
  }
}