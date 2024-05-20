import Card from "../common/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param type string
 * @param files array
 * @returns {JSX.Element}
 * @constructor
 */
function UploadedCard({type, files}) {
    return <Card>
        <div className={'flex justify-between'}>
            <div className={'flex-1 text-gray-500'}>
                {type}
            </div>
            <div className={'flex-1 overflow-auto'}>
                {files.map((file, index) => (
                    <a target={'_blank'} href={file.url} className={'mr-2 font-bold'}>
                        <FontAwesomeIcon icon={faPaperclip} className={'mr-2 text-gray-500'}/>
                        {file.name}
                    </a>
                ))}
            </div>
        </div>
    </Card>
}

export default UploadedCard;