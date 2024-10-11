import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Use jwks-rsa to retrieve the public key for verifying the JWT
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>('AUTH0_DOMAIN')}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: configService.get<string>('AUTH0_DOMAIN'),
      algorithms: ['RS256'], // Auth0 uses RS256, so we specify that here
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    try {
      const userInfo = await this.getUserInfo(accessToken);
      console.log(payload);

      return { userId: payload.sub, ...payload, ...userInfo };
    } catch (error) {
      throw new Error('Failed to fetch user info');
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const url = `${this.configService.get<string>('AUTH0_DOMAIN')}userinfo`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return await response.json();
  }
}
