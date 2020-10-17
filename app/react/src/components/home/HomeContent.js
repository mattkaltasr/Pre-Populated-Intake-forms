import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

const HomeContent = () => {
  const [text, setText] = React.useState('');

  const [returnValue, setReturnValue] = React.useState(null);

  const onSubmit = async () => {
    /**
     * this needs error handling
     * and better endpoint management
     */
    const {
      data: { response },
    } = await axios({
      method: 'post',
      url: 'http://localhost:5000/test',
      data: {
        params: text,
      },
    });

    setReturnValue(response);
  };

  return (
    <div style={{ margin: 'auto', padding: '1em', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', margin: '0 0 1em 0' }}>
        <Input
          style={{ margin: 'auto 1em auto auto' }}
          placeholder="enter text here"
          value={text}
          onChange={(e, { value }) => setText(value)}
        />
        <Button style={{ margin: 'auto' }} primary={!!text} disabled={!text} onClick={onSubmit}>
          Submit
        </Button>
      </div>
      <div>
        <span>
          <strong>
            <Icon
              name="check"
              color="green"
              style={{ opacity: returnValue ? 1 : 0, transition: '80ms ease-in' }}
            />{' '}
            Response from server:{' '}
          </strong>{' '}
          {returnValue}
        </span>
      </div>
    </div>
  );
};

export default HomeContent;
