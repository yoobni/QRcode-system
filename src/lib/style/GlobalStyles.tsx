import { createGlobalStyle } from 'styled-components';

// language=LESS
export default createGlobalStyle`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    address,
    big,
    cite,
    code,
    del,
    em,
    img,
    ins,
    s,
    small,
    strike,
    strong,
    sub,
    sup,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    main,
    article,
    aside,
    canvas,
    details,
    embed,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        word-break: keep-all;
        outline: none;
    }

    * {
        box-sizing : border-box;
    }
    
    ol,
    ul,
    li,
    dl {
        list-style: none;
    }

    button, input, optgroup, select, textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        -webkit-tap-highlight-color: transparent;
    }
    
    button {
        border:none;
        margin:0;
        padding:0;
        border-radius: 0;
        background-color: transparent;
        cursor: pointer;
    }
    
    button:hover {
        cursor:pointer;
    }
    
    button:focus {
        outline: none;
    }
    
    a {
        color:inherit !important;
        text-decoration:none !important;
    }

    a:hover { 
        text-decoration: none;
    }
    
    a:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 0 none;
    }

    img {
        max-width: 100%;
        border: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
        -webkit-touch-callout: none;
    }
    
    .ant-list-item {
      padding: 16px 0 !important;
    }
`;