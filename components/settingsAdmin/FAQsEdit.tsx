import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { ProgressSpinner } from "primereact/progressspinner"
import { TabPanel, TabView } from "primereact/tabview"
import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { i18n } from "../../language"
import FAQsService from "../../store/services/faqs.service"

const FAQsEdit = () => {

    const toast = useRef(null);
    let faqsService = new FAQsService()
    const [FAQsData, setFAQsData] = useState({ title: 'FAQs', rows: [] })
    const [loadingFAQsData, setLoadingFAQsData] = useState(true)
    const [roleActiveIndex, setRoleActiveIndex] = useState(0)
    const [languageActiveIndex, setLanguageActiveIndex] = useState(0)
    const roleArray = ['restaurant_owner', 'customer_service']
    const languageDictionary = {
        en: 'english', tr: 'turkish', ar: 'arabic', ru: 'russian'
    }

    useEffect(() => {
        setLoadingFAQsData(true)
        faqsService.getFAQs(Object.keys(languageDictionary)[languageActiveIndex])
            .then(res => {
                setFAQsData({ ...FAQsData, rows: res.filter(one => one.is_deleted === false).map(one => { return { ...one, editing: false } }) })
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('errorGettingFAQsData') })
            }).finally(() => {
                setLoadingFAQsData(false)
            })
    }, [languageActiveIndex])

    useEffect(() => {
        let addFAQBtn = document.getElementById('add_faq_btn')
        if (addFAQBtn) {
            addFAQBtn.style.display = isAnyRowInEditing() ? 'none' : ''
        }
    }, [FAQsData])

    const isAnyRowInEditing = () => {
        let editingCheck = false
        FAQsData.rows.forEach(one => {
            if (one.editing) {
                editingCheck = true
            }
        });
        return editingCheck
    }

    const singleFAQ = (row) => {

        const startEdit = (id) => {
            setFAQsData({
                ...FAQsData, rows: FAQsData.rows.map(r => r.id === id ? { ...r, editing: true } : {...r, editing: false})
            })
        }

        const submitEdit = (id) => {
            if (row.faq.title == '' || row.faq.content == '') {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('questionAndAnswerCannotBeEmpty') })
                return
            }

            setFAQsData({
                ...FAQsData, rows: FAQsData.rows.map(r => r.id === id ? { ...r, processing: true } : r)
            })
            faqsService.updateFAQbyID(id, {
                title: row.faq.title,
                content: row.faq.content
            }).then(res => {
                setFAQsData({
                    ...FAQsData, rows: FAQsData.rows.map(r => r.id === id ? { ...r, editing: false, processing: false} : r)
                })
                toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('updatedFAQ') })
            }).catch(err => {
                setFAQsData({
                    ...FAQsData, rows: FAQsData.rows.map(r => r.id === id ? { ...r, processing: false} : r)
                })
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('errorUpdatingFAQ') })
            }).finally(() => {
               
            })
        }

        const submitAdd = () => {
            if (row.faq.title == '' || row.faq.content == '') {
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('questionAndAnswerCannotBeEmpty') })
                return
            }

            setFAQsData({
                ...FAQsData, rows: FAQsData.rows.map(r => !r.id ? { ...r, processing: true } : r)
            })
            faqsService.addFAQ({
                title: row.faq.title,
                content: row.faq.content,
                language: row.language,
                target: row.target
            }).then(res => {
                setFAQsData({
                    ...FAQsData, rows: FAQsData.rows.map(r => r.id ? r : { ...res, editing: false, processing: false })
                })
                toast.current.show({ severity: 'success', summary: i18n.t('success'), detail: i18n.t('addedFAQ') })
            }).catch(err => {
                setFAQsData({
                    ...FAQsData, rows: FAQsData.rows.map(r => r.id ? r : { processing: false })
                })
                toast.current.show({ severity: 'error', summary: i18n.t('error'), detail: i18n.t('errorAddingFAQ') })
            })
        }

        return !row.editing ?
            <div style={{ marginBottom: '40px' }}>
                <span>
                    <h4>{row.faq.title}</h4>
                    <Button
                        icon="pi pi-pencil"
                        className="p-button-rounded p-button-icon-only"
                        style={{ float: 'right' }}
                        onClick={() => startEdit(row.id)}
                    />
                </span>
                <p style={{ marginRight: '100px' }}>{row.faq.content}</p>
            </div>
            :
            <div style={{ marginBottom: '40px' }}>
                <InputText
                    value={row.faq.title}
                    placeholder={i18n.t('question')}
                    className="p-col-fixed"
                    style={{ width: '75%' }}
                    onChange={e => {
                        setFAQsData({
                            ...FAQsData, rows: FAQsData.rows.map(r => r.id === row.id ? { ...r, faq: { ...r.faq, title: e.target.value } } : r)
                        })
                    }}
                />
                <InputTextarea
                    value={row.faq.content}
                    placeholder={i18n.t('answer')}
                    rows={5}
                    cols={30}
                    autoResize
                    className="p-col-fixed"
                    style={{ width: '75%' }}
                    onChange={e => {
                        setFAQsData({
                            ...FAQsData, rows: FAQsData.rows.map(r => r.id === row.id ? { ...r, faq: { ...r.faq, content: e.target.value } } : r)
                        })
                    }}
                ></InputTextarea>
                <Button
                    icon="pi pi-check"
                    loading={row.processing}
                    className="p-button-rounded p-button-icon-only"
                    style={{ float: 'right' }}
                    onClick={() => row.id ? submitEdit(row.id) : submitAdd()}
                />

            </div>
    }

    const languagesTabPanels = () => {
        return Object.values(languageDictionary).map(lang => {
            return (
                <TabPanel header={i18n.t(lang)}>
                    {
                        loadingFAQsData ? <ProgressSpinner></ProgressSpinner> :
                            <div className="p-fluid">
                                {
                                    FAQsData.rows.map(row => {
                                        if (row.target === roleArray[roleActiveIndex]) {
                                            return singleFAQ(row)
                                        }
                                    })
                                }
                                <Button
                                    id="add_faq_btn"
                                    label={i18n.t('addAFAQ')}
                                    className="p-col-fixed"
                                    style={{ width: '120px' }}
                                    onClick={e => {
                                        if (!isAnyRowInEditing()) {
                                            setFAQsData({
                                                ...FAQsData, rows: [...FAQsData.rows, {
                                                    faq: {
                                                        title: '',
                                                        content: ''
                                                    },
                                                    editing: true,
                                                    language: Object.keys(languageDictionary)[languageActiveIndex],
                                                    target: roleArray[roleActiveIndex]
                                                }],
                                            })
                                        }
                                    }}
                                />
                            </div>
                    }
                </TabPanel>
            )
        })
    }

    const languagesTabView = () => {
        return (
            <TabView activeIndex={languageActiveIndex} onTabChange={(e) => setLanguageActiveIndex(e.index)}>
                {languagesTabPanels()}
            </TabView>
        )
    }


    return (
        <div>
            <Toast id='toastMessage' ref={toast}></Toast>
            <TabView activeIndex={roleActiveIndex} onTabChange={e => setRoleActiveIndex(e.index)}>
                <TabPanel header={i18n.t('restaurantOwners')}>
                    {languagesTabView()}
                </TabPanel>
                <TabPanel header={i18n.t('customerServiceReps')}>
                    {languagesTabView()}
                </TabPanel>
            </TabView>
        </div>
    )
}

export default FAQsEdit