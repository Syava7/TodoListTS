import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Icon, IconButton, TextField} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}


function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }

  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddItem()
    }
  }

  const onClickAddItem = () => {
    if (title.trim()) {
      props.addItem(title)
    } else {
      setError(true)
    }
    setTitle('')
  }


  return (
    <div>
      <TextField
             variant="outlined"
             label={'Type value'}
             size={'small'}
             error={error}
             value={title}
             placeholder={error ? 'Title required' : ''}
             onChange={onChangeInput}
             onKeyPress={onKeyPressAddItem}/>
      <IconButton
              color="primary"
              size="small"
              onClick={onClickAddItem}>
        <ControlPoint />
      </IconButton>
    </div>
  )
}

export default AddItemForm