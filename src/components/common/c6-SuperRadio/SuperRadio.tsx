import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

export const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: object[] = options ? options.map((option, i) => (
        <label key={name + '-' + i}>
            <input type={'radio'}
                   name={name}
                   checked={value === option}
                   onChange={onChangeCallback}
                   value={option}
            />

            {option}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}