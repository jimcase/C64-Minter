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

export { buildHTTPMetadatasFromFile, buildBase64FromOnChainMetadata };
