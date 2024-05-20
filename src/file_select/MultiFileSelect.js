import {useState} from "react";

import Card from "../common/Card";
import FileSelectCard from "./FileSelectCard";
import UploadedCard from "./UploadedCard";
import {uid} from "uid";

function MultiFileSelect() {
    const fakeStartData = [
        {
            submitted: true,
            uid: uid(),
            type: 'Government Issued ID',
            files: [
                {name: 'filename.pdf', url: 'https://www.google.com'},
            ]
        }
    ]

    const [items, setItems] = useState(fakeStartData)

    const onCancelAddition = (cardId) => {
        setItems(items.filter(i => i.uid !== cardId));
    }

    const onSubmitDocument = (cardId, type, files) => {
        const idx = items.findIndex(i => i.uid === cardId);

        // TODO: Submit the files to the server here!

        const newItems = [...items];
        newItems[idx] = {
            submitted: true,
            uid: cardId,
            type: type,
            files: files.map(f => ({
                    name: f.name,
                    url: URL.createObjectURL(f)
                })
            )
        }
        setItems(newItems);
    }

    const onAddDocumentsClicked = () => {
        setItems([
            ...items,
            {
                submitted: false,
                uid: uid(),
                type: '',
                files: []
            }
        ])
    }

    const buildFileCards = () => {
        return items.map(i => {
            if (i.submitted) {
                return <UploadedCard type={i.type} files={i.files}/>
            } else {
                return <FileSelectCard key={i.uid} cardId={i.uid} onCancelClicked={onCancelAddition}
                                       onSubmitClicked={onSubmitDocument}/>
            }
        });
    }

    return <div className={'w-3/4 mx-auto text-start'}>
        <div className={'text-2xl font-bold'}>
            Documents
        </div>
        {buildFileCards()}
        <Card>
            <div className={'font-bold text-lg underline cursor-pointer'} onClick={onAddDocumentsClicked}>
                + Add Documents
            </div>
        </Card>
    </div>;
}

export default MultiFileSelect;