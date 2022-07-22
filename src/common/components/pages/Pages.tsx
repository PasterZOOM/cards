import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {PATH} from 'common/enums'
import {Error404, Login, Profile, Registration} from 'faetures'


export const Pages = () => (
    <div>
        <Routes>
            <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={'/*'} element={<Error404/>}/>
        </Routes>
    </div>
)