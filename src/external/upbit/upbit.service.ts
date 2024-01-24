import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UpbitService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async generateAccessToken(queryString?: string): Promise<string> {
    const accessKey = process.env.UPBIT_ACCESS_KEY || '';
    const secretKey = process.env.UPBIT_SECRET_KEY || '';

    let queryHash;

    const payload = {
      access_key: accessKey,
      nonce: uuid(),
    };

    if (queryString) {
      const query = encodeURIComponent(queryString);
      const hash = createHash('sha512');
      queryHash = hash.update(query, 'utf-8').digest('hex');
      payload['query_hash'] = queryHash;
      payload['query_hash_alg'] = 'SHA512';
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
    });

    return accessToken;
  }

  async getCurrentPrice({
    base,
    counter,
  }: {
    base: string;
    counter: string;
  }): Promise<number> {
    const queryString = 'markets=KRW-BTC';
    const token = await this.generateAccessToken(queryString);

    console.log(base, counter);

    const response = await this.httpService
      .get(`https://api.upbit.com/v1/ticker?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .toPromise();

    return 1;
  }
}
