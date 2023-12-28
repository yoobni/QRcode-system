import React from 'react';
import { NextPage } from 'next';
import Main from "@components/Main";

const Page: NextPage = (props) => {
    return (
        <>
            <Main />
        </>
    );
};

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

export default Page;
