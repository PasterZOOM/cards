import React from 'react'
import style from './Error404.module.css'
import image from './error.png'

export const Error404 = () => (
    <div className={style.onStyle}>
        <img src={image} alt="Ошибка 404"/>
    </div>
)