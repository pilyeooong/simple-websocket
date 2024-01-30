import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

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

  async getPriceData({
    base,
    counter,
  }: {
    base: string;
    counter: string;
  }): Promise<object> {
    const queryString = `markets=${counter}-${base}`;
    const token = await this.generateAccessToken(queryString);
    const response = this.httpService
      .get(`https://api.upbit.com/v1/ticker?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        catchError((_) => {
          throw new Error('Upbit API Exception');
        }),
      );

    const { data } = await firstValueFrom(response);
    let priceData: object;
    if (Array.isArray(data)) {
      priceData = data[0];
    }

    return priceData;
  }

  async getCurrentPrice({
    base,
    counter,
  }: {
    base: string;
    counter: string;
  }): Promise<number> {
    const priceData = await this.getPriceData({ base, counter });
    const price = priceData['trade_price'] || 0;

    return price;
  }
}
