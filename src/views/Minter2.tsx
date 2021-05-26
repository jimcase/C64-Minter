import React, { CSSProperties, useEffect, useState } from 'react';
import { Row, Col, Input, Form, FormGroup } from 'reactstrap';
import { createMetadata } from '../lib/MetadataUtils';
import { getBase64, splitBase64IntoChunks } from '../utils/utils';

const {
  MAX_VARIABLE_SIZE,
  MAX_METADATA_SIZE,
} = require('../utils/cardanoConstants');

interface StylesDictionary {
  [Key: string]: CSSProperties;
}

const styles: StylesDictionary = {
  inputFile: {},
};

interface TransactionMetadata {
  label: string; // max. 64 bytes
  data: any; // max. 64 bytes
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Minter2Props {}

// eslint-disable-next-line react/prop-types
const Minter2: React.FC<Minter2Props> = () => {
  const [fileSource, setFileSource] = useState(new File([''], 'filename'));
  const [base64File, SetBase64File] = useState('');
  const [base64Chunks, SetBase64Chunks] = useState(['']);

  const processFile = async () => {
    console.log(base64Chunks);
  };

  const handleInputFile = async (files: FileList | null) => {
    if (files?.length) {
      const file = files[0];
      setFileSource(file);
      // eslint-disable-next-line promise/always-return
      const base64: string | ArrayBuffer | null = await getBase64(file);
      if (base64) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        SetBase64File(base64);
        console.log('base64');
        console.log(base64);
        const txsChunks = splitBase64IntoChunks(base64File, MAX_METADATA_SIZE);
        SetBase64Chunks(txsChunks);
        console.log('txsChunks');
        console.log(txsChunks?.length);
        console.log(txsChunks);
        const chunks = splitBase64IntoChunks(base64File, MAX_VARIABLE_SIZE);
        console.log('chunks');
        console.log(chunks);
      } else {
        console.log('error while processing file');
      }
    }
  };

  useEffect(() => {
    // action on update
    console.log('base64Chunks');
    console.log(base64Chunks);
    processFile();
  }, [base64Chunks]);

  useEffect(() => {
    async function createMeta() {
      const data: Array<TransactionMetadata> = [
        { label: '0', data: 'jaime' },
        { label: '1', data: 'caso' },
        { label: '2', data: 'onzain' },
      ];
      // eslint-disable-next-line promise/always-return
      await createMetadata(data).then((metadata) => {
        console.log('meta');
        console.log(metadata);
      });
      const data2: Array<TransactionMetadata> = [
        { label: '64', data: ['jaime', 'caso', 'onzain'] },
      ];
      // eslint-disable-next-line promise/always-return
      await createMetadata(data2).then((metadata) => {
        console.log('meta2');
        console.log(metadata);
      });

      const data3: Array<TransactionMetadata> = [
        {
          label: '64',
          data: { source: ['jaime', 'caso', 'onzain'], next: '' },
        },
      ];
      // eslint-disable-next-line promise/always-return
      await createMetadata(data3).then((metadata) => {
        console.log('meta3');
        console.log(metadata);
      });

      /*
      // 946 bytes
      const example =
        'a200a16e4c615f52657073697374616e634568576173206865726501a56743686f6963657384a36b43616e6469646174654964782461616139353033612d366663352d343665612d396161302d62346339306633363161346368566f746552616e6b016a566f746557656967687401a36b43616e6469646174654964782438643634396331322d393336652d343662652d623635612d63313766333066353935373468566f746552616e6b026a566f746557656967687401a36b43616e6469646174654964782438316365376638652d393463332d343833352d393166632d32313436643531666131666368566f746552616e6b006a566f746557656967687400a36b43616e6469646174654964782434303735343061612d353862352d343063612d623438342d66343030343065623239393068566f746552616e6b036a566f746557656967687401694e6574776f726b49646f5468655265616c4164616d4465616e6a4f626a656374547970656a566f746542616c6c6f746a50726f706f73616c4964782438303036346332382d316230332d346631632d616266302d63613863356139386435623967566f7465724964782464393930613165382d636239302d346635392d623563662d613862353963396261386165';
      // eslint-disable-next-line promise/always-return
      await createMetadataFromBytes(example).then((metadata) => {
        console.log('metadataBytes');
        console.log(metadata);
      });
      */
    }
    createMeta();
  }, []);

  return (
    <div id="galleryView" style={{ height: '100%' }}>
      <div style={{ padding: '15px' }}>
        <h1 className="display-3">Minter 2</h1>
        <h3>
          <strong>Total 872134423</strong>
        </h3>
        <hr className="my-2" />
        <Form>
          <FormGroup row>
            <Col>
              <Input
                style={styles.inputFile}
                type="file"
                name="file"
                id="exampleFile"
                onChange={(e) => handleInputFile(e.target.files)}
              />
            </Col>
          </FormGroup>
        </Form>
        <Row>
          <Col sm={8}>
            {base64Chunks &&
            base64Chunks.length > 0 &&
            base64Chunks[0] !== '' ? (
              <div id="metadataTxsPreview">
                {base64Chunks.map((chunk: string, index: number) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="metadatasJson">
                    <pre className="jsonContentMeta">
                      <p>
                        {index + 1}/{base64Chunks.length}
                        <span> {JSON.stringify(chunk).length} bytes</span>
                      </p>
                      {JSON.stringify(chunk, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            ) : null}
          </Col>
          <Col sm={4}>
            <span>{JSON.stringify(base64Chunks).length} bytes</span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Minter2;
