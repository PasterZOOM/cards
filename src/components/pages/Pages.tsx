import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from './p1-Login/Login'
import {Registration} from './p2-Registration/Registration'
import {Error404} from './p4-Error404/Error404'
import {Profile} from './p3-Profile/Profile'
import {PasswordRecovery} from './p5-PasswordRecovery/PasswordRecovery'
import {ChangePassword} from './p6-ChangePassword/ChangePassword'
import {Test} from './p7-Test/Test'

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password_recovery',
    CHANGE_RECOVERY: '/change_password',
    TEST: '/test'
}

export const Pages = () => (
    <div>
        <Routes>
            <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
            <Route path={PATH.CHANGE_RECOVERY} element={<ChangePassword/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path={'/*'} element={<Error404/>}/>
        </Routes>
    </div>
)