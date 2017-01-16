import 'normalize.css/normalize.css'

import {render}          from 'react-dom'
import createApplication from 'createApplication.js'
import App               from 'components/App'
import initialData       from '../initialData.json'

const application = createApplication(document)

const initialState = {
  carList: initialData
}

render(
    <App state={initialState} />,
    application
)