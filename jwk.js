"use strict";
exports.__esModule = true;
var fs = require("fs");
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var _ = require("lodash");
var handlebars = require("handlebars");
var tmpDir = './tmp';
var Generator = /** @class */ (function () {
    function Generator() {
        console.log("starting generator");
        this.jwk = this.generateJwk();
        this.jwt = this.generateJwt();
    }
    Generator.prototype.generateAuthYaml = function () {
        var examples = {
            kid: this.jwk.kid,
            kty: this.jwk.kty,
            alg: this.jwk.alg,
            use: this.jwk.use,
            n: this.jwk.n,
            e: this.jwk.e,
            token: this.jwt
        };
        var source = fs.readFileSync("./template.yaml").toString();
        var template = handlebars.compile(source);
        var content = template(examples);
        console.log("writing examples to yaml");
        fs.writeFileSync(tmpDir + "/auth.yaml", content);
    };
    Generator.prototype.generateJwk = function () {
        var publickkey = this.writeKeyPair();
        var jwkkeys = {
            kid: "074b44f1-edec-4cee-90bc-24cf023564ba",
            kty: "RSA",
            alg: "RS256",
            use: "sig",
            n: publickkey.replace(/\n|\r/g, ""),
            e: "AQAB"
        };
        return jwkkeys;
    };
    Generator.prototype.writeKeyPair = function () {
        var _a = crypto.generateKeyPairSync('rsa', {
            modulusLength: 1024,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }), publicKey = _a.publicKey, privateKey = _a.privateKey;
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }
        var base64public = this.getBase64Key(publicKey);
        fs.writeFileSync(tmpDir + '/public.key', base64public);
        fs.writeFileSync(tmpDir + '/private.key', this.getBase64Key(privateKey));
        return base64public.split('-----')[2];
    };
    Generator.prototype.getBase64Key = function (key) {
        var keyParts = key.split('----');
        var base64token = Buffer.from(keyParts[2]).toString('base64');
        _.replace(key, keyParts[2], base64token);
        return key;
    };
    Generator.prototype.generateJwt = function () {
        var payload = {
            user_name: "1924782563",
            name: "TEST USER",
            given_name: "TEST",
            family_name: "USER",
            authorities: "system:root:admin"
        };
        var privateKEY = fs.readFileSync(tmpDir + '/private.key', 'utf8');
        var publicKEY = fs.readFileSync(tmpDir + '/public.key', 'utf8');
        var signOptions = {
            issuer: 'fdkmock',
            audience: ['a-backend-service', 'concept-catalouge'],
            expiresIn: "12h",
            algorithm: "RS256",
            keyid: "074b44f1-edec-4cee-90bc-24cf023564ba"
        };
        var token = jwt.sign(payload, privateKEY, signOptions);
        return token;
    };
    return Generator;
}());
new Generator().generateAuthYaml();
