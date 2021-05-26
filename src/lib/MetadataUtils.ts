import CardanoModule from './CardanoModule';

interface TransactionMetadata {
  label: string;
  data: any;
}

export const createMetadata = async (
  metadata: Array<TransactionMetadata>
): Promise<CardanoModule.wasmV4.TransactionMetadata> => {
  const transactionMetadata = await CardanoModule.load()
    .then(() => {
      const generalTransactionMetadata =
        CardanoModule.wasmV4.GeneralTransactionMetadata.new();

      metadata.forEach((meta: TransactionMetadata) => {
        const metadatum = CardanoModule.wasmV4.encode_json_str_to_metadatum(
          JSON.stringify(meta.data),
          CardanoModule.wasmV4.MetadataJsonSchema.BasicConversions
        );
        generalTransactionMetadata.insert(
          CardanoModule.wasmV4.BigNum.from_str(meta.label),
          metadatum
        );
      });
      /*
      console.log('generalTransactionMetadata');
      console.log(generalTransactionMetadata);
      console.log(generalTransactionMetadata.keys());
      console.log(generalTransactionMetadata.keys().get(0).to_str()); */
      return CardanoModule.wasmV4.TransactionMetadata.new(
        generalTransactionMetadata
      );
    })
    .catch((e) => console.log(e));
  return transactionMetadata;
};

export const createOneMetadata = async (
  metadata: TransactionMetadata
): Promise<CardanoModule.wasmV4.TransactionMetadata> => {
  const transactionMetadata = await CardanoModule.load()
    .then(() => {
      const generalTransactionMetadata =
        CardanoModule.wasmV4.GeneralTransactionMetadata.new();

      const metadatum = CardanoModule.wasmV4.encode_json_str_to_metadatum(
        JSON.stringify(metadata.data),
        CardanoModule.wasmV4.MetadataJsonSchema.BasicConversions
      );
      generalTransactionMetadata.insert(
        CardanoModule.wasmV4.BigNum.from_str(metadata.label),
        metadatum
      );
      console.log('generalTransactionMetadata');
      console.log(generalTransactionMetadata);
      console.log(generalTransactionMetadata.keys());
      console.log(generalTransactionMetadata.keys().get(0).to_str());
      return CardanoModule.wasmV4.TransactionMetadata.new(
        generalTransactionMetadata
      );
    })
    .catch((e) => console.log(e));
  return transactionMetadata;
};

export const createMetadataFromBytes = async (
  metadataBytes: string
): Promise<CardanoModule.wasmV4.TransactionMetadata> => {
  const transactionMetadata = await CardanoModule.load()
    .then(() => {
      console.log(metadataBytes);

      const generalTransactionMetadata =
        CardanoModule.wasmV4.GeneralTransactionMetadata.from_bytes(
          Buffer.from(metadataBytes, 'hex')
        );
      /*
      console.log('generalTransactionMetadata');
      console.log(
        generalTransactionMetadata.get(
          CardanoModule.wasmV4.BigNum.from_str('0')
        ).as_map().keys().get(0).as_text()
      );
      console.log(
        generalTransactionMetadata.get(
          CardanoModule.wasmV4.BigNum.from_str('0')
        ).as_map().get_str('La_RepsistancE').as_text()
      );
      */
      return CardanoModule.wasmV4.TransactionMetadata.new(
        generalTransactionMetadata
      );
    })
    .catch((e) => console.log(e));
  return transactionMetadata;
};

export const parseMetadata = (hex: string): string => {
  const metadatum = CardanoModule.wasmV4.TransactionMetadatum.from_bytes(
    Buffer.from(hex, 'hex')
  );
  const metadataString = CardanoModule.wasmV4.decode_metadatum_to_json_str(
    metadatum,
    CardanoModule.wasmV4.MetadataJsonSchema.BasicConversions
  );
  return metadataString;
};

export const parseMetadataDetailed = (hex: string): string => {
  const metadatum = CardanoModule.wasmV4.TransactionMetadatum.from_bytes(
    Buffer.from(hex, 'hex')
  );
  const metadataString = CardanoModule.wasmV4.decode_metadatum_to_json_str(
    metadatum,
    CardanoModule.wasmV4.MetadataJsonSchema.DetailedSchema
  );
  return metadataString;
};
