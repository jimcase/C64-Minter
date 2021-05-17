import * as openpgp from 'openpgp';

function buildHTTPMetadatasFromFile(
  type: string,
  chunks: string[],
  metadatum: number
) {
  //         const uri = "metadata+cardano://2065e342de1748dd69788f71e7816b61b0e93da942a87a5a334d6a9a3defdc2a?network=testnet&key=104116116112&type=http-response"

  let metadataObj = {};
  const headers = {};

  if (!headers['Content-Type']) {
    headers['Content-Type'] = type;
  }

  headers['Content-Transfer-Encoding'] = 'base64';

  // split data in diff txs
  const policy = '';
  const nextTx = '_PLACEHOLDER_';
  const sig = 'R8UK...eGb/A==';
  const bas64Chunks = chunks;
  // console.log("bas64Chunks");
  // console.log(bas64Chunks);

  const metadataTxs = [];
  for (let i = 0; i < bas64Chunks.length; i += 1) {
    metadataObj = {};
    metadataObj[metadatum] = {
      policy,
      sig,
      headers,
      response: {
        data: bas64Chunks[i],
      },
      nextTx, // TODO get next tx hash, bas64Chunks.length-1 times
    };
    // console.log(i);
    // console.log(bas64Chunks[i]);
    metadataTxs.push(metadataObj);
  }

  return metadataTxs;
}

function buildBase64FromOnChainMetadata(
  onChainMetadata: string[] | undefined,
  metadatum: number
) {
  let base64 = '';
  if (onChainMetadata && onChainMetadata.length > 0) {
    const metadataResponses = onChainMetadata;
    for (let i = 0; i < metadataResponses.length; i += 1) {
      base64 = base64.concat(metadataResponses[i][metadatum].response.data);
    }
  }
  return base64;
}

/*
 * Spending Password Encryption
 */
async function encryptString(content: string, password: string) {
  const message = await openpgp.createMessage({ text: content });
  const encrypted = await openpgp.encrypt({
    message, // input as Message object
    passwords: password,
    armor: true, // ASCII armor (for not Uint8Array output)
  });
  // console.log(encrypted); // utf8
  return encrypted;
}

async function decryptString(encryptedContent: string, password: string) {
  const encryptedMessage = await openpgp.readMessage({
    armoredMessage: encryptedContent, // parse encrypted bytes
  });

  const { data: decrypted } = await openpgp.decrypt({
    message: encryptedMessage,
    passwords: password, // decrypt with password
    format: 'utf8', // output as string
  });
  // console.log(decrypted);
  return decrypted;
}

/*
 * PGP Encryption
 */
async function encryptAndSignTextWithPGP(
  content: string,
  pubKey: string,
  privKey: string,
  privateKeyPassword: string
) {
  const publicKey = await openpgp.readKey({ armoredKey: pubKey });

  const passphrase = privateKeyPassword;
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readKey({ armoredKey: privKey }),
    passphrase,
  });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: content }), // input as Message object
    publicKeys: publicKey, // for encryption
    privateKeys: privateKey, // for signing (optional)
  });
  // console.log(encrypted);
}

async function decryptSignedTextWithPGP(
  content: string,
  pubKey: string,
  privKey: string,
  privateKeyPassword: string
) {
  const message = await openpgp.readMessage({
    armoredMessage: content, // parse armored message
  });

  const publicKey = await openpgp.readKey({ armoredKey: pubKey });

  const passphrase = privateKeyPassword;
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readKey({ armoredKey: privKey }),
    passphrase,
  });

  const { data: decrypted, signatures } = await openpgp.decrypt({
    message,
    publicKeys: publicKey, // for verification (optional)
    privateKeys: privateKey, // for decryption
    expectSigned: true,
  });
  // console.log(decrypted); // 'Hello, World!'
  // console.log(signatures[0]); // signature validity (signed messages only)
}

async function signTextWithPGP(
  content: string,
  privKey: string,
  privateKeyPassword: string
) {
  const passphrase = privateKeyPassword;
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readKey({ armoredKey: privKey }),
    passphrase,
  });

  const unsignedMessage = await openpgp.createCleartextMessage({
    text: content,
  });

  const messageObject = await openpgp.sign({
    message: unsignedMessage,
    privateKeys: privateKey, // for signing
  });

  const signedMessage = await openpgp.readCleartextMessage({
    cleartextMessage: messageObject,
  });
  // console.log(signedMessage); // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'
}

async function verifySignedMsg(content: string, pubKey: string) {
  const msg = await openpgp.readMessage({
    armoredMessage: content, // parse armored message
  });
  const publicKey = await openpgp.readKey({ armoredKey: pubKey });

  const verified = await openpgp.verify({
    message: msg,
    publicKeys: publicKey, // for verification
  });

  const valid = verified.signatures[0].verified;

  // console.log(valid);
}

// TODO: load self-signed certificate vs CA-signed certificate

export {
  buildHTTPMetadatasFromFile,
  buildBase64FromOnChainMetadata,
  encryptString,
  decryptString,
  encryptAndSignTextWithPGP,
  decryptSignedTextWithPGP,
  signTextWithPGP,
  verifySignedMsg,
};
