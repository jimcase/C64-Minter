import React from 'react';

import Magnifier from 'react-magnifier';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  buildBase64FromOnChainMetadata,
  buildHTTPMetadatasFromFile,
} from '../utils/crypto-utils';
import { getBase64, splitBase64 } from '../utils/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

interface IState {
  fileSource: File;
  base64: string;
  base64Size: number;
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
      base64Size: 0,
      fileChunks: [],
      joinedBase64: '',
      metadataTxsPreview: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (selectorFiles: FileList | null) => {
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
                  base64Size: base64Str.length * (3 / 4) - 2,
                },
                () => {
                  const { base64, base64Size } = this.state;
                  this.setState(
                    {
                      fileChunks: splitBase64(base64, base64Size, 14336),
                    },
                    () => {
                      const { fileChunks, fileSource } = this.state;
                      this.setState(
                        {
                          metadataTxsPreview: buildHTTPMetadatasFromFile(
                            fileSource.type,
                            fileChunks,
                            104116116112
                          ),
                        },
                        () => {
                          const { metadataTxsPreview } = this.state;

                          this.setState(
                            {
                              joinedBase64: buildBase64FromOnChainMetadata(
                                metadataTxsPreview,
                                104116116112
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
    const {
      fileChunks,
      joinedBase64,
      base64,
      base64Size,
      metadataTxsPreview,
    } = this.state; // destructing visible form state

    return (
      <div>
        <h2>Upload asset</h2>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.svg"
          onChange={(e) => this.handleChange(e.target.files)}
        />
        {joinedBase64 ? (
          <div id="imgPreviewContainer">
            <Row>
              <Col sm={6}>
                <h5>Base64</h5>
                <pre id="base64ContentMeta"> {JSON.stringify(base64)}</pre>
                <p id="base64SizeSpan">
                  Size:
                  <span>{base64Size} bytes</span>
                </p>
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
                <Magnifier id="imgToMint" src={joinedBase64} />
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
