import React from 'react';

import classes from "./Mybutton.module.css";
const MyButton = ({children, ...props}) => {
    return (
        <button {...props}className={classes.myBtb}>
            {children}
        </button>
    );
};

export default MyButton;