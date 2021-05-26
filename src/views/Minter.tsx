import React, { CSSProperties } from 'react';

import Magnifier from 'react-magnifier';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  buildBase64FromOnChainMetadata,
  buildHTTPMetadatasFromFile,
  buildMetadatasFromFile,
} from '../utils/crypto-utils';
import { getBase64, splitBase64IntoChunks } from '../utils/utils';

const { MAX_METADATA_SIZE } = require('../utils/cardanoConstants');

interface TransactionMetadata {
  label: string; // max. 64 bytes
  data: any; // max. 64 bytes
}

interface StylesDictionary {
  [Key: string]: CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles: StylesDictionary = {
  listGroupItem: {
    textAlign: 'center',
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

interface IState {
  fileSource: File;
  base64: string | ArrayBuffer | null;
  fileChunks: string[];
  joinedBase64: string;
  metadataTxsPreview: any; // TODO: specify exact type
}

class Minter extends React.Component<IProps, IState> {
  // ------------------------------------------^
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileSource: new File([], ''),
      base64: '',
      fileChunks: [],
      joinedBase64: '',
      metadataTxsPreview: [],
    };

    this.handleInputFile = this.handleInputFile.bind(this);
  }

  handleInputFile = (selectorFiles: FileList | null) => {
    if (selectorFiles) {
      const file = selectorFiles[0];

      this.setState(
        {
          fileSource: file,
        },
        () => {
          getBase64(file)
            .then((base64Str) =>
              this.setState(
                {
                  base64: base64Str,
                },
                () => {
                  const { base64 } = this.state;
                  this.setState(
                    {
                      fileChunks: splitBase64IntoChunks(
                        base64,
                        MAX_METADATA_SIZE
                      ),
                    },
                    async () => {
                      const { fileChunks, fileSource } = this.state;
                      let txs: TransactionMetadata[] = [];
                      txs = await buildMetadatasFromFile(
                        fileSource.type,
                        fileChunks,
                        64
                      );
                      console.log(txs);
                      this.setState(
                        {
                          metadataTxsPreview: buildHTTPMetadatasFromFile(
                            fileSource.type,
                            fileChunks,
                            64
                          ),
                        },
                        () => {
                          const { metadataTxsPreview } = this.state;

                          this.setState(
                            {
                              joinedBase64: buildBase64FromOnChainMetadata(
                                metadataTxsPreview,
                                64
                              ),
                            },
                            () => {}
                          );
                        }
                      );
                    }
                  );
                }
              )
            )
            .catch((err: Error) => console.log(err));
        }
      );
    }
  };

  render() {
    const { fileChunks, joinedBase64, base64, metadataTxsPreview } = this.state; // destructing visible form state

    return (
      <div>
        <h2>Upload asset</h2>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.svg"
          onChange={(e) => this.handleInputFile(e.target.files)}
        />
        {joinedBase64 ? (
          <div id="imgPreviewContainer">
            <Row>
              <Col sm={6}>
                <h5>Base64</h5>
                <pre id="base64ContentMeta"> {JSON.stringify(base64)}</pre>
                <p>Total: {fileChunks.length} Txs</p>
                {metadataTxsPreview && metadataTxsPreview.length > 0 ? (
                  <div id="metadataTxsPreview">
                    {metadataTxsPreview.map(
                      (meta: { [key: number]: any }, index: number) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="metadatasJson">
                          <pre className="jsonContentMeta">
                            <p>
                              {index + 1}/{fileChunks.length}
                              <span> {JSON.stringify(meta).length} bytes</span>
                            </p>
                            {JSON.stringify(meta, null, 2)}
                          </pre>
                        </div>
                      )
                    )}
                  </div>
                ) : null}
                <div id="signSection">
                  <h3>Sign</h3>
                  <Form>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={2}>
                        Select identity
                      </Label>
                      <Col sm={10}>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Not signed</option>
                          <option>artist@nftify.io</option>
                          <option>personal@gmail.com</option>
                          <option>Atala Prism</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Form>
                </div>
              </Col>
              <Col sm={6}>
                <Magnifier src={joinedBase64} />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Mint Cart</p>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Minter;
