import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import styles from './SuperRange.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRangePropsType = DefaultInputPropsType & {
    onChangeRange?: (valueSlide: number) => void
    value1: number
}

export const SuperRange: React.FC<SuperRangePropsType> = (
    {
        type,
        onChange, onChangeRange,
        className, value1,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeRange && onChangeRange(+e.currentTarget.value)
    }

    const finalRangeClassName = `${styles.range} ${className ? styles.className : ''}`

    return (
        <>
            <div className={styles.value}>{value1}</div>
            <input
                type={'range'}
                onChange={onChangeCallback}
                className={finalRangeClassName}

                {...restProps}
            />
        </>
    )
}