import * as crypto from 'crypto';

export class StringUtil {
  static encryptSHA256(source: string) {
    const hash = crypto.createHash('sha256');
    hash.update(source);
    return hash.digest('hex');
  }

  static encryptBase64(source: string) {
    return Buffer.from(source).toString('base64');
  }

  static generateShortHash(source: string) {
    const hash = this.encryptBase64(source);
    return hash.slice(0, 8);
  }

  static extractDomainFromUrl(url: string) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (error) {
      console.error('Invalid URL:', error.message);
      return null;
    }
  }

  static buildShortUrl(id: number, url: string, domain: string) {
    const sourceDomain = this.extractDomainFromUrl(url);
    return `${domain}${this.generateShortHash(sourceDomain)}${id}`;
  }
}
