import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as _ from 'lodash';

type JwkKeys = {
    kid: string
    kty: string
    alg: string
    use: string
    n: string
    e: string
}

type Jwk = { keys: Array<JwkKeys> }

type Payload = {
 user_name: string 
 name: string
 given_name: string
 family_name: string
 authorities: string
}

function generateJwk(): string{
  const publickkey = writeKeyPair();
  const jwkkeys : JwkKeys= {
     kid: "074b44f1-edec-4cee-90bc-24cf023564ba",
     kty: "RSA",
     alg: "RS256",
     use: "sig",
     n: publickkey.replace(/\n|\r/g, ""),
     e: "AQAB"
  } 
  const jwkStore : Jwk = {
    keys: [jwkkeys]
  }

  return JSON.stringify(jwkStore,null,2)
}

function writeKeyPair() : string{

  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });

  const base64public = getBase64Key(publicKey)
  fs.writeFileSync('public.key', base64public);
  fs.writeFileSync('private.key', getBase64Key(privateKey));

  return base64public.split('-----')[2]
}

function getBase64Key(key: string): string{
  const keyParts = key.split('----');
  const base64token = Buffer.from(keyParts[2]).toString('base64');
  _.replace(key,keyParts[2],base64token)  
  console.log(key);
  return key;
}

function generateJwt() :string {
// PAYLOAD
const payload : Payload = {
  user_name: "1924782563",
  name: "TEST USER",
  given_name: "TEST",
  family_name: "USER",
  authorities: "system:root:admin"
  }
 var privateKEY  = fs.readFileSync('./private.key', 'utf8');
 var publicKEY  = fs.readFileSync('./public.key', 'utf8');

 // SIGNING OPTIONS
 var signOptions = {
  issuer:  'fdkmock',
  audience:  ['a-backend-service','concept-catalouge'],
  expiresIn:  "12h",
  algorithm:  "RS256",
  keyid: "074b44f1-edec-4cee-90bc-24cf023564ba"
 };

 const token = jwt.sign(payload,privateKEY,signOptions);
 
 return token
 
}

function toBase64(key: string){

}

function writeToYaml(){
 
  fs.writeFile('auth.json', generateJwk (),function(err){
      if(err){
        console.log('error :( :( ')
      }
  });
  fs.writeFile('jwt.json', generateJwt (),function(err){
    if(err){
      console.log('error :( :( ')
    }
  });
}

writeToYaml();