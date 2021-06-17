import axios from "../../../helpers/_axios";
import classNames from "classnames";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import React, { useRef, useState } from "react";
import { i18n } from "../../../language";

const StandardFileUpload = (props) => {

    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e:any) => {
        let _totalSize = totalSize;
        // e.files.map(file => {
        //     _totalSize += file.size;
        // });
        for(let i = 0 ; i<e.files.length;i++){
            _totalSize += e.files[i].size;
        }
        setTotalSize(_totalSize);

    }

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        var formData = new FormData();
        formData.append("file", e.files[0]);
        axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            props.setFile(response.data.download_url)

            e.files.forEach(file => {
                _totalSize += (file.size || 0);
            });
    
            setTotalSize(_totalSize);
            props.showSuccess()
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/20000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        return (
            <div id="fileUploadHeader" className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar id="sizeBar" value={value} displayValueTemplate={() => `${formatedValue} / 2 MB`} style={{width: '20%', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                 <i className="pi pi-image p-p-5" style={{'fontSize': '2em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1em', color: 'var(--text-color-secondary)'}} className="p-my-2">{i18n.t('dragAndDropImageHere')}</span>
            </div>
        )
    }

    const chooseOptions = {className: 'p-button-secondary'};
    const uploadOptions = {className: 'p-button-info'};
    const cancelOptions = {className: 'p-button-danger'};
    
    return (
        <>
            <FileUpload ref={fileUploadRef} id="file" name="file" url="./" multiple accept="image/*" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions}
                        uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
        </>
    )
}

export default StandardFileUpload
