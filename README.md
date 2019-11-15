expected output:
--jwk;
{
 "keys": [
   {
     "kid": "074b44f1-edec-4cee-90bc-24cf023564ba",
     "kty": "RSA",
     "alg": "RS256",
     "use": "sig",
     "n": "zaIoY2S5CJoAFFxjuOlFTcd4t7simvJYUYYy7xTvra0_vtDCBGJkBrIwjpB12twk6WcU34w3EOuCWPFIJxnCCnFRVIdWEzIDwg09jNx1xwKA-xBVE9frqkmZj_sYciV9o7zdu2S7GrCXm_l1rs14XBlYCJNakJZyd5PKulTPdovXDmkFf9v5cddwsTeLrr__lEYq0__ovKhfiIz7VGkeIS-5o2-Vui-2N9Va2X8D7HFnxGs7r5S3l_9l-bmQ5D9lB6wHzur_WI8M97Y_BOHIyc7cpovWkWiv8WdNErx6_9581t4df1IdcePKMelk14lbRPTT-sHKqYfpea_MKJY2yQ",
     "e": "AQAB"
   }
 ]
}
--jwt;#Test users 

admin
eyJraWQiOiIwNzRiNDRmMS1lZGVjLTRjZWUtOTBiYy0yNGNmMDIzNTY0YmEiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiYS1iYWNrZW5kLXNlcnZpY2UiLCJjb25jZXB0LWNhdGFsb2d1ZSJdLCJ1c2VyX25hbWUiOiIxOTI0NzgyNTYzIiwibmFtZSI6IlRFU1QgVVNFUiIsImV4cCI6MTU3MzgwNzQ1MSwiZ2l2ZW5fbmFtZSI6IlRFU1QiLCJmYW1pbHlfbmFtZSI6IlVTRVIiLCJhdXRob3JpdGllcyI6InN5c3RlbTpyb290OmFkbWluIn0.drZuUs5mcf3Y3nKo_QYNn_-F_TN_woMBkapCf9eHS6tt2-FPdv0u1XoCtcjyfUFRC6vdWTyYBgNvYX0748JKEH3aJFiqTwGApaVFBp3qCqHvl1z7mCLQNcLTpDmK-_yQGszms6x37KNamEl-RSO9eLFIRlaojYmaPG09YDxJsE_m45o-azXjYZPnHkYBbVkgV2oNjNgtC_RqyZW49XvvlCSXtU4CR56v9dlmTz5tKKrSRnWaS8VRhp1AdGNw2jF36PRsh47kHTVuNkYPETjRoH6dIxUTH2mFmfsSe2qNIqQZIFYFDncUF1XnxQYFv4-6l7ZCkwTEZc5E8mumwmfKog

readuser
eyJraWQiOiIwNzRiNDRmMS1lZGVjLTRjZWUtOTBiYy0yNGNmMDIzNTY0YmEiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiYS1iYWNrZW5kLXNlcnZpY2UiLCJjb25jZXB0LWNhdGFsb2d1ZSJdLCJ1c2VyX25hbWUiOiIxOTI0NzgyNTYzIiwibmFtZSI6IlRFU1QgVVNFUiIsImV4cCI6MTU3MzgwNzQ1MSwiZ2l2ZW5fbmFtZSI6IlRFU1QiLCJmYW1pbHlfbmFtZSI6IlVTRVIiLCJhdXRob3JpdGllcyI6InB1Ymxpc2hlcjo5MTAyNDQxMzI6cmVhZCJ9.rsg2BQ0w-k6e87LHuWsVhNPsHhKcYpQLQ377PcYp1GbDf_b8q88onhdf1e2EkEdCS_SHP8SgurLdIiNU050Ede2H99vCZ5xdiGpHUNn-LZCbj5MO73ayYFw6i8o3YYFAkBfD1U_psRctG-b9Dee-DtxOAEn0QEAbMXbKRzOaym7tnOHLFkKQRSSK22xUoqXUYdUI7DYpkpWtlF6_-vndoAvFXUQHLsjWoUmiicR7g8nHFj2ewY1-QZDCx3e4yfgSKeERdZ11V6ctACxwSM5xUmjflmnUN0se_-WuOB2fnv8GOdV5JalmL26K9CrsNNVAsVl6DKMcjeXBz6BuI80YMg



 - Provide a **JWK** (keystore with public key) to the application (JwkUtils.kt and application-test.properties)
 - Generate **JWT** token based on public key containing the correct access rights and audience (see JwkToken.kt)

##Audience 

Audience is supplied in the `"aud"` field and each service has its own entry


*User with access to resources in the services a-backend-service, fdk-harvest-admin and organization-catalouge:*
```
"aud": [
          "a-backend-service",
          "fdk-harvest-admin",
          "organization-catalogue",
        ]
```

##Authorities
Authorities is supplied in the `"authorities"` field and has three values;

Read: `"publisher:910244132:read"`

Write: `"publisher:910244132:admin"`

System administrator: `"publisher:910244132:"system:root:admin"`

##Other custom fields
User names

`"user_name": "23076102252"` : String of numbers
`"preferred_username": "23076102252"`: String of numbers or email

Name of user
```
"name": "MAUD GULLIKSEN"`,
"given_name": "MAUD"`,
"family_name": "GULLIKSEN"
```
  
