import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const EstiloGlobal = createGlobalStyle`
    ${reset}
    body {
        font-family: "Raleway", sans-serif;
        background-color: #8c11be
    }
    a {
    text-decoration: none;
    }
    * {
        box-sizing: border-box;
    }
`;

export default EstiloGlobal;