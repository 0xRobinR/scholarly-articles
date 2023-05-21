import moment from "moment";
import {articleFile, raiseIssue} from "../../config";

export default function MarkdownContent({ content, metadata }) {
    const date = new Date(metadata.date)
    const formattedDate = moment(date).format("MMMM Do YYYY");
    return (
        <div className={"p-3"}>
            <h2 className={"text-lowercase text-center"}>
                {metadata?.title}
            </h2>
            <div className={"text-center mb-3"}>
                <div><span>{metadata?.author}</span></div>
                <div><span>{formattedDate.toLowerCase()}</span></div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <hr className={"bg-white"} />
            <div className={"d-flex justify-content-center text-center mb-3"}>
                <div className={"col-4"}>
                    <a className={"btn btn-outline-secondary"} target={"_blank"} href={`${articleFile}${metadata.file}`}>git link</a>
                </div>
                <div className={"col-4"}>
                    <button className={"btn btn-outline-secondary"} onClick={() => {
                        window.scrollTo({top: 0})
                    }}>top</button>
                </div>
                <div className={"col-4"}>
                    <a className={"btn btn-outline-secondary"} target={"_blank"} href={`${raiseIssue}?title=Issue in ${metadata.file}`} >issue?</a>
                </div>
            </div>
        </div>
    );
}
