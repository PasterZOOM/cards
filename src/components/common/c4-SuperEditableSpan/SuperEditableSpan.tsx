import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState} from 'react'
import {SuperInputText} from '../c1-SuperInputText/SuperInputText'
import img from './img.png'
import style from './SuperEditableSpan.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string

    spanProps?: DefaultSpanPropsType
}

export const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false)

        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)

        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)

        onDoubleClick && onDoubleClick(e)
    }

    const spanClassName = `${children ? style.editableSpan : style.newText} ${className}`

    return (
        <>
            {editMode
                ? (
                    <SuperInputText autoFocus
                                    onBlur={onBlurCallback}
                                    onEnter={onEnterCallback}

                                    {...restProps}
                    />
                ) : (
                    <span title={'Жмякни дважды'}
                          onDoubleClick={onDoubleClickCallBack}
                          className={spanClassName}

                          {...restSpanProps}
                    >
                        {children || restProps.value}
                        <img src={img} alt="img" height={'22px'}/>
                    </span>
                )
            }
        </>
    )
}