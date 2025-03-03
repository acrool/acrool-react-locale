/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import {PureComponent} from 'react';
import {injectIntl, IntlShape} from 'react-intl';
import {II18nTexts, TTranslateI18n} from '../types';



interface IProps {
    intl: IntlShape,
}

export let translateI18n: TTranslateI18n<any> = (id, options) => id as string;

class RegisterGlobal<T extends II18nTexts> extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
        translateI18n = this.translateI18n as TTranslateI18n<T>;
    }

    translateI18n = <K extends keyof T>(id: K, options?: { def?: string; args?: Record<string, any> }) => {
        const {formatMessage} = this.props.intl;
        return formatMessage({id: id as string, defaultMessage: options?.def}, options?.args);
    };

    render() {
        return null;
    }
}

export default injectIntl(RegisterGlobal);
