import React, {useState, ChangeEvent, KeyboardEvent} from 'react'

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.title)
  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return (
    editMode
      ? <input value={title}
               onChange={onChangeInput}
               autoFocus
               onBlur={offEditMode}/>
      : <span onDoubleClick={onEditMode}>{props.title}</span>
  )
}

export default EditableSpan;