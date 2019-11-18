import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as _ from 'lodash';
import * as handlebars from 'handlebars';

const tmpDir = './tmp';

interface JwkKeys {
    kid: string
    kty: string
    alg: string
    use: string
    n: string
    e: string
}

interface AuthExamples extends JwkKeys {
   token : string
}

type Payload = {
 user_name: string 
 name: string
 given_name: string
 family_name: string
 authorities: string
}

class Generator {
  jwk: JwkKeys;
  jwt: string;

  constructor(){
    console.log("starting generator")
    this.jwk = this.generateJwk();
    this.jwt = this.generateJwt();
  }

 generateAuthYaml(){
    const examples : AuthExamples = 
    {
      kid: this.jwk.kid,
      kty: this.jwk.kty,
      alg: this.jwk.alg,
      use: this.jwk.use,
      n:  this.jwk.n,
      e: this.jwk.e,
      token: this.jwt
    }

    const source = fs.readFileSync("./template.yaml").toString();
    const template = handlebars.compile(source);
    const content = template(examples);
    console.log("writing examples to yaml")
    fs.writeFileSync(tmpDir + "/auth.yaml", content);
  }
  
  generateJwk(): JwkKeys{
    const publickkey = this.writeKeyPair();
    const jwkkeys : JwkKeys= {
       kid: "074b44f1-edec-4cee-90bc-24cf023564ba",
       kty: "RSA",
       alg: "RS256",
       use: "sig",
       n: publickkey.replace(/\n|\r/g, ""),
       e: "AQAB",
    } 
    return jwkkeys;
  }
  
   writeKeyPair() : string{
  
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
  
  if (!fs.existsSync(tmpDir)){
      fs.mkdirSync(tmpDir);
  }
    const base64public = this.getBase64Key(publicKey)
    fs.writeFileSync( tmpDir + '/public.key', base64public);
    fs.writeFileSync( tmpDir + '/private.key', this.getBase64Key(privateKey));
  
    return base64public.split('-----')[2]
  }
  
  getBase64Key(key: string): string{
    const keyParts = key.split('----');
    const base64token = Buffer.from(keyParts[2]).toString('base64');
    _.replace(key,keyParts[2],base64token)  
    return key;
  }
  
  generateJwt() :string {
  
  const payload : Payload = {
    user_name: "1924782563",
    name: "TEST USER",
    given_name: "TEST",
    family_name: "USER",
    authorities: "system:root:admin"
    }
   var privateKEY  = fs.readFileSync( tmpDir + '/private.key', 'utf8');
   var publicKEY  = fs.readFileSync( tmpDir + '/public.key', 'utf8');
  
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

}

new Generator().generateAuthYaml();