import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}


const AddItemForm = React.memo((props: AddItemFormPropsType) => {

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
             onChange={onChangeInput}
             onKeyPress={onKeyPressAddItem}
             helperText={error && 'Title is required'}/>
      <IconButton
              color="primary"
              size="small"
              onClick={onClickAddItem}>
        <ControlPoint />
      </IconButton>
    </div>
  )
})

export default AddItemForm