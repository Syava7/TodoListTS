import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
      <input className={error ? 'error' : ''}
             value={title}
             placeholder={error ? 'Title required' : ''}
             onChange={onChangeInput}
             onKeyPress={onKeyPressAddItem}/>
      <button onClick={onClickAddItem}>+</button>
    </div>
  )
}

export default AddItemForm