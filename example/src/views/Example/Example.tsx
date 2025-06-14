import Table from '@acrool/react-table';

import {optionData, useAppLocale} from '@/library/react-locale';




const Example = () => {
    const {t, setLocale, locale} = useAppLocale();

    return <div>

        <select
            style={{padding: '5px', fontSize: '16px', borderRadius: '4px', marginBottom: '15px'}}
            onChange={(event) => setLocale((event.target.value))}
            value={locale}
        >
            {optionData.map(row => {
                return <option value={row.value}>{row.text}</option>;
            })}
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
                        title: t('page.home.field.inArgs', {def: 'in args'}),
                        name: <div>
                            <div className="text-area-overflow text-area-overflow-2">
                                {t('formatError.minLength', {args: {minLength: 5}})}
                            </div>
                        </div>,
                    }
                },
            ]}
        />
    </div>;
};


export default Example;
