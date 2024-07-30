import {translateI18n, useLocale} from '@acrool/react-locale';
import {ELocales} from '../../config/locale';
import Table from '@acrool/react-table';




export const getTextNotComponent = () => {
    return translateI18n('page.home.desc');
};

const Example = () => {
    const {i18n, setLocale, locale} = useLocale();

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
                title: {text: i18n('page.home.field.title', {def: 'Title'}), col: 150},
                name: {text: i18n('page.home.field.name', {def: 'Name'}), col: 'auto'}
            }}
            data={[
                {
                    id: 1,
                    field: {
                        title: i18n('page.home.field.inComponent', {def: 'in component'}),
                        name: <div>
                            <div className="text-area-overflow text-area-overflow-2">
                                {i18n('page.home.desc')}
                            </div>
                        </div>,
                    }
                },
                {
                    id: 2,
                    field: {
                        title: i18n('page.home.field.notInComponent', {def: 'not in component'}),
                        name: <div className="text-area-overflow text-area-overflow-2">{getTextNotComponent()}</div>,
                    }
                },
            ]}
        />
    </div>;
};


export default Example;
