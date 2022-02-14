import {useLocale} from 'bear-locale';
import React from 'react';

const Dashboard = () => {

    const {i18n} = useLocale();

    return <div>
        <h1>{i18n('page.home.title')}</h1>
        <p>{i18n('page.home.desc')}</p>

    </div>;
};

export default Dashboard;
