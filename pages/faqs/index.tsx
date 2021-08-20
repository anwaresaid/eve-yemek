import React, { useEffect, useState } from 'react';
import Faq from "react-faq-component";
import FAQsService from '../../store/services/faqs.service';

export const FAQs = () => {

    let faqsService = new FAQsService()
    const [FAQsData, setFAQsData] = useState({title: 'FAQs', rows: []})

    useEffect(() => {
        faqsService.getFAQs()
            .then(res => {
                setFAQsData({...FAQsData, rows: res})
            })
            .catch(err => {

            })
    }, [])

    const styles = {
        bgColor: 'transparent',
        titleTextColor: "red",
        rowTitleColor: "grey",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };

    const config = {
        // animate: true,
        // arrowIcon: "V",
        // tabFocus: true
    };

    return (
        // check react-faq-component on npm for all styles and config
        <Faq
            data={FAQsData}
            styles={styles}
            config={config}
        />)
}

export default FAQs