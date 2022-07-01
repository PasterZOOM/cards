import React, {ChangeEvent, DetailedHTMLProps, ReactNode, SelectHTMLAttributes} from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

export const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,

        ...restProps
    }
) => {
    const mappedOptions: ReactNode[] =
        options ? options.map((el, i) =>
            <option key={el + '-' + i} value={el}>{el}</option>) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)

        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <select onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}