import jwtCore from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import pify from "pify";
import { fetchWithToken } from "./fetch";

const jwt = pify(jwtCore);
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    callback(null, key.getPublicKey());
  });
}

async function verifyToken(token) {
  return jwt.verify(token, getKey, {
    algorithms: [ "RS256" ],
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`
  });
}

export async function authenticateRequest(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("No Authorization header was provided.")
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization is not a Bearer token.")
  }

  const token = authHeader.substring(7);

  return {
    details: verifyToken(token),
    token
  };
}

export async function getUserDetails(token) {
  return fetchWithToken(`https://${process.env.AUTH0_DOMAIN}/userinfo`, token)
}
