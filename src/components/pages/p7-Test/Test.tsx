import React, {useState} from 'react'
import {SuperInputText} from '../../common/c1-SuperInputText/SuperInputText'
import {SuperButton} from '../../common/c2-SuperButton/SuperButton'
import {SuperCheckbox} from '../../common/c3-SuperCheckbox/SuperCheckbox'
import {SuperEditableSpan} from '../../common/c4-SuperEditableSpan/SuperEditableSpan'
import {SuperSelect} from '../../common/c5-SuperSelect/SuperSelect'
import {SuperRadio} from '../../common/c6-SuperRadio/SuperRadio'
import {OnChangeType, SuperDoubleRange} from '../../common/c8-SuperDoubleRange/SuperDoubleRange'
import {SuperRange} from '../../common/c7-SuperRange/SuperRange'

export const Test = () => {
    const min = 0
    const max = 100
    const arr = ['x', 'y', 'z']

    const [value1, setValue1] = useState<number>(min)
    const [value2, setValue2] = useState<number>(max)
    const [editableSpanText, setEditableSpanText] = useState<string>('Hello')
    const [optionValue, onChangeOption] = useState<string>(arr[1])

    const onChangeRange = (valueSlide: number) => {
        setValue1(valueSlide)
    }

    const onChangeDoubleRange = ({value1, value2}: OnChangeType) => {
        setValue1(value1)
        setValue2(value2)
    }

    return (
        <div>
            <div>
                <SuperInputText/>
            </div>
            <div>
                <SuperButton>
                    Hello
                </SuperButton>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
            <div>
                <SuperEditableSpan value={editableSpanText}
                                   onChangeText={setEditableSpanText}/>
            </div>
            <div>
                <SuperSelect options={arr}
                             value={optionValue}
                             onChangeOption={onChangeOption}/>
            </div>
            <div>
                <SuperRadio name={'radio'}
                            options={arr}
                            value={optionValue}
                            onChangeOption={onChangeOption}/>
            </div>
            <div>
                <SuperRange value1={value1}
                            value={value1}
                            onChangeRange={onChangeRange}/>
            </div>
            <div>
                <SuperDoubleRange value1={value1}
                                  value2={value2}
                                  onChange={onChangeDoubleRange}
                                  max={max}
                                  min={min}/>
            </div>
        </div>
    )
}