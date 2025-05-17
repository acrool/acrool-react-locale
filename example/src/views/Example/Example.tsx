import {useLocale} from '@acrool/react-locale';
import Table from '@acrool/react-table';

import {ELocales} from '../../config/locale';
import enUS from '../../locales/en-US';




const Example = () => {
    const {t, setLocale, locale} = useLocale();

    return <div>

        <select
            style={{padding: '5px', fontSize: '16px', borderRadius: '4px', marginBottom: '15px'}}
            onChange={(event) => setLocale((event.target.value) as ELocales)}
            value={locale}
        >
            <option>{ELocales.enUS}</option>
            <option>{ELocales.zhTW}</option>
            <option>{ELocales.jaJP}</option>
        </select>


        <Table
            isDark
            isVisiblePaginate={false}
            tableCellMediaSize={768}
            gap="15px"
            bodyLineHeight="60px"
            title={{
                title: {text: t('page.home.field.title', {def: 'Title'}), col: 150},
                name: {text: t('page.home.field.name22', {def: 'Name'}), col: 'auto'}
            }}
            data={[
                {
                    id: 1,
                    field: {
                        title: t('page.home.field.inComponent', {def: 'in component'}),
                        name: <div>
                            <div className="text-area-overflow text-area-overflow-2">
                                {t('page.home.desc')}
                            </div>
                        </div>,
                    }
                },
            ]}
        />
    </div>;
};


export default Example;
