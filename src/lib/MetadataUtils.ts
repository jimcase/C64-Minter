import CardanoModule from './CardanoModule';

interface TransactionMetadata {
  label: string;
  data: any;
}

export const createMetadata = (metadata: Array<TransactionMetadata>) => {
  const transactionMetadata =
    CardanoModule.wasmV4.GeneralTransactionMetadata.new();

  metadata.forEach((meta: TransactionMetadata) => {
    const metadatum = CardanoModule.wasmV4.encode_json_str_to_metadatum(
      JSON.stringify(meta.data),
      CardanoModule.wasmV4.MetadataJsonSchema.BasicConversions
    );
    transactionMetadata.insert(
      CardanoModule.wasmV4.BigNum.from_str(meta.label),
      metadatum
    );
  });
  return CardanoModule.wasmV4.TransactionMetadata.new(transactionMetadata);
};

export const parseMetadata = (hex: string) => {
  const metadatum = CardanoModule.wasmV4.TransactionMetadatum.from_bytes(
    Buffer.from(hex, 'hex')
  );
  const metadataString = CardanoModule.wasmV4.decode_metadatum_to_json_str(
    metadatum,
    CardanoModule.wasmV4.MetadataJsonSchema.BasicConversions
  );
  return metadataString;
};

export const parseMetadataDetailed = (hex: string) => {
  const metadatum = CardanoModule.wasmV4.TransactionMetadatum.from_bytes(
    Buffer.from(hex, 'hex')
  );
  const metadataString = CardanoModule.wasmV4.decode_metadatum_to_json_str(
    metadatum,
    CardanoModule.wasmV4.MetadataJsonSchema.DetailedSchema
  );
  return metadataString;
};
