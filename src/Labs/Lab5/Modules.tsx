const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function Modules() {
    const moduleData = {
        id: "mod123",
        name: "Introduction to Programming",
        description: "This module introduces basic programming concepts.",
        course: "Computer Science"
        };
    return (
        <div>
            <a className="btn btn-primary me-2" id="wd-path-parameter-get-module"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <a className="btn btn-primary me-2" id="wd-path-parameter-get-module-name"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
        </div>

    );
}
