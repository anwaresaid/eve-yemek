import React, { useEffect, useState } from 'react';
import Faq from "react-faq-component";
import { i18n } from '../../language';
import FAQsService from '../../store/services/faqs.service';

export const FAQs = () => {

    let faqsService = new FAQsService()
    const [FAQsData, setFAQsData] = useState({ title: i18n.t('FAQ'), rows: [] })

    useEffect(() => {
        faqsService.getFAQs(i18n.language.slice(0, 2))
            .then(res => {
                setFAQsData({ ...FAQsData, rows: res.filter(one => one.is_deleted === false).map(one => one.faq) })
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