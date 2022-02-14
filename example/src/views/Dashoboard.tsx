import {useLocale, ELocales} from 'bear-locale';
import React from 'react';

const Dashboard = () => {

    const {i18n, setLocale, locale} = useLocale();

    return <div>

        <h1>{i18n('page.home.title')}</h1>
        <p>{i18n('page.home.desc')}</p>

        <select
            onChange={(event) => setLocale((event.target.value) as ELocales)}
            value={locale}
        >
            <option>{ELocales.enUS}</option>
            <option>{ELocales.zhTW}</option>
            <option>{ELocales.jaJP}</option>
        </select>

    </div>;
};

export default Dashboard;
