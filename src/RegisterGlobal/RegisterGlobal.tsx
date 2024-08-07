/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import {PureComponent} from 'react';
import {injectIntl, IntlShape} from 'react-intl';
import { TTranslateI18n } from '../types';



interface IProps {
    intl: IntlShape,
}

export let translateI18n: TTranslateI18n = (id, options) => id;

class RegisterGlobal extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
        translateI18n = this.translateI18n;
    }

    translateI18n: TTranslateI18n = (id, options) => {
        const {formatMessage} = this.props.intl;
        return formatMessage({id, defaultMessage: options?.def}, options?.args);
    };

    render() {
        return null;
    }
}

export default injectIntl(RegisterGlobal);
