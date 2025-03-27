import React from 'react'
import usermanul from "../assets/tbm_manual.pdf";
import { Helmet } from 'react-helmet'
import { useProject } from '../ProjectContext';

function UserManual() {
    const { title } = useProject();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`User Manual | ${title}`}</title>
            </Helmet>
            <div style={{ width: '100%', height: '100vh' }}>
                <iframe src={usermanul} width="100%" height="100%" title="User Manual" />
            </div>
        </>
    )
}
export default UserManual
