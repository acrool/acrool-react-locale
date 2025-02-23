import {translateI18n, useLocale} from '@acrool/react-locale';
import {ELocales} from '../../config/locale';
import Table from '@acrool/react-table';
import enUS from '../../locales/en-US';



export const getTextNotComponent = () => {
    return translateI18n('page.home.desc');
};

const Example = () => {
    const {t, setLocale, locale} = useLocale<typeof enUS>();

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
                name: {text: t('page.home.field.name', {def: 'Name'}), col: 'auto'}
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
                {
                    id: 2,
                    field: {
                        title: t('page.home.field.notInComponent', {def: 'not in component'}),
                        name: <div className="text-area-overflow text-area-overflow-2">{getTextNotComponent()}</div>,
                    }
                },
            ]}
        />
    </div>;
};


export default Example;
