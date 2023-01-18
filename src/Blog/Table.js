import React from 'react';
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
} from 'react-table';
import './Table.scss';
import moment from 'moment';

function Table(props) {
    const columns = React.useMemo(() => [
        {
            Header: 'id',
            accessor: 'idCol'
        },
        {
            Header: 'title',
            accessor: 'titleCol'
        },
        {
            Header: 'body',
            accessor: 'bodyCol'
        },
        {
            Header: 'created',
            accessor: 'createdAtCol'
        },
        {
            Header: 'last updated',
            accessor: 'updatedAtCol'
        },
        {
            Header: 'image',
            accessor: 'imageUrlCol'
        },
        {
            Header: 'collapsed',
            accessor: 'collapsedCol'
        }
    ], []);

    const dataArray = [];

    for (var index = 0; index < props.posts.length; index++) {
        const post = props.posts[index];
        dataArray.push({
            idCol: post.id,
            titleCol: post.title,
            bodyCol: post.body,
            createdAtCol: post.createdAt,
            updatedAtCol: post.updatedAt,
            imageUrlCol: post.imageUrl ? post.imageUrl[0] : null,
            collapsedCol: post.collapsed
        });
    }

    const data = React.useMemo(() => dataArray, [dataArray]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    let odd = true;

    return (
        <div>
            {
                rows.map(row => {
                    let imageClass = 'post-image ' + (odd ? 'left' : 'right');
                    odd = !odd;

                    prepareRow(row);
                    
                    const id = row.cells.find(c => c.render('Header') === 'id').value;
                    const title = row.cells.find(c => c.render('Header') === 'title').value;
                    const body = row.cells.find(c => c.render('Header') === 'body').value;
                    const createdAt = row.cells.find(c => c.render('Header') === 'created').value;
                    const updatedAt = row.cells.find(c => c.render('Header') === 'last updated').value;
                    const imageUrl = row.cells.find(c => c.render('Header') === 'image').value;
                    const collapsed = row.cells.find(c => c.render('Header') === 'collapsed').value;

                    const post = {id, title, body};

                    let paragraphCount = 0;
                    const paragraphArray = body.split('\n').filter(p => p !== '').map(p => {
                        paragraphCount++;
                        // Wrap paragraph in <p> tags and add image if it's the first paragraph
                        p = (paragraphCount === 1 ? `<img src="${imageUrl}" class="${imageClass}" />` : '') + p;
                        return <p key={paragraphCount} dangerouslySetInnerHTML={{ __html: p }}></p>;
                    });
                    const paragraphs = <div className="post-body">{paragraphArray}</div>;

                    const editButton = props.isLoggedIn
                        ? <i className="edit-button far fa-edit" onClick={() => props.editPost(post)}></i>
                        : null;
                    
                    let postClass = collapsed ? 'collapsed' : 'expanded';

                    return (
                        <div className={[postClass, 'post height-transition'].join(' ')} key={row.index}>
                            <a name={id} />
                            <div className="image-title-updated-at">
                                <h3>{title}&nbsp;&nbsp;&nbsp;{editButton}</h3>
                                <p className="updated-at-date">{moment.unix(createdAt/1000).format('MMM DD, YYYY')}</p>
                            </div>
                            {paragraphs}
                            <div className="read-more-link-container">
                                <span className="read-more-link" onClick={() => props.readMoreLessClicked(id, props.that)}>
                                    {collapsed ? 'Read more...' : 'Read less...'}
                                </span>
                            </div>
                            <div className="divider">
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Table;
