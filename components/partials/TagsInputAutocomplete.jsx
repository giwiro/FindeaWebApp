"use strict";

import React from 'react'
import {Link} from 'react-router'
import _ from 'lodash'
import TagsInput from 'react-tagsinput'

import {IconButton} from 'material-ui';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

const closeButtonStyle = {
  padding: '0 0 0 2px',
  verticalAlign: 'middle',
  width: '23px',
  height: '23px'
}

const closeIconStyle = {
  width: '12px', 
  height: '12px'
}
  
export default class TagsInputAutocomplete extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
    this.handleChange = this.handleChange.bind(this)
    this.renderTag = this.renderTag.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.renderLayout = this.renderLayout.bind(this)
  }

  handleChange(tags) {
    this.setState({tags})
  }

  renderTag (props) {
    let {tag, key, onRemove, ...other} = props

    const iconButton = this.props.readOnly ? 
      <div style={{width: '7px', height: '20px', display: 'inline-block', verticalAlign: 'middle'}} /> : 

        <IconButton style={closeButtonStyle} iconStyle={{width: '18px', height: '18px'}} onTouchTap={(e) => onRemove(key)}>
          <CloseIcon />
        </IconButton>
    return (
      <span key={key} {...other}>
        {tag}
        {iconButton}
      </span>
    )
  }

  renderInput (props) {
    let {onChange, value, ...other} = props
    //console.log('readOnly', this.props.readOnly);
    const input = this.props.readOnly ? 
      <div /> : <input type='text' onChange={onChange} value={value} {...other} />

    //console.log('input', input);
    return (
      input
    )
  }
  renderLayout (tagComponents, inputComponent) {

    return (
      <span>
        {tagComponents}
        {inputComponent}
      </span>
    )
  }

  render() {

    const valueProp = this.props.readOnly ?
      this.props.tags : this.state.tags;

    //console.log('valueProp', valueProp);
    
    return (
      <TagsInput 
        readOnly={this.props.readOnly}
        value={valueProp} 
        onChange={this.handleChange} 
        onlyUnique={true}
        renderTag={this.renderTag}
        renderInput={this.renderInput}
        renderLayout={this.renderLayout}/>
    )
  }
}

