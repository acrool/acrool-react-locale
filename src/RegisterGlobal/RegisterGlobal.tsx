/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import {PureComponent, Children} from 'react';
import {injectIntl, IntlShape} from 'react-intl';
import { TTranslateI18n } from 'typings';



interface IProps {
    children: JSX.Element,
    intl: IntlShape,
}

class RegisterGlobal extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
        window.translateI18n = this.translateI18n;
    }

    translateI18n: TTranslateI18n = (id, options) => {
        const {formatMessage} = this.props.intl;
        return formatMessage({id, defaultMessage: options?.defaultMessage}, options?.params);
    };

    render() {
        return Children.only(this.props.children);
    }
}

export default injectIntl(RegisterGlobal);
