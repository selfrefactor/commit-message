import * as React from 'react'
import { omit } from 'rambdax'

export function styledBee(className, optionsAndProps = {}){
  return ({ children }) => {
    if (Object.keys(optionsAndProps).length === 0){
      return <div className={ className }>{children}</div>
    }
    const props = omit('input,span,img', optionsAndProps)
    if (optionsAndProps.span){
      return <span 
        className={ className } 
        {...props}
      >{children}</span>
    }
    if (optionsAndProps.input){
      return <input 
        className={ className } 
        {...props}
      />
    }
    if (optionsAndProps.img){
      return <input 
        className={ className } 
        {...props}
      />
    }

    return <div className={ className } { ...optionsAndProps }>{children}</div>
  }
}
