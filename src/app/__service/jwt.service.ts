import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getDecodeAccessToken(token: string): any{

    try{
      return jwt_decode(token);

    } catch (error){
      return null;
    }
  }
}
