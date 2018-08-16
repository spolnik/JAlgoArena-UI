import * as React from 'react';
import * as Markdown from 'remarkable';



class Remarkable extends React.Component<any, any> {
    md: Markdown;

    constructor(props: any) {
        super(props);

        let options = {
            linkify: true,
            typographer:  true
        };

        this.md = new Markdown("full", options);
    }

    render() {
        return <div>
            <span dangerouslySetInnerHTML={{ __html: this.md.render(this.props.source || "") }} />
        </div>;
    }
}

export default Remarkable;