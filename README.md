# bear-styled-grid

> Most modern rwd grid system by react + styled-component


[![NPM](https://img.shields.io/npm/v/bear-styled-grid.svg)](https://www.npmjs.com/package/bear-styled-grid)
[![npm](https://img.shields.io/npm/dm/bear-styled-grid.svg)](https://www.npmjs.com/package/bear-styled-grid)

This project [demo](https://imagine10255.github.io/bear-styled-grid/)


## Install

```bash
yarn add bear-styled-grid
```

## Usage
in your index.js add  
`see the example/src/index.js`

```tsx
import {GridThemeProvider} from 'styled-bs-grid';
import 'bear-styled-grid/dist/index.css'

<GridThemeProvider gridTheme={{
          gridGutterWidth: 10,
          gridColumns: 24,
          gridBreakpoints: {
              xs: 0,
              sm: 576,
              md: 768,
              lg: 992,
              xl: 1200,
              xxl: 1540,
          },
          containerMaxWidths: {
              xs: 540,
              sm: 540,
              md: 720,
              lg: 960,
              xl: 1140,
              xxl: 1141,
          },
      }}>
    <App/>
</GridThemeProvider>
```

use in your page/component:
```tsx
import {Container, Row, Col, media} from 'bear-styled-grid';

const MyPage = () => {
    return (
        <Container>
            <MyTitle>styled-bs-grid</MyTitle>
            <Row>
                <Col col>col2 (50%) </Col>
                <Col col>col2 (50%) </Col>
            </Row>
        </Container>
    );
}

// use rwd
const MyTitle = styled.div`
    font-size: 12px;
    ${media.md`
        font-size: 14px;
    `}
`

```

There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-styled-grid-lqsn6)

[Component and setup docs](./docs/component.md)


## License

MIT © [imagine10255](https://github.com/imagine10255)
