import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line import/extensions
import { removeDataFromStorage2 } from '../renderer.ts';

// eslint-disable-next-line react/prop-types
const List = ({ itemsToTrack }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
        </tr>
      </thead>
      <tbody>
        {/* eslint-disable-next-line react/prop-types */}
        {itemsToTrack.map((item, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={i + 1}>
              <td>{i + 1}</td>
              <td>{item}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => removeDataFromStorage2(item)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default List;
