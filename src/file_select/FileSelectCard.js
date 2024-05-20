import Card from "../common/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAsterisk, faFileArrowUp, faTrashCan, faPaperclip} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";


function FileSelectCard({cardId, onCancelClicked, onSubmitClicked}) {
    const selectId = 'type-select' + cardId;
    const fileInputId = 'fileInput' + cardId;

    const [selectedFiles, setSelectedFiles] = useState([]);

    const onFileChange = (event) => {
        setSelectedFiles([...selectedFiles, ...event.target.files]);
    };

    const onAreaClick = () => {
        document.getElementById(fileInputId).click();
    };

    function openFile(file) {
        window.open(URL.createObjectURL(file));
    }

    function deleteFile(file) {
        setSelectedFiles(selectedFiles.filter(f => f !== file));
    }

    return <Card>
        {/* Header */}
        <div>
            <div className={'font-bold text-lg'}>
                <FontAwesomeIcon icon={faAsterisk} className={'mr-1 text-xs align-text-top text-red-600'}/>
                Select Ducument Type
            </div>
        </div>

        {/* Type Select */}
        <select className={'border p-2 rounded-lg w-1/2 my-2'} id={selectId}>
            <option value="Government Issued ID">Government Issued ID</option>
            <option value="Option2">Option2</option>
            <option value="Option3">Option3</option>
        </select>

        {/* File Select */}
        <div className={'cursor-pointer border border-dashed border-gray-200 p-4 rounded-lg my-2'}
             onClick={onAreaClick}>
            <div className={'text-center'}>
                <div className={'rounded-full bg-blue-100 size-8 mx-auto text-lg text-center'}>
                    <FontAwesomeIcon icon={faFileArrowUp}/>
                </div>
                <div className={'underline font-bold'}>
                    Click to upload
                </div>
                <div>or drag and drop</div>
                <div className={'text-gray-500'}>
                    SVG, PNG, JPG (max. 5MB)
                </div>
            </div>
        </div>
        <input type="file" id={fileInputId} onChange={onFileChange} style={{display: 'none'}}/>

        {/* Files Display */}
        {selectedFiles.map((file, index) => (
            <div className={'flex justify-between'}>
                <div className={'cursor-pointer'} onClick={() => openFile(file)}>
                    <FontAwesomeIcon icon={faPaperclip} className={'mr-2 text-gray-500'}/>
                    {file.name}
                </div>
                <div className={'cursor-pointer'} onClick={() => deleteFile(file)}>
                    <FontAwesomeIcon icon={faTrashCan} className={'text-gray-500'}/>
                </div>
            </div>
        ))}

        {/* Buttons */}
        <div className={'flex justify-end mt-2'}>
            <button onClick={() => {
                if (onCancelClicked) onCancelClicked(cardId)
            }} className={'bg-white font-bold text-green-950 border-2 border-green-950 p-2 px-8 rounded-lg'}>Cancel
            </button>
            <button onClick={() => {
                const type = document.getElementById(selectId).value;
                if (onSubmitClicked) onSubmitClicked(cardId, type, selectedFiles)
            }}
                    className={'bg-green-950 text-white font-bold p-2 px-8 rounded-lg ml-2 disabled:bg-gray-200'}
                    disabled={selectedFiles.length === 0}
            >
                Submit
            </button>
        </div>
    </Card>
}

export default FileSelectCard;