import React, { useEffect } from 'react';
import { createMetadata, createMetadataFromBytes } from '../lib/MetadataUtils';

interface TransactionMetadata {
  label: string; // max. 64 bytes
  data: any; // max. 64 bytes
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Minter2Props {}

// eslint-disable-next-line react/prop-types
const Minter2: React.FC<Minter2Props> = () => {
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

      // 946 bytes
      const example =
        'a200a16e4c615f52657073697374616e634568576173206865726501a56743686f6963657384a36b43616e6469646174654964782461616139353033612d366663352d343665612d396161302d62346339306633363161346368566f746552616e6b016a566f746557656967687401a36b43616e6469646174654964782438643634396331322d393336652d343662652d623635612d63313766333066353935373468566f746552616e6b026a566f746557656967687401a36b43616e6469646174654964782438316365376638652d393463332d343833352d393166632d32313436643531666131666368566f746552616e6b006a566f746557656967687400a36b43616e6469646174654964782434303735343061612d353862352d343063612d623438342d66343030343065623239393068566f746552616e6b036a566f746557656967687401694e6574776f726b49646f5468655265616c4164616d4465616e6a4f626a656374547970656a566f746542616c6c6f746a50726f706f73616c4964782438303036346332382d316230332d346631632d616266302d63613863356139386435623967566f7465724964782464393930613165382d636239302d346635392d623563662d613862353963396261386165';
      const example2 = '4a61696d65204361736f204f6e7a61696e';
      // eslint-disable-next-line promise/always-return
      await createMetadataFromBytes(example).then((metadata) => {
        console.log('metadataBytes');
        console.log(metadata);
      });
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
      </div>
    </div>
  );
};

export default Minter2;
