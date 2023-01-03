import React from 'react'
import classes from './SelectButton.module.css'

const SelectButton = ({children, selected, onClick}) => {

const select = `${selected ? classes.selected : ''}`;

  return (
  
    <span onClick={onClick} className={classes.selectButton + ' ' + select}>{children}</span>
  )
}

export default SelectButton