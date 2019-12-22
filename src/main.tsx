import 'core-js/es';

import * as React from "react";
import * as ReactDOM from "react-dom";
import pkg from "../package.json"

import { Hello } from "./components/Hello";
import Blog from "./components/Blog"
import './styles.scss';

ReactDOM.render(
    <Blog version={pkg.version}></Blog>,
    document.getElementById("main")
);