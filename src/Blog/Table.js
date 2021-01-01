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
                    const updatedAt = row.cells.find(c => c.render('Header') === 'last updated').value;
                    const imageUrl = row.cells.find(c => c.render('Header') === 'image').value;
                    const collapsed = row.cells.find(c => c.render('Header') === 'collapsed').value;

                    const post = {id, title, body};

                    let paragraphCount = 0;
                    const paragraphArray = body.split('\n').filter(p => p !== '').map(p => {
                        paragraphCount++;
                        return <p key={paragraphCount}>
                                {/* Add image to first paragraph */}
                                {paragraphCount === 1 ? <img src={imageUrl} className={imageClass} /> : null}
                                {p}
                            </p>;
                    });
                    const paragraphs = <div className="post-body">{paragraphArray}</div>;

                    const editButton = props.isLoggedIn
                        ? <i className="edit-button far fa-edit" onClick={() => props.editPost(post)}></i>
                        : null;
                    
                    const postClasses = collapsed ? 'collapsed' : 'post';

                    return (
                        <div className={postClasses} key={row.index}>
                            <div className="image-title-updated-at">
                                <h3>{title}&nbsp;&nbsp;&nbsp;{editButton}</h3>
                                <p>{moment.unix(updatedAt/1000).format('MMM DD, YYYY')}</p>
                            </div>
                            {paragraphs}
                            <hr />
                            <div className="read-more-link-container">
                                <span className="read-more-link">Read more...</span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Table;
